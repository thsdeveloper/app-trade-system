import { useState } from 'react';
import Image from 'next/image';
import {
  Heading,
  Button,
  Flex,
  Text,
  Box,
  SimpleGrid,
  useColorModeValue,
  Wrap,
  WrapItem,
  Center,
  Link,
} from '@chakra-ui/react';

import ArtigoCard from '@src/components/ArtigoCard';
import Layout from '@src/components/Layout';
import Footer from '@src/components/Footer';
import { getAllArtigos } from '@src/lib/dato-cms';

const Cover = ({ artigos }) => {
  const [currentArtigos] = useState(artigos);
  const bgColor = useColorModeValue('#FFFFFF', '#1A202C');

  return (
    <Box bgColor={bgColor}>
      <Flex justifyContent="center" alignItems="center" py={20}>
        <Flex
          px={[4, 8]}
          py={[0, 20]}
          w="full"
          maxW="1200px"
          direction="column"
        >
          <Heading
            as="h1"
            fontSize={{ base: '42px', md: '52px', lg: '72px' }}
            mb={4}
            fontWeight="xBold"
          >
            Sua plataforma de gerenciamento de trades
            <Box>direto ao ponto </Box>
            <Box bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text">
              100% free.
            </Box>
          </Heading>
          <Text fontSize={{ base: '16px', md: '20px', lg: '22px' }}>
            Mantenha seus trades de míni índice e miní dólar com total segurança
            e transparência de evolução!
          </Text>
          <Box>
            <Button
              as="a"
              my={10}
              colorScheme="purple"
              variant="outline"
              size="lg"
              href="#series"
            >
              Bora começar!
            </Button>
          </Box>
          <Box>
            <Wrap>
              {currentArtigos
                ?.filter((f) => f.ativo)
                ?.map((artigo) => (
                  <WrapItem key={artigo.id}>
                    <Center
                      w="100px"
                      h="100px"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      flexDirection="column"
                    >
                      <Image
                        src={artigo.imagem.url}
                        alt={artigo.titulo}
                        width={40}
                        height={40}
                        title={artigo.titulo}
                      />
                      <Text
                        fontSize="sm"
                        textAlign="center"
                        fontWeight="bold"
                        mt={2}
                      >
                        {artigo.name}
                      </Text>
                    </Center>
                  </WrapItem>
                ))}
            </Wrap>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

const Artigos = ({ artigos }) => (
  <Flex id="series" justify="center">
    <Flex w="full" maxW="1200px" px={[4, 8]} mt={10} direction="column">
      <Heading mb={4}>Notícias</Heading>
      <SimpleGrid columns={[1, null, 3]} spacing="40px">
        {artigos.map((artigo) => (
          <ArtigoCard artigo={artigo} key={artigo.id} />
        ))}
      </SimpleGrid>
    </Flex>
  </Flex>
);

export default function Home({ artigos }) {
  console.log('artugos', artigos);
  return (
    <Layout>
      <Box pb={10}>
        <Cover artigos={artigos} />
        <Artigos artigos={artigos} />
        <Footer />
      </Box>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const artigos = await getAllArtigos();

  return {
    props: {
      artigos,
    },
    revalidate: 120,
  };
};
