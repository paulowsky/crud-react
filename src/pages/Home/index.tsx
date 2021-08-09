import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

import useGlobal from 'src/hooks/useGlobal'

function Home(props: any) {
  const { movies } = useGlobal()

  return (
    <div className="home">
      <Table variant="striped">
        <TableCaption>Movies playlist to watch soon!</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {movies &&
            movies.map((movie: any) => (
              <Tr key={movie.id}>
                <Td isNumeric>{movie.id}</Td>
                <Td>{movie.name}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </div>
  )
}

export default Home
