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
import {
  FormControl,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import {
  Box,
  Text,
  Image,
  HStack,
  SimpleGrid,
  useBreakpointValue
} from '@chakra-ui/react'
import { useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

import useGlobal from 'src/hooks/useGlobal'

function Movies() {
  const { movies, setMovies, code, setCode } = useGlobal()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    handleSubmit,
    formState: { errors }
  } = useForm()

  const mobile = useBreakpointValue({ base: true, sm: false })

  const [addingName, setAddingName] = useState('')
  const [addingImageUrl, setAddingImageUrl] = useState('')
  const [addingCode, setAddingCode] = useState(code)

  function handleAddMovie() {
    const data: any = {}
    data.id = addingCode
    data.name = addingName
    data.imageUrl = addingImageUrl
    if (addingName && addingImageUrl) {
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
        data.imageUrl = addingImageUrl
        setMovies([...movies, data])
        setCode(data.id + 1)
        setAddingCode(data.id + 1)
      }
      setAddingName('')
      setAddingImageUrl('')
    }
  }

  function handleEdit(data: any) {
    setAddingCode(data.id)
    setAddingName(data.name)
    setAddingImageUrl(data.imageUrl)
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

              <FormControl pt="1rem" isInvalid={errors.name}>
                <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
                <Input
                  id="imageUrl"
                  placeholder="Image URL"
                  size="lg"
                  focusBorderColor="blue.500"
                  value={addingImageUrl}
                  onChange={e => setAddingImageUrl(e.target.value)}
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

      <SimpleGrid
        mt={mobile ? '2rem' : ''}
        mb="5rem"
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
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
              <Box p="5">
                <HStack padding="1">
                  <IconButton
                    aria-label="Edit"
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => handleEdit(movie)}
                    size="sm"
                    icon={<EditIcon />}
                  />
                  <IconButton
                    aria-label="Delete"
                    variant="solid"
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDelete(movie)}
                    icon={<DeleteIcon />}
                  />
                </HStack>
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {movie.id} - {movie.name}
                </Box>
              </Box>
            </Box>
          ))}
      </SimpleGrid>

      <Button
        mt="2rem"
        colorScheme="purple"
        onClick={onOpen}
        position="fixed"
        mb="5rem"
        mr="2rem"
        bottom={0}
        right={0}
      >
        Add
      </Button>
    </div>
  )
}

export default Movies
