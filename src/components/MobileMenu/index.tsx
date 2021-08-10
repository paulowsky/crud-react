import React from 'react'
import { Box, IconButton, Flex, Link, Spacer } from '@chakra-ui/react'
import { ArrowBackIcon, SettingsIcon } from '@chakra-ui/icons'

import useGlobal from 'src/hooks/useGlobal'

export function MobileMenu() {
  const { logout } = useGlobal()

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
        <Link onClick={() => logout()}>
          <IconButton
            aria-label="Home"
            variant="solid"
            colorScheme="purple"
            icon={<ArrowBackIcon />}
          />
        </Link>

        <Spacer />

        <Link href="/dashboard/movies">
          <IconButton
            aria-label="Movies"
            variant="solid"
            colorScheme="purple"
            icon={<SettingsIcon />}
          />
        </Link>
      </Flex>
    </Box>
  )
}
