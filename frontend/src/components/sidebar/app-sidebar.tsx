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
import AddGroupChatModal from "../chat/AddGroupChatModal/AddGroupChatModal"
import GroupChatList from "../chat/GroupChatList/GroupChatList"
import AddFriendModal from "../chat/AddFriendModal/AddFriendModal"
import { useAuthStore } from "@/stores/useAuthStore"
import DirectChatList from "../chat/DirectChatList/DirectChatList"
import { NavUser } from "./nav-user"
import { BellIcon } from "lucide-react"
import FriendList from "@/components/friendList/FriendList"
import { useState } from "react"
import FriendRequestDialog from "@/components/friendRequest/FriendRequestDialog"
import { Badge } from "../ui/badge"
import { useFriendStore } from "@/stores/useFriendStore"

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore(state => state.user)
  const received = useFriendStore(state => state.receivedList);
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
                  <div onClick={() => setFriendRequestOpen(true)} className="relative cursor-pointer">
                    <BellIcon className="text-muted-foreground dark:group-focus:text-accent-foreground!" />
                    <div className="absolute z-30 -top-2.5 -right-1.5">
                      {received.length > 0 && <Badge className="size-4.5 text-xs bg-gradient-chat border border-background">
                        {received?.length}
                      </Badge>}
                    </div>
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
                Group
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
                Friends
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
