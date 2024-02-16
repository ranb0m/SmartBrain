import userEvent from "@testing-library/user-event";
import React, {useState} from "react";

export default function Authentication({ onRouteChange, route, loadUser }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formReset = () => {
    setEmail('');
    setPassword('');
  }

  const onNameChange = (e) => {
    setName(e.target.value);
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onRegister = () => {
    fetch('https://smartbrain-api-d3840a985cb2.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name, 
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user) {
        loadUser(user);
        onRouteChange('sign-in');
      }
      else console.log('error', user)
    })
    .catch(console.log)
    formReset();
  }
  
   const onSignin = () => {
      fetch('https://smartbrain-api-d3840a985cb2.herokuapp.com/signin', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log("data: ", data)
        if (data !== 'error logging in') {
          loadUser(data);
          onRouteChange('home');
        }
        else console.log('error', data)
      })
      .catch(console.error)
   }

  return (
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">{route === 'sign-in' ? 'Sign In' : 'Register'}</legend>
            {route === 'registration' && 
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text" 
                name="user"  
                id="user"
                value={name}
                onChange={onNameChange} />
            </div>}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address"  
                id="email-address"
                value={email}
                onChange={onEmailChange} />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password"
                value={password}
                onChange={onPasswordChange} />
            </div>
          </fieldset>
          <div className="">
            <input 
                   className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                   type="submit"
                   value={route ==='sign-in' ? "Sign in" : "Register"}
                   onClick={() => {
                    if (route ==='sign-in') {
                      onSignin()
                    }
                    else if (route === 'registration') {
                      onRegister()
                    }
                   }} />
          </div>
          <div className="lh-copy mt3">
            {route === 'sign-in' && <a onClick={() => {
              onRouteChange('registration');
              formReset();
              }
            } className="f6 link dim black db pointer">Register
            </a>
            }
          </div>
        </div>
    </main>
  </article>


  )};