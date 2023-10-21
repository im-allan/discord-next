import { Hash } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/socket-indicator";
import { ChatVideoButton } from "@/components/chat/chat-video-button";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <section className="text-sm font-semibold px-3 flex items-center h-12 md:h-16 border-neutral-200 dark:border-neutral-800 border-b-2 dark:border-t-[#1E1F22] border-t-[#E3E5E8] md:border-t-[1rem]">
      <MobileToggle serverId={serverId} />
      { type === "channel" && (
        <Hash className="w-6 h-6 text-zinc-500 dark:text-zinc-400 mr-2"/>
      )}
      { type === "conversation" && (
        <UserAvatar src={ imageUrl } className="h-5 w-5 md:h-5 md:w-5 mr-2"/>
      )}
      <p className="font-semibold text-md text-black dark:text-white"> {name} </p>
      <div className="ml-auto flex items-center">
        {type === "conversation" && (
          <ChatVideoButton />
        )}
        <SocketIndicator />
      </div>
    </section>
  )
}