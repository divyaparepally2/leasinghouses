import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './loginStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                <p className={styles.loginFont}>First Name</p>
                <input autoFocus type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                <p className={styles.loginFont}>Last Name</p>
                <input autoFocus type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <p className={styles.loginFont}>Email</p>
                <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={(e) => isValidEmail(e.target.value)} required/>
                    {!validEmail && <p className={`${styles.inlineError} ${styles.mt1}`}>Enter valid Email</p>}
                <p className={styles.loginFont}>Password</p>
                <div className={styles.displayInline}>
                    <input type= {showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={(e) => displayPassword()}/>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                </div>
                <p className={styles.loginFont}>Re-enter Password</p>
                <div className={styles.displayInline}>
                    <input type= {showPassword ? "text" : "password"} value={rePassword} onChange={(e) => setRePassword(e.target.value)} required/>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={(e) => displayPassword()}/>   
                </div>
                {password !== '' && rePassword !== '' && password !== rePassword && <p className={`${styles.inlineError} ${styles.mt1}`}>Passwords should match</p>}
            </form>
            <br></br>
            <button>Create Account</button>
            <p>
                {"Already have an account "}
                <Link to={'/login'}>Login
                </Link>
            </p>
        </div>
    )
}

export default Signup;