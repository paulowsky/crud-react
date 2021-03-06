import {
  Button,
  Box,
  Center,
  Flex,
  Spacer,
  Image,
  Text,
  SimpleGrid
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import useGlobal from 'src/hooks/useGlobal'

function Home(props: any) {
  const { movies } = useGlobal()
  const history = useHistory()

  return (
    <div className="home">
      <Flex
        as="header"
        h="4.2rem"
        w="100%"
        bgColor="white"
        px="8"
        shadow="0 0 20px rgba(0, 0, 0, 0.05)"
        alignItems="center"
      >
        <Spacer />

        <Box>
          <Button onClick={() => history.push('/login')}>Dashboard</Button>
        </Box>
      </Flex>

      <Center>
        <Text mt="1rem" textAlign="center" as="em" fontSize="2xl">
          Movies to watch!
        </Text>
      </Center>

      <SimpleGrid
        mb="1rem"
        columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
        spacing="1"
      >
        {movies &&
          movies.map((movie: any) => (
            <Box
              key={movie.id}
              mt="1rem"
              mx="1rem"
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image src={movie.imageUrl} alt={movie.name} />

              <Box p="6">
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {movie.name}
                </Box>
              </Box>
            </Box>
          ))}
      </SimpleGrid>
    </div>
  )
}

export default Home
