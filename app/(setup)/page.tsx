import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async() => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      } 
    }
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }
  return <section>Create A Server</section>;
}
 
export default SetupPage;

// TODO: Hacer commits de la branch y luego avanzar el video Initial modal UI 1:25:20