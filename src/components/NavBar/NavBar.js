import React from "react";

export default function NavBar({ route, onRouteChange, setBoxes, setDetectUrl, setUser }) {
    return(
        <nav className="dt w-100 border-box pa3 ph5-ns">
            <button className="link pointer dim dark-gray f6 f5-ns dib mr3 mr4-ns" >
                SmartBrain
            </button>
            <div className="dtc v-mid w-75 tr">
                <p onClick={() => {
                        if (route === 'home') {
                            onRouteChange('sign-in');
                            setBoxes([]);
                            setDetectUrl('');
                            setUser({
                                name: '',
                                email: '',
                                entries: 0,
                                joined: ''
                            });
                        } else {
                            onRouteChange('sign-in')
                        }
                    }
                } 
                className="link pointer dim dark-gray f6 f5-ns dib mr3 mr4-ns" >
                    {route === 'home' ? 'Sign Out' : 'Sign In'}
                </p>
                {(route === 'sign-in' || route === 'registration') && <p onClick={() => {
                    onRouteChange('registration')
                    }
                } className="link pointer dim dark-gray f6 f5-ns dib mr3 mr4-ns" >Register</p>}
            </div>
        </nav>
    )
};