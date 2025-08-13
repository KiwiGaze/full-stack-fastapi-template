import { useQueryClient } from "@tanstack/react-query"
import { Link as RouterLink } from "@tanstack/react-router"
import { FiHome, FiUsers } from "react-icons/fi"
import type { IconType } from "react-icons/lib"

import type { UserPublic } from "@/client"
import { cn } from "@/lib/utils"

const items = [{ icon: FiHome, title: "Dashboard", path: "/" }]

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

  const listItems = finalItems.map(({ icon: IconComponent, title, path }) => (
    <RouterLink key={title} to={path} onClick={onClose}>
      <div
        className={cn(
          "flex items-center min-h-12 rounded-md transition-all duration-200 cursor-pointer relative",
          collapsed
            ? "gap-0 px-0 py-2 justify-center"
            : "gap-4 px-4 py-4 justify-start",
          "hover:bg-gray-100 hover:rounded-xl hover:transition-all hover:duration-200",
        )}
        title={collapsed ? title : undefined}
      >
        <IconComponent className="" />
        {!collapsed && (
          <span className="ml-1 font-medium text-base">{title}</span>
        )}
      </div>
    </RouterLink>
  ))

  return <div>{listItems}</div>
}

export default SidebarItems
