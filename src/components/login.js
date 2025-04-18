import { useState } from "react";
import styles from './loginStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import React from "react";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/profile');
    };
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(true);
        if(!emailRegex.test(email)) {
            setValidEmail(false);
        }
    }
    function displayPassword() {
        showPassword ? setShowPassword(false): setShowPassword(true);
    }
    
    return(
        <div>
            <form>
                <p className={styles.loginFont}>Email</p>
                    <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={(e) => isValidEmail(e.target.value)} required/>
                    {!validEmail && <p className={`${styles.inlineError} ${styles.mt1}`}>Enter valid Email</p>}
                <p className={styles.loginFont}>Password</p>
                <div className={styles.displayInline}>
                    <input type= {showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={(e) => displayPassword()}/>
                </div>
                <p className={`${styles.inlineError} ${styles.mt1}`}>Incorrect Password</p>
                <button onClick={navigateToProfile}>Log in</button>
            </form>
            <p>
                {"Don't have an account? "}
                <Link to={'/signup'}>Signup</Link>
            </p>
        </div>
    )
}

export default Login;