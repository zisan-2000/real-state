"use client";

import Image from "next/image";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Residential", value: 45 },
  { name: "Commercial", value: 30 },
  { name: "Industrial", value: 15 },
  { name: "Land", value: 10 },
];

const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171"];

export default function AboutClient({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: any;
}) {
  const isArabic = lang === "ar";

  return (
    <section className="container mx-auto px-4 py-24 md:py-32 text-slate-100 space-y-24">
      {/* Title & Intro */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-teal-300">
          {dictionary.navigation.about}
        </h1>
        <p className="text-slate-400 text-lg">
          {isArabic
            ? "نحن شركة رائدة في تقديم حلول عقارية مبتكرة وموثوقة في المملكة العربية السعودية."
            : "We are a leading provider of innovative and reliable real estate solutions across Saudi Arabia."}
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-slate-200">
            {isArabic ? "مهمتنا" : "Our Mission"}
          </h2>
          <p className="text-slate-400">
            {isArabic
              ? "تمكين الأفراد والشركات من خلال حلول عقارية مخصصة، قائمة على الثقة والاحترافية والابتكار."
              : "Empowering individuals and businesses through tailored real estate solutions based on trust, professionalism, and innovation."}
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-slate-200">
            {isArabic ? "رؤيتنا" : "Our Vision"}
          </h2>
          <p className="text-slate-400">
            {isArabic
              ? "أن نكون الخيار الأول في سوق العقارات بالمملكة، من خلال تقديم تجارب استثنائية وخدمة عملاء لا مثيل لها."
              : "To be the first choice in the Saudi real estate market by delivering exceptional experiences and unmatched customer service."}
          </p>
        </div>
      </div>

      {/* Image Showcase */}
      {/* <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="overflow-hidden rounded-xl shadow-lg">
            <Image
              src={`/public/sa5.jpg`}
              alt={`Real estate ${i}`}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div> */}

      {/* Pie Chart Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">
          {isArabic ? "نسبة أنواع العقارات" : "Property Type Distribution"}
        </h2>
        <p className="mb-6 text-slate-400">
          {isArabic
            ? "نغطي جميع فئات العقارات لتلبية احتياجات السوق المتنوعة."
            : "We cover all categories of real estate to meet the diverse needs of the market."}
        </p>
        <div className="mx-auto max-w-md h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">
          {isArabic ? "قيمنا الأساسية" : "Our Core Values"}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-slate-400">
          {[
            {
              title: isArabic ? "الاحترافية" : "Professionalism",
              desc: isArabic
                ? "نتعامل بشفافية ومصداقية في جميع تعاملاتنا."
                : "We act with transparency and integrity in all interactions.",
            },
            {
              title: isArabic ? "الابتكار" : "Innovation",
              desc: isArabic
                ? "نستخدم أحدث التقنيات لحلول عقارية متقدمة."
                : "We utilize cutting-edge technologies for smarter real estate services.",
            },
            {
              title: isArabic ? "التركيز على العملاء" : "Customer Focus",
              desc: isArabic
                ? "نضع احتياجات عملائنا في صميم كل ما نقوم به."
                : "We place our clients’ needs at the heart of everything we do.",
            },
          ].map((val, i) => (
            <div key={i} className="bg-slate-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-2 text-slate-200">
                {val.title}
              </h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">
          {isArabic ? "لماذا تختارنا؟" : "Why Choose Us?"}
        </h2>
        <p className="text-slate-400">
          {isArabic
            ? "نحن نقدم مزيجاً فريداً من الخبرة المحلية والفهم العميق للسوق، مدعومين بفريق عمل متخصص وشغوف."
            : "We bring a unique blend of local expertise and deep market insight, backed by a dedicated and passionate team."}
        </p>
      </div>
    </section>
  );
}
