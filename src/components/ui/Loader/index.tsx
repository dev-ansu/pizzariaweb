import { LoaderIcon } from "lucide-react"

export const Loader = ({classes}: {classes?: string})=>{
    return(
        <LoaderIcon className={`spin ${classes}`} />
    )
}