import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/i18n-config";

export default async function ProjectsPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-4xl font-bold gold-text">
          {dictionary.navigation.projects}
        </h1>
        <p className="text-muted-foreground">
          {lang === "ar"
            ? "استعرض مشاريعنا العقارية المميزة المنتشرة في أنحاء المملكة."
            : "Explore our featured real estate projects across the Kingdom."}
        </p>
      </div>
    </div>
  );
}
