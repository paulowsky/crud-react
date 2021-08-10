import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
  useDisclosure,
  Stack,
  Heading,
  useColorModeValue,
  useToast,
  Text
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import useGlobal from 'src/hooks/useGlobal'
import { Card } from 'src/components/Card'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

type User = {
  username: string
  password: string
}

function Login(props: any) {
  const { login, loginError, isAuthenticated } = useGlobal()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()
  const { isOpen, onToggle } = useDisclosure()
  const toast = useToast()
  const history = useHistory()

  useEffect(() => {
    if (loginError) {
      toast({
        title: 'Login error!',
        description: 'Verify your username and password and try again!',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }, [loginError])

  useEffect(() => {
    isAuthenticated && history.push('/dashboard/movies')
  }, [isAuthenticated])

  async function handleSignIn({ username, password }: User) {
    if (username && password)
      await login({
        username,
        password
      })
  }

  return (
    <div className="login">
      <title>Login - Movies</title>
      <Box
        bg={useColorModeValue('gray.50', 'inherit')}
        minH="100vh"
        py="12"
        px={{ base: '4', lg: '8' }}
      >
        <Box maxW="md" mx="auto">
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Sign in to your account
          </Heading>
          <Card mt="6">
            <form onSubmit={handleSubmit(handleSignIn)}>
              <Stack spacing="6">
                <FormControl isInvalid={errors.username}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    id="username"
                    placeholder="Username"
                    size="lg"
                    focusBorderColor="purple.500"
                    {...register('username', {
                      required: 'This is required!'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      id="password"
                      type={isOpen ? 'text' : 'password'}
                      autoComplete="current-password"
                      focusBorderColor="purple.500"
                      size="lg"
                      placeholder="Password"
                      {...register('password', {
                        required: 'This is required!'
                      })}
                    />
                    <InputRightElement>
                      <IconButton
                        bg="transparent !important"
                        variant="ghost"
                        colorScheme="purple"
                        mt="2"
                        mr="2"
                        aria-label={
                          isOpen ? 'Mask password' : 'Reveal password'
                        }
                        icon={isOpen ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={onToggle}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  name="button-submit"
                  color="white"
                  fontSize="md"
                  size="lg"
                  colorScheme="purple"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Sign in
                </Button>

                <Text textAlign="center">
                  username: admin | password: admin
                </Text>

                <Button
                  name="button-submit"
                  color="white"
                  fontSize="md"
                  size="lg"
                  colorScheme="cyan"
                  type="submit"
                  onClick={() => history.push('/')}
                >
                  Home
                </Button>
              </Stack>
            </form>
          </Card>
        </Box>
      </Box>
    </div>
  )
}

export default Login
