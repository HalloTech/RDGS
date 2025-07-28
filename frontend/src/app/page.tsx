
import { getUserData } from "@/actions/auth";
import  Homepage  from "@/components/component/homepage";
import { Landingpage } from "@/components/component/landingpage";
import Navbar from "@/components/component/navbar";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";

export default async function Home() {
  // const {userData}=useAuth()
  // const router=useRouter()
  const session=await getUserData()
  // console.log(session)

    // console.log(session?.role)
    if(session?.role=='admin'){
        redirect('/dashboard')
    }

  return (
    <div className=" overflow-hidden">
      <Navbar/>
      <Homepage user={session}/>
    {/* <Landingpage userData={session}/> */}
    </div>
  );
}
