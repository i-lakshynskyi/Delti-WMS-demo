import {usePageTranslation} from "../../i18n/hooks/hooks.js";
import {useEffect, useState} from 'react'
import useStore from '../../store/useStore.js'
import Logo from "../../assets/icons/Logo.svg";
import info from "../../assets/icons/information.svg";
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
    loginWrapper,
    loginButton, loginLanguageContainer
} from "../../styles/pages/loginStyle.js";
import LanguageSelector from "../../components/LanguageSelector.jsx";



function Login() {
    // Translations
    const { t: loginT } = usePageTranslation();
    //Local state
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    // Store
    const setUser = useStore((state) => state.setUser)
    const setIsLoggedIn = useStore((state) => state.setIsLoggedIn)
    const setCurrentPage = useStore((state) => state.setCurrentPage)
    const setIsShowSpinner = useStore((state) => state.setIsShowSpinner)


    // Autocomplete login+password
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'))
        if (savedUser?.username) {
            setUsername(savedUser.username)
            setPassword(savedUser.password);
        }
    }, [])

    const handleLogin = () => {
        setIsShowSpinner(true);

        setTimeout(() => {
            const user = { username, password };
            setUser(user);
            setIsLoggedIn(true);
            setCurrentPage('jobs');
            localStorage.setItem('user', JSON.stringify(user));

            setIsShowSpinner(false);
        }, 1000);
    };


    const handleTogglePassword = () => {
        setShowPassword(prev => !prev)
    }

    const isValid = !(username.trim() && password.trim())

    return (
        <div className={loginWrapper}>
            <div className={loginLanguageContainer}>
                <LanguageSelector/>
            </div>
            <div className={loginLogo}>
                <img className={loginLogoImg} src={`${Logo}`} alt="trackLogo" />
                <span className={loginLogoText}>{loginT('logo')}</span>
            </div>

            <PrimeInput value={username}
                        onChange={e => setUsername(e)}
                        placeholderText={loginT('form.username.placeholderText')}
                        labelText={loginT('form.username.labelText')}
                        idInput={'username'}
                        className={'mb-[10px]'}
            />

            <PrimeInput value={password}
                        onChange={e => setPassword(e)}
                        placeholderText={loginT('form.password.placeholderText')}
                        type={showPassword ? 'text' : 'password'}
                        labelText={loginT('form.password.labelText')}
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
                {loginT('buttons.login')}
            </PrimeButton>

            <p className={loginExtraText}>
                {loginT('info.loginExtraText')}
            </p>

            <div className={loginInfo}>
                <img className={loginInfoImg} src={`${info}`} alt="info" />
                <span>{loginT('info.loginInfo')}</span>
            </div>
        </div>
    )
}

export default Login