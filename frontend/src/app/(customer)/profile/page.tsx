import { Profile } from "@/components/component/profile";
import LogoutBtn from "@/components/functional/LogoutBtn";

interface pageProps{
    
}

export default function page({}:pageProps ){
    return(
        <div className=''>
            <Profile/>
            <LogoutBtn/>
        </div>
    )
}