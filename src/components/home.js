import React from "react";
import { Link } from 'react-router-dom';

function Home() {
    return(
        <div>
            <h1>{"Welcome to new Project"}</h1>
            <Link to={'/login'}><h1>Login</h1>
            </Link>
        </div>
    )
}

export default Home;