import './LoginPopup.css'

import { useState, useContext } from 'react'

import { assets } from '../../assets/assets'

import { StoreContext } from '../../Context/StoreContext'

import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)

  const [currState, setCurrState] = useState('Login')

  const [loginSuccess, setLoginSuccess] = useState(false)

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })


  const onChangeHandler = (event) => {

    const name = event.target.name
    const value = event.target.value

    setData(data => ({
      ...data,
      [name]: value
    }))

  }


  const onLogin = async (event) => {

    event.preventDefault()

    let newUrl = url

    if (currState === 'Login') {
      newUrl += '/api/user/login'
    }
    else {
      newUrl += '/api/user/register'
    }


    try {

      const response = await axios.post(newUrl, data)

      if (response.data.success) {

        // Save token first
        setToken(response.data.token)

        localStorage.setItem('token', response.data.token)


        // Show success animation
        setLoginSuccess(true)


        // Close popup after animation
        setTimeout(() => {
          setShowLogin(false)
        }, 1500)

      }
      else {

        alert(response.data.message)

      }

    }
    catch (error) {

      console.log(error)

      alert("Something went wrong")

    }

  }


  return (

    <div className='login-popup'>

      {loginSuccess ? (

        /* SUCCESS SCREEN */

        <div className="login-success">

          <div className="success-checkmark">
            ✓
          </div>

          <h2>
            {currState === 'Login'
              ? 'Login Successful!'
              : 'Account Created!'
            }
          </h2>

          <p>
            Welcome to ZaykaWala 🎉
          </p>

        </div>

      ) : (

        /* LOGIN FORM */

        <form onSubmit={onLogin} className="login-popup-container">

          <div className="login-popup-title">

            <h2>{currState}</h2>

            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />

          </div>


          <div className="login-popup-inputs">

            {currState === 'Login'
              ? <></>
              : (
                <input
                  name='name'
                  onChange={onChangeHandler}
                  value={data.name}
                  type='text'
                  placeholder='Your Name'
                  required
                />
              )
            }


            <input
              name='email'
              onChange={onChangeHandler}
              value={data.email}
              type='email'
              placeholder='Your Email'
              required
            />


            <input
              name='password'
              onChange={onChangeHandler}
              value={data.password}
              type='password'
              placeholder='Password'
              required
            />

          </div>


          <button type='submit'>
            {currState === 'Sign Up'
              ? 'Create Account'
              : 'Login'
            }
          </button>


         {currState === 'Sign Up' && (
    <div className="login-popup-condition">

        <input type='checkbox' required />

        <p>
            By continuing, I agree to the terms of use & privacy policy.
        </p>

    </div>
)}



          {currState === 'Login' ? (

            <p>
              Create a new account?
              <span onClick={() => setCurrState('Sign Up')}>
                Click here
              </span>
            </p>

          ) : (

            <p>
              Already have an account?
              <span onClick={() => setCurrState('Login')}>
                Login here
              </span>
            </p>

          )}

        </form>

      )}

    </div>

  )

}

export default LoginPopup