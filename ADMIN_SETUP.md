# إعداد لوحة إدارة برجر هاوس

لوحة الإدارة متاحة على المسار:

`https://burgerhouse-m.ly/admin`

لا تستخدم قاعدة بيانات. عند النشر، تقوم وظيفة آمنة في Vercel بتحديث ملفات JSON والصور داخل مستودع GitHub، ثم يبدأ Vercel إعادة نشر الموقع تلقائياً.

## 1. إنشاء كلمة المرور والسر السري للجلسة

شغّل الأمر التالي محلياً مع استبدال كلمة المرور:

```powershell
node scripts/generate-admin-secrets.mjs "YOUR-STRONG-PASSWORD"
```

سينتج الأمر قيمتين:

- `ADMIN_PASSWORD_HASH`
- `ADMIN_SESSION_SECRET`

لا تضع كلمة المرور نفسها داخل Vercel أو GitHub.

## 2. إنشاء GitHub Token محدود

أنشئ Fine-grained personal access token من GitHub بالشروط التالية:

- Repository access: المستودع `joetomi/BURGER-HOUSE` فقط.
- Repository permissions: `Contents` بقيمة `Read and write`.
- لا تمنحه صلاحيات إضافية.

## 3. متغيرات Vercel

أضف القيم التالية إلى إعدادات المشروع في Vercel ضمن Environment Variables للإنتاج:

```text
ADMIN_USERNAME=اسم-المستخدم-الذي-تختاره
ADMIN_PASSWORD_HASH=القيمة-الناتجة-من-السكريبت
ADMIN_SESSION_SECRET=القيمة-الناتجة-من-السكريبت
ADMIN_ALLOWED_ORIGIN=https://burgerhouse-m.ly
GITHUB_TOKEN=رمز-GitHub-المحدود
GITHUB_OWNER=joetomi
GITHUB_REPO=BURGER-HOUSE
GITHUB_BRANCH=main
```

بعد إضافة المتغيرات، نفّذ Redeploy واحداً من Vercel لتصبح القيم متاحة لوظائف الإدارة.

## 4. استخدام اللوحة

1. افتح `https://burgerhouse-m.ly/admin`.
2. سجّل الدخول.
3. عدّل منيو الطعام أو الكافيه أو منشورات البانر.
4. اضغط «نشر التعديلات».
5. تنشئ اللوحة Commit واحداً وتبدأ عملية Vercel تلقائياً.

## ملاحظات أمان

- لا ترسل `GITHUB_TOKEN` أو كلمة المرور في المحادثات.
- لا تضع الأسرار في ملفات المشروع.
- استخدم كلمة مرور طويلة وفريدة.
- سجّل الخروج بعد استخدام جهاز غير خاص.
- إذا انكشف الرمز، ألغِه فوراً من GitHub وأنشئ رمزاً جديداً.
