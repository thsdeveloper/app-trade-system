import Layout from '@src/components/Layout';
import { getAllArtigos } from '@src/lib/dato-cms';
import ArtigoView from '@src/components/ArtigoView';

function SeriePage({ artigo }) {
  return (
    <Layout
      title={artigo.name}
      path={`/${artigo.slug}`}
      description={artigo.description}
    >
      <ArtigoView artigo={artigo} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const slug = params?.slug;
  const artigos = await getAllArtigos();
  const artigo = artigos.find((s) => s.slug === slug) || null;

  if (!artigo) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      artigo,
      allSeries: artigos,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const artigos = await getAllArtigos();
  const slugs = artigos.map((s) => ({ params: { slug: s.slug } }));

  return {
    paths: slugs,
    fallback: false,
  };
};

export default SeriePage;
