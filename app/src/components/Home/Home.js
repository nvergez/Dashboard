import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getUser } from '../../api/users/users';

function Home(props) {
    useEffect(() => {
        var res = getUser(localStorage.getItem("ID_TOKEN"));
        res.then((value) => {
            if (!value.id) {
                redirectToLogin()
            }
        })
      })
    function redirectToLogin() {
    props.history.push('/login');
    }
    return(
        <div className="mt-2">
            Home page content
        </div>
    )
}

export default withRouter(Home);