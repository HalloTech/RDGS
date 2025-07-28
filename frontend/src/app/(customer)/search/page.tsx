
import { SearchPage } from "@/components/component/productpage";

interface pageProps{
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function page({searchParams}:pageProps ){
    console.log(searchParams)
    return(
        <div className=''>
            <SearchPage category={searchParams?.category as string || ''} query={searchParams?.query as string || ''} page={parseInt(searchParams?.page as string) || 0}/>
        </div>
    )
}