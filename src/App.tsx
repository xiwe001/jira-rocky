import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginPage,ProjectListPage } from './pages'
import { useAuth } from "./context/auth-context";

function App() {
  const { user } = useAuth();
  //  console.log(user);
  
  return (
    <div className="App">
      {
        user===null ? <LoginPage /> : <ProjectListPage />
      }
    </div>

  );
}

export default App;
