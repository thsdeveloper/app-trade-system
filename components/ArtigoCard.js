import { useRouter } from 'next/router';
import { Box, Badge, Image, Text } from '@chakra-ui/react';

function ArtigoCard({ artigo }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/artigo/${artigo.slug}`);
  };

  return (
    <Box
      onClick={handleClick}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
    >
      <Image src={artigo.imagem.url} alt={artigo.titulo} />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Novo
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {8} temporada(s)
          </Box>
        </Box>

        <Box my={2} fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
          {artigo.titulo}
        </Box>
        <Text
          style={{
            display: '-webkit-box',
            '-webkit-line-clamp': '3',
            overflow: 'hidden',
            '-webkit-box-orient': 'vertical',
          }}
          fontSize="sm"
        >
          {' '}
          {artigo.descricao}
        </Text>

        <Box d="flex" mt="3" alignItems="center">
          <Badge>{artigo._firstPublishedAt}</Badge>
        </Box>
      </Box>
    </Box>
  );
}

export default ArtigoCard;
