import React from 'react';
import { withRouter } from "react-router-dom";

import './Header.css'

function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    if(props.location.pathname === '/') {
        title = 'Dashboard'
    }
    function renderLogout() {
        if(props.location.pathname === '/home'){
            return(
                <div className="ml-auto">
                    <button className="buttonL"
                    onClick={() => handleLogout()}
                    style={{width: "100px", height :42, color: "#ffffff"}}>
                        Logout
                    </button>
                </div>
            )
        }
    }
    function renderMenu() {
        if(props.location.pathname === '/home'){
            return(
                <div className="mr-auto">
                    <button className="buttonL"
                    onClick={() => openMenu()}
                    style={{width: "100px", height :42, color: "#ffffff"}}>
                        Menu
                    </button>
                </div>
            )
        }
    }
    function openMenu() {
        return(
            <div>
                <p>salut mon pote</p>
            </div>
        )
    }
    function handleLogout() {
        localStorage.removeItem("ID_TOKEN")
        props.history.push('/login')
    }
    return(
        <nav className="color-nav">
            <div className="row col-12 d-flex justify-content-center text-white">
                {renderMenu()}
                <span className="h3" style={{color: "#42B72A"}}>Dashboard</span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header);