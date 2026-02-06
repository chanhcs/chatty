import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
// import { Switch } from "../ui/switch"
import AddGroupChatModal from "../chat/AddGroupChatModal"
import GroupChatList from "../chat/GroupChatList/GroupChatList"
import AddFriendModal from "../chat/AddFriendModal/AddFriendModal"
// import { useThemeStore } from "@/stores/useThemeStore"
import { useAuthStore } from "@/stores/useAuthStore"
import DirectChatList from "../chat/DirectChatList/DirectChatList"
import { NavUser } from "./nav-user"
import { BellIcon } from "lucide-react"
import FriendList from "@/components/friendList/FriendList"
import { useState } from "react"
import FriendRequestDialog from "@/components/friendRequest/FriendRequestDialog"

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { isDark, toggleTheme } = useThemeStore()
  const user = useAuthStore(state => state.user)
  const [friendRequestOpen, setFriendRequestOpen] = useState(false);

  return (
    <>
      <Sidebar className={`${className ?? ''}`} {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex w-full items-center px-4 justify-between border-b h-18">
                <div className="flex items-center gap-2">
                  <img src='/logo.svg' width={25} height={25} />
                  <p className="text-xl font-bold">Chatty</p>
                </div>
                <div className="flex items-center gap-2">
                  {/* <img src="/sun.svg" alt="sun" width={20} height={20} /> */}
                  {/* <Switch
                  checked={isDark}
                  onCheckedChange={toggleTheme}
                  className="transition-all duration-300
                          data-[state=unchecked]:bg-[hsl(120_60%_45%)]!
                          data-[state=checked]:bg-indigo-500!
                          dark:data-[state=unchecked]:bg-[hsl(120_60%_45%)]!
                          dark:data-[state=checked]:bg-indigo-500"
                /> */}
                  {/* <img src={isDark ? "/moon-white.svg" : "/moon.svg"} alt="moon" width={20} height={20} /> */}
                  <div onClick={() => setFriendRequestOpen(true)} className="cursor-pointer">
                    <BellIcon className="text-muted-foreground dark:group-focus:text-accent-foreground!" />
                  </div>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {/* New Chat */}
          <SidebarGroup>
            <SidebarGroupContent>
              <FriendList />
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Group Chat */}
          <SidebarGroup>
            <div className="flex items-center justify-between">
              <SidebarGroupLabel className="uppercase">
                Group Message
              </SidebarGroupLabel>
              <AddGroupChatModal />
            </div>
            <SidebarGroupContent>
              <GroupChatList />
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Direct Chat */}
          <SidebarGroup>
            <div className="flex items-center justify-between">
              <SidebarGroupLabel className="uppercase">
                Direct Message
              </SidebarGroupLabel>
              <AddFriendModal />
            </div>
            <SidebarGroupContent>
              <DirectChatList />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {user && <NavUser
            user={user}
            setFriendRequestOpen={setFriendRequestOpen}
          />}
        </SidebarFooter>
      </Sidebar>
      <FriendRequestDialog
        open={friendRequestOpen}
        setOpen={setFriendRequestOpen}
      />
    </>
  )
}
