import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router'
import SignUp from './components/SignUp';
import Login from './components/Login'
import Verify from './components/Verify'
import Home from './components/Home'
import HomePage from './components/HomePage'
import Profile from './components/Profile'
import Footer from './components/Footer'

function App() {

return (
  <div className="App">
    




<Routes>
        <Route path="/" element={<HomePage></HomePage>}>
          <Route index element={<SignUp></SignUp>} />
          <Route path="/verify" element={<Verify></Verify>} />
          <Route path="/signup" element={<SignUp></SignUp>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/profile" element={<Profile></Profile>} />
          {/* <Route path="/myaccount" element={<Myaccount></Myaccount>} /> */}
          <Route path="*" element={<div>no page</div>} />
        </Route>
</Routes>

  </div>
);
}

export default App;
