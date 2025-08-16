
import { getUserData } from "@/actions/auth";
import  Homepage  from "@/components/component/homepage";
import { Landingpage } from "@/components/component/landingpage";
import Navbar from "@/components/component/navbar";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";

export default async function Home() {
  const session=await getUserData()

  if(session?.role=='admin'){
    redirect('/dashboard')
  }

  return (
    <div>
      <Navbar/>
      <Homepage user={session}/>
    {/* <Landingpage userData={session}/> */}
    </div>
  );
}
