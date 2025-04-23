import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/i18n-config";
import { FileText, Home, KeyRound, Banknote, ShieldCheck, Search } from "lucide-react";

export default async function GuidePage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const isArabic = lang === "ar";

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 space-y-24">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-300 mb-4">
          {dictionary.navigation.guide}
        </h1>
        <p className="text-muted-foreground text-lg">
          {isArabic
            ? "دليلنا الشامل يساعدك في اتخاذ قرارات ذكية في السوق العقارية السعودية."
            : "Our comprehensive guide helps you make informed decisions in the Saudi real estate market."}
        </p>
      </div>

      {/* Getting Started Section */}
      <section className="max-w-5xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-semibold text-teal-300">
          {isArabic ? "الخطوات الأولى" : "Getting Started"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div>
            <Search className="h-8 w-8 text-teal-300 mb-2" />
            <h3 className="font-bold text-lg">
              {isArabic ? "تحديد الهدف" : "Define Your Objective"}
            </h3>
            <p className="text-muted-foreground">
              {isArabic
                ? "هل ترغب في شراء، بيع، أو تأجير؟ حدد هدفك العقاري أولاً."
                : "Are you buying, selling, or renting? Start by defining your goal."}
            </p>
          </div>
          <div>
            <Home className="h-8 w-8  text-teal-300 mb-2" />
            <h3 className="font-bold text-lg">
              {isArabic ? "اختيار الموقع" : "Choose a Location"}
            </h3>
            <p className="text-muted-foreground">
              {isArabic
                ? "اختر الحي والموقع المناسب حسب ميزانيتك وأسلوب حياتك."
                : "Select a neighborhood that fits your budget and lifestyle."}
            </p>
          </div>
          <div>
            <Banknote className="h-8 w-8 text-teal-300 mb-2" />
            <h3 className="font-bold text-lg">
              {isArabic ? "تحديد الميزانية" : "Set a Budget"}
            </h3>
            <p className="text-muted-foreground">
              {isArabic
                ? "حدد ميزانيتك بعناية واحتسب التكاليف الإضافية مثل الرسوم والضرائب."
                : "Decide your budget and include all extra costs like fees and taxes."}
            </p>
          </div>
        </div>
      </section>

      {/* Buying Process Section */}
      <section className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-3xl font-semibold text-teal-300 text-center">
          {isArabic ? "دليل شراء العقارات" : "Property Buying Guide"}
        </h2>
        <ol className="space-y-4 text-muted-foreground list-decimal list-inside">
          <li>
            {isArabic
              ? "ابحث عن العقارات باستخدام مواقع موثوقة أو وكلاء معتمدين."
              : "Search properties via trusted websites or licensed agents."}
          </li>
          <li>
            {isArabic
              ? "قم بزيارة العقارات وحدد الأفضل."
              : "Visit shortlisted properties and evaluate them carefully."}
          </li>
          <li>
            {isArabic
              ? "تحقق من الأوراق القانونية وحقوق الملكية."
              : "Verify legal documents and ownership titles."}
          </li>
          <li>
            {isArabic
              ? "التفاوض على السعر وتوقيع العقد."
              : "Negotiate the price and sign the agreement."}
          </li>
          <li>
            {isArabic
              ? "استكمل الإجراءات في كتابة العدل أو عبر المنصات الرسمية مثل عقاري."
              : "Complete paperwork at the notary office or via official platforms like 'Aqari'."}
          </li>
        </ol>
      </section>

      {/* Seller Tips */}
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-semibold text-teal-300">
          {isArabic ? "نصائح للبائعين" : "Tips for Sellers"}
        </h2>
        <ul className="space-y-3 text-muted-foreground text-left list-disc list-inside">
          <li>
            {isArabic
              ? "تأكد من تسعير العقار بشكل تنافسي بناءً على السوق."
              : "Price your property competitively based on market research."}
          </li>
          <li>
            {isArabic
              ? "قم بتحسين شكل العقار لتقديم أفضل انطباع."
              : "Stage your property to make it visually appealing."}
          </li>
          <li>
            {isArabic
              ? "استخدم وسطاء محترفين للحصول على أفضل النتائج."
              : "Work with professional agents to maximize exposure and return."}
          </li>
        </ul>
      </section>

      {/* Renting Guidelines */}
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-semibold text-teal-300">
          {isArabic ? "استئجار عقار" : "Renting a Property"}
        </h2>
        <div className="text-muted-foreground text-left space-y-3">
          <p>
            {isArabic
              ? "تأكد من فهم شروط العقد بالكامل، بما في ذلك الإيجار الشهري، الودائع، وتكاليف الصيانة."
              : "Make sure to understand all lease terms including monthly rent, deposits, and maintenance responsibilities."}
          </p>
          <p>
            {isArabic
              ? "يفضل استخدام منصات إلكترونية رسمية مثل إيجار."
              : "Use official e-platforms like 'Ejar' to ensure legal protection."}
          </p>
        </div>
      </section>

      {/* Legal & Regulatory Section */}
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-semibold text-teal-300">
          {isArabic ? "الأنظمة والقوانين" : "Laws & Regulations"}
        </h2>
        <div className="text-muted-foreground text-left space-y-3">
          <p>
            {isArabic
              ? "كن على دراية بأنظمة وزارة الشؤون البلدية والقروية والإسكان والهيئة العامة للعقار."
              : "Stay informed on regulations by the Ministry of Municipal and Rural Affairs and the General Real Estate Authority."}
          </p>
          <p>
            {isArabic
              ? "التحقق من التراخيص والتسجيل في المنصات الرسمية مثل عقاري أمر ضروري."
              : "Verify licenses and register through official platforms like Aqari for compliance."}
          </p>
        </div>
      </section>

      {/* Security & Scam Awareness */}
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-semibold text-teal-300">
          {isArabic ? "السلامة وتجنب الاحتيال" : "Safety & Scam Protection"}
        </h2>
        <ShieldCheck className="h-10 w-10 text-teal-300 mx-auto" />
        <p className="text-muted-foreground">
          {isArabic
            ? "لا تشارك معلوماتك البنكية أو تدفع قبل التأكد من موثوقية الجهة العقارية."
            : "Never share banking information or make payments until you're sure the source is legitimate."}
        </p>
      </section>

      {/* Final CTA */}
      <section className="text-center py-12 bg-teal-50 rounded-2xl">
        <FileText className="h-8 w-8 mx-auto text-teal-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-teal-600">
          {isArabic ? "هل تحتاج لمساعدة إضافية؟" : "Need more guidance?"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {isArabic
            ? "فريقنا مستعد لمساعدتك خطوة بخطوة في رحلتك العقارية."
            : "Our team is ready to guide you every step of the way."}
        </p>
        <a
          href="/contact"
          className="inline-block bg-teal-300 text-white px-6 py-3 rounded-xl hover:bg-teal-600 transition"
        >
          {isArabic ? "تواصل معنا الآن" : "Contact Us Now"}
        </a>
      </section>
    </div>
  );
}
