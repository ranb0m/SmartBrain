import './App.css';
import { useState } from 'react';

function App() {
  return (
    <>
    <Authentication />
    </>
  );
}

function Authentication() {
const [swap, setSwap] = useState(true)
  
  return (
    <div style={{position: "relative",
                 border: "2px solid gray",
                 borderRadius: "25px",
                 borderWidth: "200px",
                 padding: "200px",
                 alignItems: "center",
                 justifyContent: "center",
                 display: "flex",
                 flexDirection: "column"}}>
      <button style={{position: "absolute",
                      top: "10px",
                      right: "10px"}}
                      onClick={(e) => setSwap(!swap)}>{swap ? "Register" : "Sign In"}</button>
      <h2>{swap ? "Sign In" : "Register"}</h2>
      <div style={{marginBottom: "10px"}}>
        <label htmlFor="username">Username: </label> 
        <input id='username'type='text' />
      </div>
      <div style={{marginBottom: "10px"}}>
        <label htmlFor="password">Password: </label> 
        <input id='password'type='text' />
      </div>
      <button style={{color: "inherit", border: "none"}} onClick={(e) => setSwap(!swap)}>
        {swap ? "Register" : "Sign In"}
      </button>
    </div>
  )
}

export default App;
