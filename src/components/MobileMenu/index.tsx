import { Box, IconButton, Flex, Link, Spacer } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import React from 'react'

export function MobileMenu() {
  return (
    <Box
      bg="purple.600"
      w="100%"
      py="0.5rem"
      bottom={0}
      position="fixed"
      shadow="0 -10px 12px rgba(0, 0, 0, 0.20)"
      zIndex="1000"
    >
      <Flex px="2rem">
        <Link href="/">
          <IconButton
            aria-label="Home"
            variant="solid"
            colorScheme="purple"
            icon={<SunIcon />}
          />
        </Link>

        <Spacer />

        <Link href="/movies">
          <IconButton
            aria-label="Movies"
            variant="solid"
            colorScheme="purple"
            icon={<MoonIcon />}
          />
        </Link>
      </Flex>
    </Box>
  )
}
