import React from "react";

export default function Authentication({ onRouteChange, route }) {
  return (
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">{route === 'sign-in' ? 'Sign In' : 'Register'}</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                   type="submit"
                   value={route ==='sign-in' ? "Sign in" : "Register"}
                   onClick={() => {
                    if (route ==='sign-in')
                    onRouteChange('home')
                    else if (route === 'registration')
                    onRouteChange('sign-in');
                   }} />
          </div>
          <div className="lh-copy mt3">
            {route === 'sign-in' && <a onClick={() => {
              onRouteChange('registration');
              }
            } className="f6 link dim black db pointer">Register
            </a>
            }
          </div>
        </div>
    </main>
  </article>


  )};