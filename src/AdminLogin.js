import React, {useState} from 'react';
import './AdminLogin.css';

export default function AdminLogin(props) {
    const [errorMessage, updateErrorMessage] = useState(<p className="empty" />)

    const handleSubmit = e => {
        e.preventDefault()
        updateErrorMessage(<p className="empty" />)
        const {username, password} = e.target
        if (username.value !== "test" || password.value !== "test") {
            updateErrorMessage(<p className="error">Incorrect username or password</p>)
        }
        else {props.history.push("/admin/dashboard")}
    }
    return (
        <form className="login" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="username" className="loginCred">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username here"
            />
            <br />
            <label htmlFor="password" className="loginCred">Password</label>
            <input
                type="text"
                id="password"
                name="password"
                placeholder="Enter password here"
            />
            {errorMessage}
            <button className="loginButton" type="submit">
                Log In
            </button>
        </form>
    )
}