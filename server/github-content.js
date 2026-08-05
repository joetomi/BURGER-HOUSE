const API_ROOT = "https://api.github.com";
const MENU_PATH = "src/data/menu.json";
const PROMOTIONS_PATH = "src/data/promotions.json";

const getConfig = () => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not configured.");
  return {
    token,
    owner: process.env.GITHUB_OWNER || "joetomi",
    repository: process.env.GITHUB_REPO || "BURGER-HOUSE",
    branch: process.env.GITHUB_BRANCH || "main",
  };
};

const githubRequest = async (path, options = {}) => {
  const config = getConfig();
  const response = await fetch(`${API_ROOT}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.message || `GitHub request failed with status ${response.status}.`);
    error.status = response.status;
    throw error;
  }
  return body;
};

const repoPath = (suffix) => {
  const { owner, repository } = getConfig();
  return `/repos/${owner}/${repository}${suffix}`;
};

const getBranchState = async () => {
  const { branch } = getConfig();
  const reference = await githubRequest(repoPath(`/git/ref/heads/${encodeURIComponent(branch)}`));
  const commitSha = reference.object.sha;
  const commit = await githubRequest(repoPath(`/git/commits/${commitSha}`));
  return { commitSha, treeSha: commit.tree.sha };
};

const getJsonFile = async (path) => {
  const { branch } = getConfig();
  const file = await githubRequest(repoPath(`/contents/${path}?ref=${encodeURIComponent(branch)}`));
  if (file.type !== "file" || !file.content) throw new Error(`Repository file is unavailable: ${path}`);
  return JSON.parse(Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8"));
};

export const loadAdminContent = async () => {
  const [{ commitSha }, menu, promotions] = await Promise.all([
    getBranchState(),
    getJsonFile(MENU_PATH),
    getJsonFile(PROMOTIONS_PATH),
  ]);
  return { baseSha: commitSha, menu, promotions };
};

const createBlob = async (content, encoding = "utf-8") => {
  const blob = await githubRequest(repoPath("/git/blobs"), {
    method: "POST",
    body: JSON.stringify({ content, encoding }),
  });
  return blob.sha;
};

export const publishAdminContent = async ({ baseSha, menu, promotions, images = [] }) => {
  const current = await getBranchState();
  if (current.commitSha !== baseSha) {
    const conflict = new Error("تم تحديث الموقع من مصدر آخر. أعد تحميل أحدث نسخة قبل النشر.");
    conflict.status = 409;
    throw conflict;
  }

  const previousPromotions = await getJsonFile(PROMOTIONS_PATH);
  const [menuBlob, promotionsBlob] = await Promise.all([
    createBlob(`${JSON.stringify(menu, null, 2)}\n`),
    createBlob(`${JSON.stringify(promotions, null, 2)}\n`),
  ]);

  const imageEntries = await Promise.all(
    images.map(async (image) => ({
      path: image.path,
      mode: "100644",
      type: "blob",
      sha: await createBlob(image.contentBase64, "base64"),
    })),
  );

  const nextImages = new Set(
    promotions.items
      .map((promotion) => promotion.image)
      .filter((path) => path.startsWith("/promotions/"))
      .map((path) => `public${path}`),
  );
  const removedImages = (previousPromotions.items || [])
    .map((promotion) => promotion.image)
    .filter((path) => typeof path === "string" && path.startsWith("/promotions/"))
    .map((path) => `public${path}`)
    .filter((path) => !nextImages.has(path))
    .map((path) => ({ path, mode: "100644", type: "blob", sha: null }));

  const tree = await githubRequest(repoPath("/git/trees"), {
    method: "POST",
    body: JSON.stringify({
      base_tree: current.treeSha,
      tree: [
        { path: MENU_PATH, mode: "100644", type: "blob", sha: menuBlob },
        { path: PROMOTIONS_PATH, mode: "100644", type: "blob", sha: promotionsBlob },
        ...imageEntries,
        ...removedImages,
      ],
    }),
  });

  const commit = await githubRequest(repoPath("/git/commits"), {
    method: "POST",
    body: JSON.stringify({
      message: "Update menu content from Burger House Admin",
      tree: tree.sha,
      parents: [current.commitSha],
    }),
  });

  const { branch, owner, repository } = getConfig();
  await githubRequest(repoPath(`/git/refs/heads/${encodeURIComponent(branch)}`), {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });

  return {
    commitSha: commit.sha,
    commitUrl: `https://github.com/${owner}/${repository}/commit/${commit.sha}`,
  };
};

