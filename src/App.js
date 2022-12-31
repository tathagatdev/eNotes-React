import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert=(message,type)=>{
        setAlert({
          msg:message,
          type:type
        })
        setTimeout(()=>{
          setAlert(null);
        },1500)
  }
  return (
    <div>
      <NoteState>
  <Router>
      <Navbar/>
      <Alert  alert={alert} > </Alert>
        <Routes>
          <Route path='/' element = {
            <div className="container">
              <Navbar></Navbar>
              <Home showAlert={showAlert}/>
            </div>}>
          </Route>

          <Route path='/about' element={
            <div className="container">
              <About/> 
            </div>}>
          </Route>
          <Route path='/login' element = {
            <div className="container">
              <Login  showAlert={showAlert}/>
            </div>}>
          </Route>
          <Route path='/createuser' element = {
            <div className="container">
              <SignUp  showAlert={showAlert}/>
            </div>}>
          </Route>
        </Routes>
    </Router>
    </NoteState>
    </div>
  );
}

export default App;
