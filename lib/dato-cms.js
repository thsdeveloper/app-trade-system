const API_URL = 'https://graphql.datocms.com/';
const API_TOKEN = process.env.DATOCMS_READ_ONLY_API_TOKEN;

async function fetchCmsAPI(query, { variables } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getAllArtigos() {
  const data = await fetchCmsAPI(`
{
  allArtigos {
    id
    titulo
    descricao
    slug
    ativo
    imagem {
      url(imgixParams: {fm: jpg, fit: crop})
    }
    _status
    _firstPublishedAt
  }
  _allArtigosMeta {
    count
  }
}
  `);

  return data.allArtigos;
}

export default { getAllArtigos };
