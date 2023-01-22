import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./components/Login/LoginPage";
import ResetPassword from "./components/resetPass/ResetPass";
import HomePage from "./components/homePage/home-page/"
import SettingsPage from "./components/settingsPage/SettingsPage";
import About from "./components/about/About";
import ProfilePage from "./components/profilePage/ProfilePage";
import RegisterPage from "./components/registerPage/RegisterPage";
import StartPage from "./components/startPage/StartPage";
import SecretPhrase from "./components/secretPhrase/SecretPhrase";
import UsersPage from "./components/usersPage/UsersPage";
import ProductsPage from "./components/products/ProductsPage";
import ChangePassword from "./components/changePassword/ChangePassword";
import { Route, Routes} from 'react-router-dom';

function App() {

  const [search, setSearch] = useState('');
  const [currentUser, setCurrentUser] = useState("");
  const [currentpassword, setCurrentpassword] = useState('')
  const [loggedOn, setLoggedOn] = useState(false);
  const [accessToken, setAccessToken] = useState("");


  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    setCurrentUser('')
    setLoggedOn(false)
    setAccessToken('')

  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const user = localStorage.getItem('user')

    console.log(token, role)
    if(!token){
      console.log("Not loggedon")
    }else{
      setLoggedOn(true);
      setAccessToken(token);
      setCurrentUser(user);

    }

  }, [currentUser])

  return (
    <div className="App">
      <Navbar currentUser={currentUser} logout={logout} setSearch={setSearch} loggedOn={loggedOn}>

      </Navbar>

      <Routes>

      <Route path="/settings" element ={accessToken &&  <SettingsPage />}>
          <Route path="profile" element = {<ProfilePage currentUser={currentUser} currentpassword={currentpassword} />  } ></Route>
          <Route path="users" element = {<UsersPage token={accessToken} /> } ></Route>
          <Route path="register" element = {<RegisterPage token={accessToken} /> } ></Route>
      </Route>

      <Route path="/about" element={ <About />} ></Route>

      <Route path="/home" element={ accessToken && 
      <HomePage search={search} setCurrentUser={setCurrentUser} currentUser={currentUser}
      setLoggedOn={setLoggedOn} accessToken={accessToken}></HomePage>}></Route>

      <Route path="/login" element={(!loggedOn&& !accessToken) &&
      <LoginPage setCurrentUser={setCurrentUser} currentUser={currentUser}
      setLoggedOn={setLoggedOn}></LoginPage>}></Route>

      
      <Route path="/reset" element={ <ResetPassword setCurrentUser={setCurrentUser} currentUser={currentUser}
      setLoggedOn={setLoggedOn}></ResetPassword>}></Route>

      <Route path="/secretphrase" element={ <SecretPhrase setCurrentUser={setCurrentUser} currentUser={currentUser}
      setLoggedOn={setLoggedOn}></SecretPhrase>}></Route>

      <Route path="/change-password" element={ <ChangePassword token={accessToken}>
      </ChangePassword>}></Route>

      <Route path="/products" element={accessToken && <ProductsPage token={accessToken} search={search} setCurrentUser={setCurrentUser} currentUser={currentUser}
      setLoggedOn={setLoggedOn}></ProductsPage>}></Route>

      <Route path="/" element = { !accessToken && <StartPage /> }>
      </Route>

      </Routes>
    </div>
  );
}

export default App;
