import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import styles from './App.module.css';
import ProtectedRoute from './utils/ProtectedRoute';
import Otp from './pages/Otp/Otp';
import Profile from "./pages/Profile/Profile";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrectPassword, setisCorrectPassword] = useState(false);
  const [isUncorrectPassword, setisUncorrectPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (otp.length === 6) {
      submitForm(otp)
    }
  }, [otp])

  const onChange = (value) => {
    setOtp(value);
  };

  const checkCorrectPassword = () => {
    navigate('/profile', { replace: true })
    setLoggedIn(true);
  }

  const submitForm = (e) => {
    setIsLoading(true);
    console.log("Отправка формы")
    if (otp === '123456') {
      setIsLoading(false);
      setisCorrectPassword(true);
      setisUncorrectPassword(false)
      setTimeout(checkCorrectPassword, 5000)
    } else if (otp.length !== 6) {
      setIsLoading(true)
    } else {
      setIsLoading(false);
      setLoggedIn(false);
      setisUncorrectPassword(true);
      setisCorrectPassword(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Routes>
          <Route
            path="/"
            element={<Otp
              submitForm={submitForm}
              isLoading={isLoading}
              isCorrectPassword={isCorrectPassword}
              isUncorrectPassword={isUncorrectPassword}
              value={otp}
              onChange={onChange}
              valueLength={6}
            />
            }
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={Profile}
              loggedIn={loggedIn}
            />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
