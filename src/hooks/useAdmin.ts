import { useSelector } from "react-redux"
import { IRootState } from "../store/store"

export const useAdmin = () => {
    
    const { data, auth } = useSelector((state:IRootState)=> state)

    return {
        isAdmin: data.projectActive?.type === 'admin',
        user: auth
    }
}
