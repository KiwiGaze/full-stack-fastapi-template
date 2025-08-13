import { useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { FaBars } from "react-icons/fa"
import { FiLogOut, FiSettings } from "react-icons/fi"
import { LuAlignLeft, LuAlignRight } from "react-icons/lu"
import Logo from "/assets/images/logo-v-inverted.svg"

import type { UserPublic } from "@/client"
import useAuth from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../shadcn/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../shadcn/ui/avatar"
import { Button } from "../shadcn/ui/button"
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
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute z-[100] m-4"
            aria-label="Open Menu"
          >
            <FaBars />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="w-[280px] bg-gray-50 p-0 flex flex-col"
        >
          <SheetHeader className="flex flex-row justify-between items-center p-4 pb-0">
            <Link to="/">
              <img 
                src={Logo} 
                alt="Logo" 
                className="h-8 w-8 md:h-9 md:w-9" 
              />
            </Link>
          </SheetHeader>
          
          <div className="px-4 py-6 flex-1 flex flex-col justify-between">
            <div>
              <SidebarItems onClose={() => setOpen(false)} />
              <div className="px-2 mt-4">
                <button
                  onClick={() => {
                    logout()
                  }}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 min-h-12 w-full",
                    "rounded-md transition-all duration-200 cursor-pointer",
                    "hover:bg-red-50 hover:text-red-600 hover:rounded-xl",
                    "font-medium"
                  )}
                >
                  <FiLogOut />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile bottom user section */}
          <div className="absolute bottom-4 left-4 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-3 p-3 w-full",
                    "bg-white border border-gray-200 rounded-lg",
                    "hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm",
                    "cursor-pointer transition-all duration-200",
                    "shadow-xs"
                  )}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gray-500 text-white font-bold text-sm">
                      {(currentUser?.full_name || "U").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-semibold text-sm truncate">
                      {currentUser?.full_name || "User Name"}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {currentUser?.email || "user@example.com"}
                    </div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-1"
                side="top"
                align="start"
              >
                <Link to="settings">
                  <DropdownMenuItem className="min-h-12 hover:bg-gray-50 rounded-xl cursor-pointer">
                    <div className="flex items-center gap-4 px-3 py-2 w-full">
                      <FiSettings className="w-5 h-5" />
                      <span className="font-medium">Settings</span>
                    </div>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem 
                  className="min-h-12 hover:bg-gray-50 hover:text-red-600 rounded-xl cursor-pointer"
                  onClick={() => logout()}
                >
                  <div className="flex items-center gap-4 px-3 py-2 w-full">
                    <FiLogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop */}
      <div
        className={cn(
          "hidden md:flex sticky top-0 h-screen py-4 border-r border-gray-200",
          "bg-white flex-col transition-all duration-300 ease-in-out",
          collapsed ? "w-20 px-2" : "w-[280px] px-4"
        )}
      >
        {collapsed ? (
          <div className="flex items-center justify-center flex-col gap-3">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-7 w-7" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Expand sidebar"
              className="p-6"
            >
              <LuAlignRight className="w-6 h-6" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-6 pl-4">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-8 w-8" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Collapse sidebar"
            >
              <LuAlignLeft className="w-5 h-5" />
            </Button>
          </div>
        )}
        <SidebarItems collapsed={collapsed} />

        {/* Desktop bottom user section */}
        <div className={cn("mt-auto", collapsed ? "px-0" : "px-2")}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center bg-white border border-gray-200 rounded-lg",
                  "hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm",
                  "cursor-pointer transition-all duration-200 ease-in-out shadow-xs",
                  collapsed
                    ? "gap-0 p-2 justify-center"
                    : "gap-3 p-3 justify-start"
                )}
              >
                <Avatar className={collapsed ? "w-7 h-7" : "w-8 h-8"}>
                  <AvatarFallback 
                    className={cn(
                      "bg-gray-500 text-white font-bold",
                      collapsed ? "text-sm" : "text-base"
                    )}
                  >
                    {(currentUser?.full_name || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-semibold text-sm truncate">
                      {currentUser?.full_name || "User Name"}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {currentUser?.email || "user@example.com"}
                    </div>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[247px] bg-white rounded-lg shadow-lg border border-gray-200 p-1"
              side="top"
              align="start"
            >
              <Link to="settings">
                <DropdownMenuItem className="min-h-12 hover:bg-gray-50 rounded-xl cursor-pointer">
                  <div className="flex items-center gap-4 px-3 py-2 w-full justify-start">
                    <FiSettings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem 
                className="min-h-12 hover:bg-red-50 hover:text-red-600 rounded-xl cursor-pointer"
                onClick={() => logout()}
              >
                <div className="flex items-center gap-4 px-3 py-2 w-full justify-start">
                  <FiLogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}

export default Sidebar
