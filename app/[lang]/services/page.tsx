import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/i18n-config";
import {
  Building2,
  Home,
  ScrollText,
  Key,
  ShieldCheck,
  Wrench,
  ThumbsUp,
  Users,
  Workflow,
  PhoneCall,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function ServicesPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const isArabic = lang === "ar";

  const services = [
    {
      icon: <Home className="h-10 w-10 text-teal-600" />,
      title: isArabic ? "شراء وبيع العقارات" : "Buying & Selling Properties",
      description: isArabic
        ? "نرشدك خلال كل خطوة من عملية شراء أو بيع العقار، مع تحليل سوق مفصل ودعم قانوني كامل لضمان أفضل عائد على استثمارك."
        : "We guide you through every step of the buying or selling process with market insights and full legal support.",
    },
    {
      icon: <ScrollText className="h-10 w-10 text-teal-600" />,
      title: isArabic ? "الاستشارات العقارية" : "Real Estate Consulting",
      description: isArabic
        ? "نوفر تحليلات مخصصة ودراسات جدوى وخطط استراتيجية تساعدك على اتخاذ قرارات مبنية على بيانات دقيقة."
        : "We provide personalized consulting, feasibility studies, and strategy planning based on accurate data.",
    },
    {
      icon: <Key className="h-10 w-10 text-teal-600" />,
      title: isArabic ? "الإيجار العقاري" : "Property Leasing",
      description: isArabic
        ? "سواء كنت مالكاً أو مستأجراً، نضمن لك تجربة إيجار آمنة وسلسة من التفاوض حتى إدارة العقود."
        : "From negotiation to contract management, we make your leasing experience secure and seamless.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-teal-600" />,
      title: isArabic ? "إدارة الممتلكات" : "Property Management",
      description: isArabic
        ? "ندير ممتلكاتك بكفاءة من خلال الصيانة والتحصيل وإعداد تقارير مالية دورية."
        : "Efficient management including maintenance, rent collection, and financial reporting.",
    },
    {
      icon: <Wrench className="h-10 w-10 text-teal-600" />,
      title: isArabic ? "الخدمات الهندسية والصيانة" : "Engineering & Maintenance",
      description: isArabic
        ? "خدمات صيانة دورية وهندسية تضمن استدامة الممتلكات وسلامة العمليات."
        : "Ongoing engineering and maintenance services that ensure durability and operational safety.",
    },
    {
      icon: <Building2 className="h-10 w-10 text-teal-600" />,
      title: isArabic ? "التطوير العقاري" : "Real Estate Development",
      description: isArabic
        ? "من التصور حتى التنفيذ، ندير مراحل تطوير المشروع العقاري بالكامل."
        : "From vision to execution, we manage all phases of real estate project development.",
    },
  ];

  const benefits = [
    {
      icon: <ThumbsUp className="h-8 w-8 text-teal-600" />,
      title: isArabic ? "خبرة موثوقة" : "Trusted Expertise",
      desc: isArabic
        ? "أكثر من 10 سنوات من الخبرة في تقديم حلول عقارية ناجحة."
        : "Over 10 years of proven success in real estate solutions.",
    },
    {
      icon: <Users className="h-8 w-8 text-teal-600" />,
      title: isArabic ? "فريق متخصص" : "Expert Team",
      desc: isArabic
        ? "فريق احترافي من وكلاء واستشاريين عقاريين متخصصين."
        : "A team of experienced agents and real estate consultants.",
    },
    {
      icon: <Workflow className="h-8 w-8 text-teal-600" />,
      title: isArabic ? "نهج شفاف" : "Transparent Process",
      desc: isArabic
        ? "نتواصل معك بوضوح في كل مرحلة من مراحل الخدمة."
        : "Clear, open communication at every stage of the process.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah L.",
      quote:
        "Their consulting services helped me avoid a major investment mistake. Professional and transparent from day one!",
    },
    {
      name: "Khaled M.",
      quote:
        "فريق محترف ودقيق. تجربة إيجارية سلسة ومريحة. أوصي بشدة بالتعامل معهم.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 space-y-24">
      {/* Header */}
      <div className="text-center max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">
          {dictionary.navigation.services}
        </h1>
        <p className="text-muted-foreground text-lg">
          {isArabic
            ? "اكتشف خدماتنا المصممة لتلبية جميع احتياجاتك العقارية بكفاءة واحترافية."
            : "Discover our services crafted to meet all your real estate needs with efficiency and professionalism."}
        </p>
      </div>

      {/* Services Grid */}
      <div>
        <h2 className="text-3xl font-semibold text-teal-600 mb-6 text-center">
          {isArabic ? "خدماتنا المتكاملة" : "Our Full-Service Solutions"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Card key={i} className="rounded-2xl p-6 shadow-md hover:shadow-xl">
              <CardContent className="flex flex-col gap-4">
                {service.icon}
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-teal-600 mb-6">
          {isArabic ? "لماذا تختارنا؟" : "Why Choose Us?"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {benefit.icon}
              <h4 className="font-bold mt-2">{benefit.title}</h4>
              <p className="text-muted-foreground">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How We Work */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-semibold text-teal-600">
          {isArabic ? "كيف نعمل" : "How We Work"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div>
            <h4 className="font-bold mb-2">
              {isArabic ? "١. استشارة مجانية" : "1. Free Consultation"}
            </h4>
            <p className="text-muted-foreground">
              {isArabic
                ? "نبدأ بفهم أهدافك العقارية وتقديم حلول أولية."
                : "We start by understanding your goals and providing initial guidance."}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-2">
              {isArabic ? "٢. خطة مخصصة" : "2. Customized Plan"}
            </h4>
            <p className="text-muted-foreground">
              {isArabic
                ? "نطوّر خطة عمل تناسب احتياجاتك الخاصة."
                : "We develop a tailored action plan that fits your unique needs."}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-2">
              {isArabic ? "٣. تنفيذ ومتابعة" : "3. Execution & Follow-Up"}
            </h4>
            <p className="text-muted-foreground">
              {isArabic
                ? "ننفذ الخطة معك ونبقى على تواصل لضمان نجاحك."
                : "We execute the plan together and provide continuous support to ensure success."}
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-teal-600 mb-6">
          {isArabic ? "ماذا يقول عملاؤنا؟" : "What Our Clients Say"}
        </h2>
        <div className="space-y-4">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="italic text-muted-foreground border-l-4 border-teal-500 pl-4"
            >
              “{t.quote}”
              <div className="mt-2 font-semibold text-sm text-teal-600">
                — {t.name}
              </div>
            </blockquote>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-12 bg-teal-50 rounded-2xl">
        <PhoneCall className="h-8 w-8 mx-auto text-teal-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-teal-700">
          {isArabic ? "هل أنت مستعد للخطوة التالية؟" : "Ready to take the next step?"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {isArabic
            ? "تواصل معنا اليوم للحصول على استشارة عقارية مجانية!"
            : "Get in touch today for your free real estate consultation!"}
        </p>
        <a
          href="/contact"
          className="inline-block bg-teal-300 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition"
        >
          {isArabic ? "تواصل معنا" : "Contact Us"}
        </a>
      </div>
    </div>
  );
}
