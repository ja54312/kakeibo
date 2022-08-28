import { SignInWithPopup } from "../lib/firebase"

export default function Login (){
    const login = () => SignInWithPopup()
    return(
        <button onClick={login}>Login with Google</button>
    )
}