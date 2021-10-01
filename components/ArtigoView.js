import SerieViewContent from './ArtigoViewContent';
import ArtigoViewHeader from './ArtigoViewHeader';

function ArtigoView({ artigo }) {
  return (
    <>
      <ArtigoViewHeader artigo={artigo} />
      <SerieViewContent artigo={artigo} />
    </>
  );
}

export default ArtigoView;
