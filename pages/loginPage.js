import React from 'react'
import Login from '../components/Login'
import style from '../styles/Login.module.css'

const LoginPage = () =>{
    return(
        <div className={style.PageContainer}>
            <Login/>
        </div>
    )
}

export default LoginPage