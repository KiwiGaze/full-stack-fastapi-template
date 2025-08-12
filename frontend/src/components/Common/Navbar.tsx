import { Flex, useBreakpointValue } from "@chakra-ui/react"

import UserMenu from "./UserMenu"

function Navbar() {
  const display = useBreakpointValue({ base: "none", md: "flex" })

  return (
    <Flex
      display={display}
      justify="space-between"
      position="sticky"
      color="white"
      align="center"
      bg="bg.subtle"
      w="100%"
      top={0}
      p={4}
    >
      {/* Desktop logo moved to Sidebar top. Keep mobile hidden Navbar anyway. */}
      <span />
      <Flex gap={2} alignItems="center">
        <UserMenu />
      </Flex>
    </Flex>
  )
}

export default Navbar
