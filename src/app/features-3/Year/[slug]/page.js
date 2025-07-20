import MonthlySheetClient from "./MonthlySheetClient";

export async function generateStaticParams() {
  // Generate params for the last 12 months as an example
  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    return { slug: `${year}-${month}` };
  });
 
  return months;
}

export default function MonthlySheetPage({ params }) {
  return <MonthlySheetClient slug={params.slug} />;
}
