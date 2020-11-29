import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import PrivateRoute from './utils/PrivateRoute';
import ImgurCallback from './components/CallbackOauth/ImgurCallback';
import TwitchCallback from './components/CallbackOauth/TwitchCallback';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent';
function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
    <div className="App">
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/oauth_imgur">
              <ImgurCallback url={window.location.href} showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/oauth_twitch">
              <TwitchCallback url={window.location.href} showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <PrivateRoute path="/home">
              <Home/>
            </PrivateRoute>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </Router>
  );
}

export default App;
/* https://id.twitch.tv/oauth2/authorize?client_id=rkyu7ywqgxxchwqhzk37jgvv1jdx1r&response_type=token&redirect_uri=http://localhost/oauth_twitch */