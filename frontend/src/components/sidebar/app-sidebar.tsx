import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Switch } from "../ui/switch"
import AddGroupChatModal from "../chat/AddGroupChatModal"
import GroupChatList from "../chat/GroupChatList/GroupChatList"
import AddFriendModal from "../chat/AddFriendModal"
import CreateNewChat from "../chat/CreateNewChat"
import { useThemeStore } from "@/stores/useThemeStore"
import { useAuthStore } from "@/stores/useAuthStore"
import DirectChatList from "../chat/DirectChatList/DirectChatList"
import { NavUser } from "./nav-user"

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isDark, toggleTheme } = useThemeStore()
  const user = useAuthStore(s => s.user)
  return (
    <Sidebar variant="inset" className={`${className ?? ''} relative`} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex w-full items-center px-4 justify-between border-b h-18">
              <div className="flex items-center gap-2">
                <img src='/logo.svg' width={25} height={25} />
                <p className="text-xl font-bold">Chatty</p>
              </div>
              <div className="flex items-center gap-2">
                <img src="/sun.svg" alt="sun" width={20} height={20} />
                <Switch
                  checked={isDark}
                  onCheckedChange={toggleTheme}
                  className="transition-all duration-300
                          data-[state=unchecked]:bg-[hsl(120_60%_45%)]!
                          data-[state=checked]:bg-indigo-500!
                          dark:data-[state=unchecked]:bg-[hsl(120_60%_45%)]!
                          dark:data-[state=checked]:bg-indigo-500"
                />
                <img src={isDark ? "/moon-white.svg" : "/moon.svg"} alt="moon" width={20} height={20} />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* New Chat */}
        <SidebarGroup>
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group Chat */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            Group Chat
          </SidebarGroupLabel>
          <SidebarGroupAction
            title='Create Group'
            className="cursor-pointer"
          >
            <AddGroupChatModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <GroupChatList />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Direct Chat */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            Friends
          </SidebarGroupLabel>
          <SidebarGroupAction
            title='Add friend'
            className="cursor-pointer"
          >
            <AddFriendModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <DirectChatList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  )
}
