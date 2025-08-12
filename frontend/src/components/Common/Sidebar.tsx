import { Box, Flex, IconButton, Text } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { FaBars } from "react-icons/fa"
import { FiLogOut, FiChevronLeft, FiChevronRight } from "react-icons/fi"

import type { UserPublic } from "@/client"
import useAuth from "@/hooks/useAuth"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "../ui/drawer"
import SidebarItems from "./SidebarItems"

const Sidebar = () => {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Mobile */}
      <DrawerRoot
        placement="start"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <IconButton
            variant="ghost"
            color="inherit"
            display={{ base: "flex", md: "none" }}
            aria-label="Open Menu"
            position="absolute"
            zIndex="100"
            m={4}
          >
            <FaBars />
          </IconButton>
        </DrawerTrigger>
        <DrawerContent maxW="280px">
          <DrawerCloseTrigger />
          <DrawerBody p={6}>
            <Flex flexDir="column" justify="space-between" h="full">
              <Box>
                <SidebarItems onClose={() => setOpen(false)} />
                <Box px={2} mt={4}>
                  <Flex
                    as="button"
                    onClick={() => {
                      logout()
                    }}
                    alignItems="center"
                    gap={4}
                    px={6}
                    py={4}
                    _hover={{
                      background: "red.50",
                      borderRadius: "md",
                      color: "red.600",
                    }}
                    borderRadius="md"
                    transition="all 0.2s"
                    cursor="pointer"
                    minH={12}
                    w="full"
                  >
                    <FiLogOut />
                    <Text fontWeight="medium">Log Out</Text>
                  </Flex>
                </Box>
              </Box>
              {currentUser?.email && (
                <Text fontSize="sm" p={4} truncate maxW="sm" color="gray.500" bg="gray.50" borderRadius="md">
                  Logged in as: {currentUser.email}
                </Text>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>

      {/* Desktop */}

      <Box
        display={{ base: "none", md: "flex" }}
        position="sticky"
        bg="bg.subtle"
        top={0}
        w={collapsed ? "80px" : "280px"}
        h="100vh"
        p={collapsed ? 4 : 6}
        borderRight="1px solid"
        borderColor="gray.200"
        shadow="sm"
        transition="all 0.3s ease"
        flexDirection="column"
      >
        <Flex justify={collapsed ? "center" : "flex-end"} mb={4}>
          <IconButton
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            _hover={{ bg: "gray.100" }}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </IconButton>
        </Flex>
        <Box flex="1" overflow="hidden">
          <SidebarItems collapsed={collapsed} />
        </Box>
      </Box>
    </>
  )
}

export default Sidebar
