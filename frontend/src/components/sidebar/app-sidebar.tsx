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
import { useChatStore } from "@/stores/useChatStore"

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore(state => state.user)
  const received = useFriendStore(state => state.receivedList);
  const conversations = useChatStore(state => state.conversations)
  const [friendRequestOpen, setFriendRequestOpen] = useState(false);
  const groupChats = conversations.filter(convo => convo.type === 'group')
  const directChats = conversations.filter(convo => convo.type === 'direct')

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

          <SidebarGroup>
            <div className="flex items-center justify-between">
              <AddFriendModal />
              <AddGroupChatModal />
            </div>
          </SidebarGroup>

          <SidebarGroup>
            {(groupChats.length > 0 || directChats.length > 0) && (
              <SidebarGroupLabel className="uppercase">
                Conversations
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              {groupChats.length > 0 && <GroupChatList groupChats={groupChats} />}
              {directChats.length > 0 && <DirectChatList directChats={directChats} />}
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
