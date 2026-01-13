import { Moon, Sun, } from "lucide-react"
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
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Switch } from "../ui/switch"
import AddGroupChatModal from "../chat/AddGroupChatModal"
import GroupChatList from "../chat/GroupChatList/GroupChatList"
import AddFriendModal from "../chat/AddFriendModal"
import CreateNewChat from "../chat/CreateNewChat"
import { useThemeStore } from "@/stores/useThemeStore"
import Logout from "../auth/Logout"
import { useAuthStore } from "@/stores/useAuthStore"
import DirectChatList from "../chat/DirectChatList/DirectChatList"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isDark, toggleTheme } = useThemeStore()
  const user = useAuthStore(s => s.user)
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="bg-gradient-primary rounded-none glass">
              <div className="flex w-full items-center px-2 justify-between">
                <p className="text-xl font-bold text-white">Chatty</p>
                <div className="flex items-center gap-2">
                  <Sun className="size-4 text-white/80" />
                  <Switch
                    checked={isDark}
                    onCheckedChange={toggleTheme}
                    className="data-[state=checked]:bg-background/80"
                  />
                  <Moon className="size-4 text-white/80" />
                </div>
              </div>
            </SidebarMenuButton>
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
          <SidebarGroupLabel>
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
          <SidebarGroupLabel>
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
        {/* <NavUser user={data.user} /> */}
        <div className="flex justify-end">
          <Logout />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
