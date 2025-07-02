import {useEffect, useRef, useState} from 'react'
import useStore from '../../store/useStore.js'
import trackLogoBlue from "../../assets/track-logo-blue.png";
import infoBlue from "../../assets/info-blue.png";
import {
    loginButton,
    loginInfo,
    loginInfoImg,
    loginInput,
    loginLogo,
    loginLogoImg,
    loginLogoText,
    loginExtraText,
    loginTitle,
    loginWrapper,
    loginButtonDisabled,
    loginLabel,
    eyeToggleButton,
    loginInputPasswordContainer,
    eyesToggleContainer, eyeToggleButtonImg
} from "../../styles/pages/loginStyles/loginStyle.js";
import eyeOpen from '../../assets/icons/eye-open.svg'
import eyeClosed from '../../assets/icons/eye-close.svg'



function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const passwordInputRef = useRef(null)
    const setUser = useStore((state) => state.setUser)
    const setIsLoggedIn = useStore((state) => state.setIsLoggedIn)


    // Автозаповнення, але без автоматичного логіну
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'))
        if (savedUser?.username) {
            setUsername(savedUser.username)
            setPassword(savedUser.password);
        }
    }, [])

    const handleLogin = () => {
        const user = { username, password }
        setUser(user)
        setIsLoggedIn(true)
        localStorage.setItem('user', JSON.stringify(user));
    }


    const handleTogglePassword = () => {
        setShowPassword(prev => !prev)

        setTimeout(() => {
            passwordInputRef.current?.focus()
        }, 0)
    }

    const isValid = username.trim() && password.trim()

    return (
        <div className={loginWrapper}>
            <div className={loginLogo}>
                <img className={loginLogoImg} src={`${trackLogoBlue}`} alt="trackLogo" />
                <span className={loginLogoText}>DeltiStore</span>
            </div>

            <h1 className={loginTitle}>Login to DeltiStore</h1>

            <label className={loginLabel} htmlFor="username">Username</label>
            <input
                className={loginInput}
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label className={loginLabel} htmlFor="password">Password</label>
            <div className={loginInputPasswordContainer}>
                <input
                    className={loginInput}
                    ref={passwordInputRef}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className={eyesToggleContainer}>
                    <button
                        className={eyeToggleButton}
                        type="button"
                        onClick={handleTogglePassword}
                    >
                        <img
                            className={eyeToggleButtonImg}
                            src={`${showPassword ? eyeOpen : eyeClosed}`}
                            alt="Toggle visibility"
                        />
                    </button>
                </div>
            </div>

            <button
                className={isValid ? loginButton : loginButtonDisabled}
                onClick={handleLogin}
                disabled={!isValid}
            >
                Login
            </button>

            <p className={loginExtraText}>
                Auto-fill enabled if session data is available
            </p>

            <div className={loginInfo}>
                <img className={loginInfoImg} src={`${infoBlue}`} alt="info" />
                <span>For MVP, login fields auto-fill if session data is found.</span>
            </div>
        </div>
    )
}

export default Login