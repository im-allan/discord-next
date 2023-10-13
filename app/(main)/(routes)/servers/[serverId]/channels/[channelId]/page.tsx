import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChatHeader } from "@/components/chat/chat-header";


interface ChannelPageProps {
  params: {
    serverId: string;
    channelId: string;
  }
}

const ChannelPage = async({ params }: ChannelPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    }
  });

  if (!channel || !member) {
    redirect("/");
  }

  return ( 
    <section className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader name={channel.name}  serverId={channel.serverId} type="channel" />
    </section>
   );
}
 
export default ChannelPage;