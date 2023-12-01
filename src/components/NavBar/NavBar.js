import React from "react";

export default function NavBar({ onRouteChange, route }) {
    return(
        <nav className="dt w-100 border-box pa3 ph5-ns">
            <a className="dtc v-mid mid-gray link dim w-25" href="#" title="Home">
                <img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="SmartBrain" />
            </a>
        <div className="dtc v-mid w-75 tr">
            <p onClick={() => {
                if (route === 'home')
                onRouteChange('sign-in')
                else onRouteChange('sign-in')
                }
            } 
            className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" >
                {route === 'home' ? 'Sign Out' : 'Sign In'}
            </p>
            {(route === 'sign-in' || route === 'registration') && <p onClick={() => {
                onRouteChange('registration')
                }
            } className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" >Register</p>}
        </div>
</nav>

    )
};