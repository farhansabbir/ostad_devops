// This file is located at app/features-3/Year/[slug]/page.js (or .tsx)

// This function tells Next.js what static paths to generate at build time
export async function generateStaticParams() {
  // Replace this with your actual logic to fetch/determine all possible 'slug' values.
  // For example, if 'slug' represents years, you might list the years you want to pre-render.
  const allPossibleSlugs = [
    { slug: '2023' },
    { slug: '2024' },
    { slug: '2025' },
    // ... add all other possible values for [slug] that you want to be static
  ];

  return allPossibleSlugs;
}

export default function YearPage({ params }) {
  // 'params.slug' will contain the current slug value for the page (e.g., '2023', '2024')
  const { slug } = params;

  return (
    <div>
      <h1>Details for Year: {slug}</h1>
      {/* Your page content that uses 'slug' */}
      <p>This page was statically generated for the year {slug}.</p>
    </div>
  );
}