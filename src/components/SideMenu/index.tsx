import { VStack, Link, Text, Flex, useBreakpointValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import React from 'react'

export function SideMenu() {
  const height = useBreakpointValue({
    base: '90%',
    xl: '90%',
    lg: '88%',
    md: '83%',
    sm: '85%'
  })

  return (
    <Flex
      as="aside"
      w="72"
      h={height}
      bgColor="white"
      mt="3.6rem"
      py="8"
      mx="6"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
      borderRadius={4}
      position="fixed"
      direction="column"
    >
      <VStack spacing="4" pr="8" alignItems="stretch">
        <Text fontWeight="bold" color="gray.700" fontSize="small" px={8}>
          General
        </Text>
        <Link
          display="flex"
          alignItems="center"
          py="1"
          pl={8}
          href="/"
          // color="purple.500"
          // borderLeft="3px solid"
        >
          <SunIcon size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">
            Dashboard
          </Text>
        </Link>

        <Link
          display="flex"
          alignItems="center"
          py="1"
          pl={8}
          mt="auto"
          href="/movies"
          // color="gray.500"
          // borderLeft="3px solid transparent"
        >
          <MoonIcon size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">
            Movies
          </Text>
        </Link>
      </VStack>
    </Flex>
  )
}
