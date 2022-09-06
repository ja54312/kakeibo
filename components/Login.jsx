import { SignInWithPopup } from "../lib/firebase"
import Image from "next/image"
import LogoGoogle from '../public/google-icon.svg'
import styles from '../styles/Login.module.css'

export default function Login (){
    const login = () => SignInWithPopup()
    return(
        <div className={styles.containerSocialButton}>
            <Image src={LogoGoogle} alt="icono de google" width='40px' height='40px'/>
            <button onClick={login} className={styles.SocialButtonLoginGoogle}>Login with Google</button>
        </div>
    )
}