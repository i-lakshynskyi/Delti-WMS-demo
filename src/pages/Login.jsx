import { useEffect, useState } from 'react'
import useStore from '../store/useStore'
import trackLogoBlue from "../assets/track-logo-blue.png";
import infoBlue from "../assets/info-blue.png";
import {
    loginButton,
    loginInfo,
    loginInfoImg, loginInput,
    loginLogo,
    loginLogoImg, loginLogoText, loginExtraText,
    loginTitle,
    loginWrapper
} from "../styles/pages/loginStyle.js";


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const setUser = useStore((state) => state.setUser)

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'))
        if (savedUser) {
            setUser(savedUser)
            window.location.href = '/jobs'
        }
    }, [])

    const handleLogin = () => {
        const user = { username }
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        window.location.href = '/jobs'
    }

    const isValid = username.trim() && password.trim()

    return (
        <div className={loginWrapper}>
            <div className={loginLogo}>
                <img className={loginLogoImg} src={trackLogoBlue} alt="trackLogo" />
                <span className={loginLogoText}>DeltiStore</span>
            </div>
            <h1 className={loginTitle}>Login to DeltiStore</h1>
            <label htmlFor="username">Username</label>
            <input
                className={loginInput}
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="pas">Password</label>
            <input
                className={loginInput}
                type="password"
                id="pas"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className={loginButton} onClick={handleLogin} disabled={!isValid}>
                Login
            </button>
            <p className={loginExtraText}>Auto-login enabled when session data is available</p>
            <div className={loginInfo}>
                <img className={loginInfoImg} src={infoBlue} alt="trackLogo" />
                <span>For MVP, the system will automatically log you in if session data is available.</span>
            </div>
        </div>
    )
}

export default Login
