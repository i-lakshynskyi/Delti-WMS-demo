import {useEffect, useState} from 'react'
import useStore from '../../store/useStore.js'
import trackLogoBlue from "../../assets/track-logo-blue.png";
import infoBlue from "../../assets/info-blue.png";
import eyeOpen from '../../assets/icons/eye-open.svg'
import eyeClosed from '../../assets/icons/eye-close.svg'
import PrimeButton from "../../components/PrimeButton.jsx";
import PrimeInput from "../../components/PrimeInput.jsx";
import {
    eyesToggleContainer,
    eyeToggleButton,
    eyeToggleButtonImg
} from "../../styles/components/reusableСomponentsStyle.js";
import {
    loginInfo,
    loginInfoImg,
    loginLogo,
    loginLogoImg,
    loginLogoText,
    loginExtraText,
    loginTitle,
    loginWrapper,
    loginButton
} from "../../styles/pages/loginStyle.js";



function Login() {
    //Local state
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    // Store
    const setUser = useStore((state) => state.setUser)
    const setIsLoggedIn = useStore((state) => state.setIsLoggedIn)
    const setCurrentPage = useStore((state) => state.setCurrentPage)


    // Autocomplete login+password
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
        setCurrentPage('jobs')

        localStorage.setItem('user', JSON.stringify(user));
    }

    const handleTogglePassword = () => {
        setShowPassword(prev => !prev)
    }

    const isValid = !(username.trim() && password.trim())

    return (
        <div className={loginWrapper}>
            <div className={loginLogo}>
                <img className={loginLogoImg} src={`${trackLogoBlue}`} alt="trackLogo" />
                <span className={loginLogoText}>DeltiStore</span>
            </div>

            <h1 className={loginTitle}>Login to DeltiStore</h1>

            <PrimeInput value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholderText={"Enter your username"}
                        labelText={"Username"}
                        idInput={'username'}
                        className={'mb-[10px]'}
            />

            <PrimeInput value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholderText={"Enter your password"}
                        type={showPassword ? 'text' : 'password'}
                        labelText={"Password"}
                        idInput={'password'}
                        className={'pr-[45px] mb-[10px]'}
            >
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
            </PrimeInput>
            <PrimeButton className={loginButton} onClick={handleLogin} disabled={isValid}>
                Login
            </PrimeButton>

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