import React from 'react';
import { withRouter } from "react-router-dom";

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
                    <button className="btn btn-danger"
                    onClick={() => handleLogout()}
                    style={{height:'50px', width:'100px'}}>
                        Logout
                    </button>
                </div>
            )
        }
    }
    function handleLogout() {
        localStorage.removeItem("ID_TOKEN")
        props.history.push('/login')
    }
    return(
        <nav className="color-nav">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">Dashboard</span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header);