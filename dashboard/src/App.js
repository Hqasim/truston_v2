import { useState } from "react";
import Header from "./components/header/Header";
import Dashboard from "./pages/dashboard/dashboard";
import { ToastContainer } from 'react-toastify';

import './App.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [darkTheme, setDarkTheme] = useState(false)

  return (
    <div className={darkTheme ? 'full-dark-bg' : ''}>
      <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <Dashboard darkTheme={darkTheme} />
      <ToastContainer position='bottom-right' hideProgressBar='true' theme={darkTheme ? 'dark' : 'light'}  />
    </div>
  );
}

export default App;
