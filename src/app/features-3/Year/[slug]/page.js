import PropTypes from 'prop-types'; // Import PropTypes

export async function generateStaticParams() {
  const allPossibleSlugs = [
    { slug: '2023' },
    { slug: '2024' },
    { slug: '2025' },
  ];
  return allPossibleSlugs;
}

export default function YearPage({ params }) {
  const { slug } = params;

  return (
    <div>
      <h1>Details for Year: {slug}</h1>
      <p>This page was statically generated for the year {slug}.</p>
    </div>
  );
}

// Add PropTypes validation for the 'params' prop
YearPage.propTypes = {
  params: PropTypes.shape({ // params is an object
    slug: PropTypes.string.isRequired, // and it must have a 'slug' property which is a required string
  }).isRequired, // params itself is also a required prop
};