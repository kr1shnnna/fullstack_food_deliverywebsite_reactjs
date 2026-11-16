import { useState, useContext } from 'react'

import { assets } from '../../assets/assets'

import { StoreContext } from '../../Context/StoreContextDefinition'

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

    <div className='fixed inset-0 z-[2000] grid h-screen w-full bg-black/50 animate-[overlayFadeIn_0.3s_ease_forwards]'>

      {loginSuccess ? (

        /* SUCCESS SCREEN */

        <div className="place-self-center flex w-[calc(100%-2rem)] max-w-[420px] flex-col items-center rounded-xl bg-white px-6 py-10 text-center animate-[successPopup_0.4s_ease_forwards] sm:px-[30px] sm:py-[45px]">

          <div className="mb-[15px] flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#4caf50] text-[40px] font-bold text-white animate-[checkPop_0.5s_ease_forwards]">
            ✓
          </div>

          <h2 className="mb-2 text-[#333]">
            {currState === 'Login'
              ? 'Login Successful!'
              : 'Account Created!'
            }
          </h2>

          <p className="text-[#808080]">
            Welcome to ZaykaWala 🎉
          </p>

        </div>

      ) : (

        /* LOGIN FORM */

        <form onSubmit={onLogin} className="place-self-center flex w-[calc(100%-2rem)] max-w-[420px] flex-col gap-6 rounded-lg bg-white px-6 py-6 text-sm text-[#808080] animate-[popupIn_0.35s_ease_forwards] sm:gap-[25px] sm:px-[30px] sm:py-[25px]">

          <div className="flex items-center justify-between text-black">

            <h2>{currState}</h2>

            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              className="w-4 cursor-pointer"
              alt="Close"
            />

          </div>


          <div className="flex flex-col gap-5">

            {currState === 'Login'
              ? <></>
              : (
                <input
                  name='name'
                  onChange={onChangeHandler}
                  value={data.name}
                  type='text'
                  placeholder='Your Name'
                  className="rounded border border-[#c9c9c9] p-2.5 text-sm outline-none"
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
              className="rounded border border-[#c9c9c9] p-2.5 text-sm outline-none"
              required
            />


            <input
              name='password'
              onChange={onChangeHandler}
              value={data.password}
              type='password'
              placeholder='Password'
              className="rounded border border-[#c9c9c9] p-2.5 text-sm outline-none"
              required
            />

          </div>


          <button className="cursor-pointer rounded border-none bg-[tomato] p-2.5 text-[15px] text-white" type='submit'>
            {currState === 'Sign Up'
              ? 'Create Account'
              : 'Login'
            }
          </button>


         {currState === 'Sign Up' && (
    <div className="mt-[-15px] flex items-start gap-2">

        <input className="mt-1" type='checkbox' required />

        <p>
            By continuing, I agree to the terms of use & privacy policy.
        </p>

    </div>
)}



          {currState === 'Login' ? (

            <p className="mt-2 leading-6">
              Create a new account?
              <span className="ml-1 cursor-pointer font-medium text-[tomato]" onClick={() => setCurrState('Sign Up')}>
                Click here
              </span>
            </p>

          ) : (

            <p className="mt-2 leading-6">
              Already have an account?
              <span className="ml-1 cursor-pointer font-medium text-[tomato]" onClick={() => setCurrState('Login')}>
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