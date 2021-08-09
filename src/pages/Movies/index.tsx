import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import { useForm } from 'react-hook-form'
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import useGlobal from 'src/hooks/useGlobal'
import {
  FormControl,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Text } from '@chakra-ui/react'
import { useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

function Movies() {
  const { movies, setMovies, code, setCode } = useGlobal()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [addingName, setAddingName] = useState('')
  const [addingCode, setAddingCode] = useState(code)

  function handleAddMovie() {
    const data: any = {}
    data.id = addingCode
    data.name = addingName
    if (addingName) {
      if (movies.find((movie: any) => movie.id === data.id)) {
        setMovies(
          movies.map((movie: any) => {
            if (movie.id === data.id) movie = data
            return movie
          })
        )
        setAddingCode(code)
      } else {
        data.id = code
        data.name = addingName
        setMovies([...movies, data])
        setCode(data.id + 1)
        setAddingCode(data.id + 1)
      }
      setAddingName('')
    }
  }

  function handleEdit(data: any) {
    setAddingCode(data.id)
    setAddingName(data.name)
    onOpen()
  }

  function handleDelete(data: any) {
    if (window.confirm('Remove this movie?')) {
      setMovies(movies.filter((movie: any) => movie.id !== data.id))
    }
  }

  return (
    <div className="movies">
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(handleAddMovie)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new Movie</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <Text size="lg" fontWeight="bold">
                ID: {addingCode}
              </Text>

              <FormControl pt="1rem" isInvalid={errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Name"
                  size="lg"
                  focusBorderColor="blue.500"
                  value={addingName}
                  onChange={e => setAddingName(e.target.value)}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} onClick={onClose}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      <Table variant="striped">
        <TableCaption>Movies playlist to watch soon!</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {movies.map((movie: any) => (
            <Tr key={movie.id}>
              <Td isNumeric>{movie.id}</Td>
              <Td>{movie.name}</Td>
              <Td>
                <IconButton
                  aria-label="Edit"
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => handleEdit(movie)}
                  icon={<EditIcon />}
                />
                <IconButton
                  aria-label="Delete"
                  variant="solid"
                  colorScheme="red"
                  onClick={() => handleDelete(movie)}
                  icon={<DeleteIcon />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button colorScheme="blue" onClick={onOpen}>
        Add
      </Button>
    </div>
  )
}

export default Movies
