import { Box, Flex, Icon, IconButton, Image, Text } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { FaBars } from "react-icons/fa"
import { FiLogOut, FiSettings } from "react-icons/fi"
import { LuAlignLeft, LuAlignRight } from "react-icons/lu"
import Logo from "/assets/images/logo-v-inverted.svg"

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
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu"
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
        <DrawerContent maxW="280px" bg="bg.subtle" position="relative">
          <Flex justify="space-between" align="center" p={4}>
            <Link to="/">
              <Image src={Logo} alt="Logo" boxSize={{ base: 8, md: 9 }} p={0} />
            </Link>
            <DrawerCloseTrigger
              size="md"
              position="static"
              top="auto"
              insetEnd="auto"
              ml="auto"
            />
          </Flex>
          <DrawerBody px={4} py={6}>
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
            </Flex>
          </DrawerBody>

          {/* Mobile bottom user section */}
          <Box position="absolute" insetX={4} bottom={4}>
            <MenuRoot positioning={{ placement: "top-start" }}>
              <MenuTrigger asChild>
                <Flex
                  align="center"
                  gap={3}
                  p={3}
                  bg="bg.panel"
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="bg.emphasized"
                  _hover={{
                    bg: "bg.subtle",
                    borderColor: "bg.emphasized",
                    boxShadow: "sm",
                  }}
                  cursor="pointer"
                  transition="all 0.2s ease"
                  boxShadow="xs"
                >
                  <Box
                    w={8}
                    h={8}
                    borderRadius="full"
                    bg="gray.500"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontWeight="bold"
                    fontSize="md"
                  >
                    {(currentUser?.full_name || "U").charAt(0).toUpperCase()}
                  </Box>
                  <Box flex="1" minW={0}>
                    <Text fontWeight="semibold" truncate fontSize="sm">
                      {currentUser?.full_name || "User Name"}
                    </Text>
                    <Text fontSize="xs" color="gray.500" truncate>
                      {currentUser?.email || "user@example.com"}
                    </Text>
                  </Box>
                </Flex>
              </MenuTrigger>
              <MenuContent
                w="256px"
                bg="bg.panel"
                borderRadius="lg"
                boxShadow="lg"
                borderWidth="1px"
                borderColor="bg.emphasized"
                p={1}
                zIndex="999999"
              >
                <Link to="settings">
                  <MenuItem
                    value="settings"
                    closeOnSelect
                    minH={12}
                    _hover={{
                      bg: "bg.subtle",
                      borderRadius: "xl",
                    }}
                    borderRadius="md"
                    style={{ cursor: "pointer" }}
                  >
                    <Flex align="center" gap={4} px={3} py={2} w="full">
                      <Icon as={FiSettings} boxSize={5} />
                      <Text fontWeight="medium">Settings</Text>
                    </Flex>
                  </MenuItem>
                </Link>
                <MenuItem
                  value="logout"
                  minH={12}
                  _hover={{
                    bg: "bg.subtle",
                    color: "red.600",
                    borderRadius: "xl",
                  }}
                  borderRadius="md"
                  onClick={() => logout()}
                  style={{ cursor: "pointer" }}
                >
                  <Flex align="center" gap={4} px={3} py={2} w="full">
                    <Icon as={FiLogOut} boxSize={5} />
                    <Text fontWeight="medium">Logout</Text>
                  </Flex>
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          </Box>
        </DrawerContent>
      </DrawerRoot>

      {/* Desktop */}

      <Box
        display={{ base: "none", md: "flex" }}
        position="sticky"
        bg="bg.panel"
        top={0}
        w={collapsed ? "80px" : "280px"}
        h="100vh"
        px={collapsed ? 2 : 4}
        py={4}
        borderRight="1px solid"
        borderColor="bg.emphasized"
        transition="all 0.3s ease"
        flexDirection="column"
      >
        {collapsed ? (
          <Flex align="center" justify="center" direction="column" gap={3}>
            <Link to="/">
              <Image src={Logo} alt="Logo" boxSize={7} />
            </Link>
            <IconButton
              variant="ghost"
              size="md"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Expand sidebar"
              p={6}
            >
              <Icon as={LuAlignRight} boxSize={6} />
            </IconButton>
          </Flex>
        ) : (
          <Flex align="center" justify="space-between" mb={6} pl={4}>
            <Link to="/">
              <Image src={Logo} alt="Logo" boxSize={8} p={0} />
            </Link>
            <IconButton
              variant="ghost"
              size="md"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Collapse sidebar"
            >
              <Icon as={LuAlignLeft} boxSize={5} />
            </IconButton>
          </Flex>
        )}
        <SidebarItems collapsed={collapsed} />

        {/* Desktop bottom user section */}
        <Box mt="auto" px={collapsed ? 0 : 2}>
          <MenuRoot positioning={{ placement: "top-start" }}>
            <MenuTrigger asChild>
              <Flex
                align="center"
                gap={collapsed ? 0 : 3}
                p={collapsed ? 2 : 3}
                bg="bg.panel"
                borderRadius="lg"
                borderWidth="1px"
                borderColor="bg.emphasized"
                _hover={{
                  bg: "bg.subtle",
                  borderColor: "bg.emphasized",
                  boxShadow: "sm",
                }}
                cursor="pointer"
                transition="all 0.2s ease"
                justifyContent={collapsed ? "center" : "flex-start"}
                boxShadow="xs"
              >
                <Box
                  w={collapsed ? 7 : 8}
                  h={collapsed ? 7 : 8}
                  borderRadius="full"
                  bg="gray.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontWeight="bold"
                  fontSize={collapsed ? "sm" : "md"}
                >
                  {(currentUser?.full_name || "U").charAt(0).toUpperCase()}
                </Box>
                {!collapsed && (
                  <Box flex="1" minW={0}>
                    <Text fontWeight="semibold" truncate fontSize="sm">
                      {currentUser?.full_name || "User Name"}
                    </Text>
                    <Text fontSize="xs" color="gray.500" truncate>
                      {currentUser?.email || "user@example.com"}
                    </Text>
                  </Box>
                )}
              </Flex>
            </MenuTrigger>
            <MenuContent
              w="247px"
              bg="bg.panel"
              borderRadius="lg"
              boxShadow="lg"
              borderWidth="1px"
              borderColor="bg.emphasized"
              p={1}
            >
              <Link to="settings">
                <MenuItem
                  value="settings"
                  closeOnSelect
                  minH={12}
                  _hover={{
                    bg: "bg.subtle",
                    borderRadius: "xl",
                  }}
                  borderRadius="md"
                  style={{ cursor: "pointer" }}
                >
                  <Flex
                    align="center"
                    gap={4}
                    px={3}
                    py={2}
                    w="full"
                    justifyContent={"flex-start"}
                  >
                    <Icon as={FiSettings} boxSize={5} />
                    <Text fontWeight="medium">Settings</Text>
                  </Flex>
                </MenuItem>
              </Link>
              <MenuItem
                value="logout"
                minH={12}
                _hover={{
                  bg: "red.subtle",
                  color: "red.emphasized",
                  borderRadius: "xl",
                }}
                borderRadius="md"
                onClick={() => logout()}
                style={{ cursor: "pointer" }}
              >
                <Flex
                  align="center"
                  gap={4}
                  px={3}
                  py={2}
                  w="full"
                  justifyContent={"flex-start"}
                >
                  <Icon as={FiLogOut} boxSize={5} />
                  <Text fontWeight="medium">Logout</Text>
                </Flex>
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </Box>
      </Box>
    </>
  )
}

export default Sidebar
