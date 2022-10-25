import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FirstPage from "./FirstPage";
import LoginPage from "./LoginPage";
import CreateAccount from "./CreateAccount";
import { BrowserRouter as Router, Routes, Route, Navigate ,Link} from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);


export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<FirstPage/>}>
          <Route index element={<Navigate to="login" />}/>
          <Route path="login" element={<LoginPage/>} />
          <Route path="sign_up" element={<CreateAccount/>} />
          <Route path="after_login" element={<div>Login Successfull</div>} />
          <Route path="account_Create_succuss" element={<div className="HaveAccount">Account Created Successfully <Link to="/login" >Login here</Link></div>} />
          <Route path="account_Create_error" element={<div className="HaveAccount">Error Please Retry <Link to="/sign_up" >Create Account</Link></div>} />

          
        </Route>
       
      </Routes>
    </Router>
  );
}

