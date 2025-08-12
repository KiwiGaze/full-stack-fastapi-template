import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link as RouterLink } from "@tanstack/react-router"
import { FiHome, FiSettings, FiUsers } from "react-icons/fi"
import type { IconType } from "react-icons/lib"

import type { UserPublic } from "@/client"

const items = [
  { icon: FiHome, title: "Dashboard", path: "/" },
  { icon: FiSettings, title: "User Settings", path: "/settings" },
]

interface SidebarItemsProps {
  onClose?: () => void
  collapsed?: boolean
}

interface Item {
  icon: IconType
  title: string
  path: string
}

const SidebarItems = ({ onClose, collapsed = false }: SidebarItemsProps) => {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const finalItems: Item[] = currentUser?.is_superuser
    ? [...items, { icon: FiUsers, title: "Admin", path: "/admin" }]
    : items

  const listItems = finalItems.map(({ icon, title, path }) => (
    <RouterLink key={title} to={path} onClick={onClose}>
      <Flex
        gap={collapsed ? 0 : 4}
        px={collapsed ? 2 : 6}
        py={4}
        _hover={{
          background: "gray.subtle",
          borderRadius: "md",
          transform: collapsed ? "scale(1.05)" : "translateX(2px)",
          transition: "all 0.2s",
        }}
        alignItems="center"
        justifyContent={collapsed ? "center" : "flex-start"}
        fontSize="md"
        borderRadius="md"
        transition="all 0.2s"
        cursor="pointer"
        minH={12}
        position="relative"
        title={collapsed ? title : undefined}
      >
        <Icon as={icon} alignSelf="center" boxSize={5} />
        {!collapsed && <Text ml={1} fontWeight="medium">{title}</Text>}
      </Flex>
    </RouterLink>
  ))

  return (
    <>
      {!collapsed && (
        <Text fontSize="sm" px={6} py={3} fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="wide">
          Menu
        </Text>
      )}
      <Box px={collapsed ? 0 : 2}>{listItems}</Box>
    </>
  )
}

export default SidebarItems
