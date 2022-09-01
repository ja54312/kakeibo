import { SignOut } from "../lib/firebase"

export default function Logout (){
    const logout = () => SignOut()
    return(
        <button onClick={logout}>Logout</button>
    )
}