import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  Coffee,
  ExternalLink,
  ImagePlus,
  LoaderCircle,
  LogOut,
  Megaphone,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import { getAdminSession, loadAdminContent, loginAdmin, logoutAdmin, publishAdminContent } from "./api";
import { preparePromotionImage } from "./image";
import type {
  AdminContentResponse,
  AdminMenuCategory,
  AdminMenuContent,
  AdminPromotion,
  AdminPromotionsContent,
} from "./types";

type AdminTab = "food" | "cafe" | "promotions";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/25 px-3.5 py-3 text-sm text-white outline-none transition focus:border-[#D4A017]/70 focus:ring-2 focus:ring-[#D4A017]/15";
const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-45";

const makeId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

const moveItem = <T,>(items: T[], index: number, direction: -1 | 1) => {
  const destination = index + direction;
  if (destination < 0 || destination >= items.length) return items;
  const next = [...items];
  [next[index], next[destination]] = [next[destination], next[index]];
  return next;
};

const LoginScreen: React.FC<{ onLoggedIn: (username: string) => void }> = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const session = await loginAdmin(username, password);
      onLoggedIn(session.username);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "تعذر تسجيل الدخول.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0F0F0F] px-4 py-10 font-cairo text-white" dir="rtl">
      <section className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#151515]/95 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:p-9">
        <div className="mb-8 flex flex-col items-center text-center">
          <img src="/loader-brand.png" alt="برجر هاوس" className="mb-4 h-20 w-20 object-contain" />
          <h1 className="text-2xl font-bold">لوحة إدارة برجر هاوس</h1>
          <p className="mt-2 text-sm text-white/50">دخول صاحب المطعم</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-white/70">اسم المستخدم</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              className={inputClass}
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-white/70">كلمة المرور</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className={inputClass}
              required
            />
          </label>
          {error && <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
          <button type="submit" disabled={loading} className={`${buttonClass} w-full bg-[#D4A017] text-black hover:bg-[#E2B22D]`}>
            {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            تسجيل الدخول
          </button>
        </form>
      </section>
    </main>
  );
};

interface MenuEditorProps {
  title: string;
  categories: AdminMenuCategory[];
  onChange: (categories: AdminMenuCategory[]) => void;
}

const MenuEditor: React.FC<MenuEditorProps> = ({ title, categories, onChange }) => {
  const [selectedId, setSelectedId] = useState(categories[0]?.id || "");
  const selectedIndex = categories.findIndex((category) => category.id === selectedId);
  const selected = categories[selectedIndex] || categories[0];

  useEffect(() => {
    if (!categories.some((category) => category.id === selectedId)) setSelectedId(categories[0]?.id || "");
  }, [categories, selectedId]);

  const updateSelected = (patch: Partial<AdminMenuCategory>) => {
    if (!selected) return;
    onChange(categories.map((category) => (category.id === selected.id ? { ...category, ...patch } : category)));
  };

  const addCategory = () => {
    const id = makeId("category");
    onChange([
      ...categories,
      { id, titleAr: "قسم جديد", titleEn: "New Category", enabled: true, items: [] },
    ]);
    setSelectedId(id);
  };

  const removeCategory = () => {
    if (!selected || !window.confirm(`حذف قسم «${selected.titleAr}» وجميع أصنافه؟`)) return;
    onChange(categories.filter((category) => category.id !== selected.id));
  };

  const addMenuItem = () => {
    if (!selected) return;
    updateSelected({
      items: [
        ...selected.items,
        { id: makeId("item"), nameAr: "صنف جديد", nameEn: "New Item", price: 0, enabled: true },
      ],
    });
  };

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="mt-1 text-sm text-white/45">إدارة الأقسام والأصناف والأسعار وترتيب ظهورها.</p>
        </div>
        <button type="button" onClick={addCategory} className={`${buttonClass} bg-[#D4A017] text-black hover:bg-[#E2B22D]`}>
          <Plus className="h-4 w-4" /> إضافة قسم
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-white/10 bg-[#151515]/80 p-3">
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div key={category.id} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedId(category.id)}
                  className={`min-w-0 flex-1 rounded-xl px-3 py-3 text-right text-sm font-bold transition ${
                    selected?.id === category.id ? "bg-[#D4A017] text-black" : "bg-white/[0.035] text-white/70 hover:bg-white/[0.07]"
                  }`}
                >
                  <span className="block truncate">{category.titleAr}</span>
                  <span className={`mt-0.5 block text-[10px] ${selected?.id === category.id ? "text-black/55" : "text-white/35"}`}>
                    {category.items.length} صنف
                  </span>
                </button>
                <div className="flex flex-col">
                  <button
                    type="button"
                    aria-label="تحريك القسم للأعلى"
                    disabled={index === 0}
                    onClick={() => onChange(moveItem(categories, index, -1))}
                    className="rounded p-1 text-white/35 hover:text-white disabled:opacity-20"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="تحريك القسم للأسفل"
                    disabled={index === categories.length - 1}
                    onClick={() => onChange(moveItem(categories, index, 1))}
                    className="rounded p-1 text-white/35 hover:text-white disabled:opacity-20"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {categories.length === 0 && <p className="py-8 text-center text-sm text-white/35">لا توجد أقسام.</p>}
          </div>
        </aside>

        <div className="min-w-0 rounded-2xl border border-white/10 bg-[#151515]/80 p-4 sm:p-6">
          {!selected ? (
            <div className="py-20 text-center text-white/35">أضف قسماً للبدء.</div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-xs font-semibold text-white/55">اسم القسم بالعربية</span>
                  <input value={selected.titleAr} onChange={(event) => updateSelected({ titleAr: event.target.value })} className={inputClass} />
                </label>
                <label>
                  <span className="mb-2 block text-xs font-semibold text-white/55">اسم القسم بالإنجليزية</span>
                  <input dir="ltr" value={selected.titleEn} onChange={(event) => updateSelected({ titleEn: event.target.value })} className={inputClass} />
                </label>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                <label className="inline-flex items-center gap-2 text-sm text-white/65">
                  <input
                    type="checkbox"
                    checked={selected.enabled}
                    onChange={(event) => updateSelected({ enabled: event.target.checked })}
                    className="h-4 w-4 accent-[#D4A017]"
                  />
                  إظهار القسم في الموقع
                </label>
                <button type="button" onClick={removeCategory} className={`${buttonClass} bg-red-500/10 text-red-300 hover:bg-red-500/20`}>
                  <Trash2 className="h-4 w-4" /> حذف القسم
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <h3 className="font-bold text-white">الأصناف</h3>
                <button type="button" onClick={addMenuItem} className={`${buttonClass} bg-white/8 text-white hover:bg-white/12`}>
                  <Plus className="h-4 w-4" /> إضافة صنف
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {selected.items.map((item, index) => (
                  <div key={item.id} className="rounded-2xl border border-white/[0.07] bg-black/20 p-3.5">
                    <div className="grid gap-3 md:grid-cols-[1fr_1fr_120px_auto] md:items-end">
                      <label>
                        <span className="mb-1.5 block text-[11px] text-white/45">الاسم بالعربية</span>
                        <input
                          value={item.nameAr}
                          onChange={(event) =>
                            updateSelected({
                              items: selected.items.map((current) =>
                                current.id === item.id ? { ...current, nameAr: event.target.value } : current,
                              ),
                            })
                          }
                          className={inputClass}
                        />
                      </label>
                      <label>
                        <span className="mb-1.5 block text-[11px] text-white/45">الاسم بالإنجليزية</span>
                        <input
                          dir="ltr"
                          value={item.nameEn}
                          onChange={(event) =>
                            updateSelected({
                              items: selected.items.map((current) =>
                                current.id === item.id ? { ...current, nameEn: event.target.value } : current,
                              ),
                            })
                          }
                          className={inputClass}
                        />
                      </label>
                      <label>
                        <span className="mb-1.5 block text-[11px] text-white/45">السعر (د.ل)</span>
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          step="0.5"
                          dir="ltr"
                          value={item.price}
                          onChange={(event) =>
                            updateSelected({
                              items: selected.items.map((current) =>
                                current.id === item.id ? { ...current, price: Number(event.target.value) } : current,
                              ),
                            })
                          }
                          className={inputClass}
                        />
                      </label>
                      <div className="flex items-center justify-end gap-1 pb-1">
                        <label className="ml-2 inline-flex items-center gap-1.5 text-xs text-white/50">
                          <input
                            type="checkbox"
                            checked={item.enabled}
                            onChange={(event) =>
                              updateSelected({
                                items: selected.items.map((current) =>
                                  current.id === item.id ? { ...current, enabled: event.target.checked } : current,
                                ),
                              })
                            }
                            className="accent-[#D4A017]"
                          />
                          ظاهر
                        </label>
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => updateSelected({ items: moveItem(selected.items, index, -1) })}
                          className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white disabled:opacity-20"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          disabled={index === selected.items.length - 1}
                          onClick={() => updateSelected({ items: moveItem(selected.items, index, 1) })}
                          className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white disabled:opacity-20"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`حذف صنف «${item.nameAr}»؟`)) {
                              updateSelected({ items: selected.items.filter((current) => current.id !== item.id) });
                            }
                          }}
                          className="rounded-lg p-2 text-red-300/65 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {selected.items.length === 0 && <p className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-white/35">لا توجد أصناف في هذا القسم.</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const PromotionsEditor: React.FC<{
  promotions: AdminPromotion[];
  onChange: (promotions: AdminPromotion[]) => void;
}> = ({ promotions, onChange }) => {
  const update = (id: string, patch: Partial<AdminPromotion>) =>
    onChange(promotions.map((promotion) => (promotion.id === id ? { ...promotion, ...patch } : promotion)));

  const addPromotion = () => {
    const id = makeId("promotion");
    onChange([
      ...promotions,
      {
        id,
        image: "",
        titleAr: "منشور جديد",
        titleEn: "New Promotion",
        captionAr: "أضف وصف المنشور",
        captionEn: "Add promotion caption",
        postUrl: "https://www.facebook.com/burgerhousemisurata",
        enabled: true,
      },
    ]);
  };

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">منشورات البانر</h2>
          <p className="mt-1 text-sm text-white/45">إدارة الصور والنصوص والترتيب الظاهر في قسم القصص.</p>
        </div>
        <button type="button" onClick={addPromotion} className={`${buttonClass} bg-[#D4A017] text-black hover:bg-[#E2B22D]`}>
          <Plus className="h-4 w-4" /> إضافة منشور
        </button>
      </div>

      <div className="space-y-4">
        {promotions.map((promotion, index) => (
          <article key={promotion.id} className="rounded-2xl border border-white/10 bg-[#151515]/80 p-4 sm:p-5">
            <div className="grid gap-5 lg:grid-cols-[190px_minmax(0,1fr)]">
              <div>
                <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                  {promotion.image ? (
                    <img
                      src={promotion.pendingImage?.previewUrl || promotion.image}
                      alt={promotion.titleAr}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/25">
                      <ImagePlus className="h-9 w-9" />
                    </div>
                  )}
                </div>
                <label className={`${buttonClass} mt-3 w-full cursor-pointer bg-white/8 text-white hover:bg-white/12`}>
                  <ImagePlus className="h-4 w-4" /> اختيار صورة
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      try {
                        const pendingImage = await preparePromotionImage(file, promotion.id);
                        update(promotion.id, { image: pendingImage.publicPath, pendingImage });
                      } catch (imageError) {
                        window.alert(imageError instanceof Error ? imageError.message : "تعذر تجهيز الصورة.");
                      } finally {
                        event.target.value = "";
                      }
                    }}
                  />
                </label>
              </div>

              <div className="min-w-0">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label>
                    <span className="mb-1.5 block text-xs text-white/45">العنوان بالعربية</span>
                    <input value={promotion.titleAr} onChange={(event) => update(promotion.id, { titleAr: event.target.value })} className={inputClass} />
                  </label>
                  <label>
                    <span className="mb-1.5 block text-xs text-white/45">العنوان بالإنجليزية</span>
                    <input dir="ltr" value={promotion.titleEn} onChange={(event) => update(promotion.id, { titleEn: event.target.value })} className={inputClass} />
                  </label>
                  <label>
                    <span className="mb-1.5 block text-xs text-white/45">الوصف بالعربية</span>
                    <textarea value={promotion.captionAr} onChange={(event) => update(promotion.id, { captionAr: event.target.value })} className={`${inputClass} min-h-24 resize-y`} />
                  </label>
                  <label>
                    <span className="mb-1.5 block text-xs text-white/45">الوصف بالإنجليزية</span>
                    <textarea dir="ltr" value={promotion.captionEn} onChange={(event) => update(promotion.id, { captionEn: event.target.value })} className={`${inputClass} min-h-24 resize-y`} />
                  </label>
                </div>
                <label className="mt-3 block">
                  <span className="mb-1.5 block text-xs text-white/45">رابط منشور Facebook</span>
                  <input dir="ltr" value={promotion.postUrl} onChange={(event) => update(promotion.id, { postUrl: event.target.value })} className={inputClass} />
                </label>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <label className="inline-flex items-center gap-2 text-sm text-white/60">
                    <input
                      type="checkbox"
                      checked={promotion.enabled}
                      onChange={(event) => update(promotion.id, { enabled: event.target.checked })}
                      className="h-4 w-4 accent-[#D4A017]"
                    />
                    إظهار المنشور
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => onChange(moveItem(promotions, index, -1))}
                      className="rounded-lg p-2.5 text-white/45 hover:bg-white/5 hover:text-white disabled:opacity-20"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === promotions.length - 1}
                      onClick={() => onChange(moveItem(promotions, index, 1))}
                      className="rounded-lg p-2.5 text-white/45 hover:bg-white/5 hover:text-white disabled:opacity-20"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`حذف منشور «${promotion.titleAr}»؟`)) {
                          onChange(promotions.filter((current) => current.id !== promotion.id));
                        }
                      }}
                      className="rounded-lg p-2.5 text-red-300/70 hover:bg-red-500/10 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
        {promotions.length === 0 && <p className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-white/35">لا توجد منشورات.</p>}
      </div>
    </section>
  );
};

export const AdminApp: React.FC = () => {
  const [checkingSession, setCheckingSession] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [content, setContent] = useState<AdminContentResponse | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("food");
  const [loadingContent, setLoadingContent] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
    document.title = "لوحة إدارة برجر هاوس";
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex,nofollow,noarchive";

    getAdminSession()
      .then((session) => setUsername(session.authenticated ? session.username : null))
      .catch(() => setUsername(null))
      .finally(() => setCheckingSession(false));
  }, []);

  const refreshContent = async (force = false) => {
    if (dirty && !force && !window.confirm("توجد تغييرات غير محفوظة. هل تريد تجاهلها وإعادة التحميل؟")) return;
    setLoadingContent(true);
    setError("");
    setSuccess(null);
    try {
      setContent(await loadAdminContent());
      setDirty(false);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "تعذر تحميل المحتوى.");
    } finally {
      setLoadingContent(false);
    }
  };

  useEffect(() => {
    if (username && !content && !loadingContent) void refreshContent(true);
  }, [username, content, loadingContent]);

  const counts = useMemo(() => {
    if (!content) return { food: 0, cafe: 0, promotions: 0 };
    return {
      food: content.menu.food.reduce((total, category) => total + category.items.length, 0),
      cafe: content.menu.cafe.reduce((total, category) => total + category.items.length, 0),
      promotions: content.promotions.items.length,
    };
  }, [content]);

  const setMenu = (menu: AdminMenuContent) => {
    if (!content) return;
    setContent({ ...content, menu });
    setDirty(true);
    setSuccess(null);
  };

  const setPromotions = (promotions: AdminPromotionsContent) => {
    if (!content) return;
    setContent({ ...content, promotions });
    setDirty(true);
    setSuccess(null);
  };

  const publish = async () => {
    if (!content || !dirty || !window.confirm("حفظ جميع التعديلات الآن؟ ستظهر في الموقع تلقائياً بعد قليل.")) return;
    setPublishing(true);
    setError("");
    setSuccess(null);
    try {
      const images = content.promotions.items
        .map((promotion) => promotion.pendingImage)
        .filter((image): image is NonNullable<typeof image> => Boolean(image))
        .map((image) => ({ path: image.path, contentBase64: image.contentBase64 }));
      const promotions = {
        ...content.promotions,
        items: content.promotions.items.map(({ pendingImage: _pendingImage, ...promotion }) => promotion),
      };
      const result = await publishAdminContent({
        baseSha: content.baseSha,
        menu: content.menu,
        promotions,
        images,
      });
      setContent({ ...content, baseSha: result.commitSha, promotions });
      setDirty(false);
      setSuccess("تم حفظ التعديلات بنجاح. ستظهر في الموقع خلال لحظات.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "تعذر حفظ التعديلات.");
    } finally {
      setPublishing(false);
    }
  };

  const logout = async () => {
    if (dirty && !window.confirm("توجد تغييرات غير محفوظة. هل تريد تسجيل الخروج؟")) return;
    await logoutAdmin().catch(() => undefined);
    setUsername(null);
    setContent(null);
    setDirty(false);
  };

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0F0F0F] text-[#D4A017]">
        <LoaderCircle className="h-8 w-8 animate-spin" />
      </main>
    );
  }

  if (!username) return <LoginScreen onLoggedIn={setUsername} />;

  const tabs: Array<{ id: AdminTab; label: string; icon: React.ElementType }> = [
    { id: "food", label: "منيو الطعام", icon: UtensilsCrossed },
    { id: "cafe", label: "منيو الكافيه", icon: Coffee },
    { id: "promotions", label: "المنشورات", icon: Megaphone },
  ];

  return (
    <main className="min-h-screen bg-[#0F0F0F] font-cairo text-white" dir="rtl">
      <header className="border-b border-white/10 bg-[#111111]/95 px-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/loader-brand.png" alt="برجر هاوس" className="h-11 w-11 object-contain" />
            <div>
              <h1 className="font-bold">لوحة إدارة برجر هاوس</h1>
              <p className="text-xs text-white/40">مرحباً، {username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className={`${buttonClass} bg-white/5 text-white/65 hover:bg-white/10 hover:text-white`}>
              <ExternalLink className="h-4 w-4" /> فتح الموقع
            </a>
            <button type="button" onClick={logout} className={`${buttonClass} bg-red-500/10 text-red-300 hover:bg-red-500/20`}>
              <LogOut className="h-4 w-4" /> خروج
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#151515]/80 p-4"><span className="text-xs text-white/40">أصناف الطعام</span><strong className="mt-1 block text-2xl text-[#D4A017]">{counts.food}</strong></div>
          <div className="rounded-2xl border border-white/10 bg-[#151515]/80 p-4"><span className="text-xs text-white/40">أصناف الكافيه</span><strong className="mt-1 block text-2xl text-[#D4A017]">{counts.cafe}</strong></div>
          <div className="rounded-2xl border border-white/10 bg-[#151515]/80 p-4"><span className="text-xs text-white/40">منشورات البانر</span><strong className="mt-1 block text-2xl text-[#D4A017]">{counts.promotions}</strong></div>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#151515]/80 p-3">
          <nav className="flex max-w-full gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`${buttonClass} whitespace-nowrap ${activeTab === tab.id ? "bg-[#D4A017] text-black" : "bg-white/5 text-white/60 hover:text-white"}`}
                >
                  <Icon className="h-4 w-4" /> {tab.label}
                </button>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" disabled={loadingContent || publishing} onClick={() => void refreshContent()} className={`${buttonClass} bg-white/5 text-white/60 hover:text-white`}>
              <RefreshCw className={`h-4 w-4 ${loadingContent ? "animate-spin" : ""}`} /> تحديث
            </button>
            <button type="button" disabled={!dirty || publishing} onClick={publish} className={`${buttonClass} bg-[#D4A017] text-black hover:bg-[#E2B22D]`}>
              {publishing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {publishing ? "جارٍ الحفظ..." : dirty ? "حفظ التعديلات" : "لا توجد تغييرات"}
            </button>
          </div>
        </div>

        {dirty && <div className="mb-5 rounded-xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">لديك تغييرات لم تُحفظ بعد.</div>}
        {error && <div className="mb-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
        {success && (
          <div className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4" />{success}</span>
          </div>
        )}

        {loadingContent && !content ? (
          <div className="flex min-h-[420px] items-center justify-center text-[#D4A017]"><LoaderCircle className="h-8 w-8 animate-spin" /></div>
        ) : content ? (
          <>
            {activeTab === "food" && <MenuEditor title="منيو الطعام" categories={content.menu.food} onChange={(food) => setMenu({ ...content.menu, food })} />}
            {activeTab === "cafe" && <MenuEditor title="منيو الكافيه" categories={content.menu.cafe} onChange={(cafe) => setMenu({ ...content.menu, cafe })} />}
            {activeTab === "promotions" && <PromotionsEditor promotions={content.promotions.items} onChange={(items) => setPromotions({ ...content.promotions, items })} />}
          </>
        ) : null}
      </div>
    </main>
  );
};
