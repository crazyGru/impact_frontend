import { ChangeEvent, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

import Input from 'components/form/Input'
import Button from 'components/form/Button'
import Checkbox from 'components/form/Checkbox'

import { HttpService } from 'utils/axios'
import { setupToken } from 'utils/token'

import { AuthContext } from 'providers/AuthProvider'
import { signInWithPopup } from 'firebase/auth'
import {
  auth,
  facebookProvider,
  googleProvider,
  microsoftProvider
} from 'utils/firebaseConfig'

interface IAccount {
  email: string
  password: string
  isRemember: boolean
}

const initialAccount: IAccount = {
  email: '',
  password: '',
  isRemember: false
}

export default function Signin() {
  const navigate = useNavigate()
  const { setIsLogin } = useContext(AuthContext)
  const [account, setAccount] = useState<IAccount>(initialAccount)

  const onAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value
    })
  }

  const onRememberToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      isRemember: e.target.checked
    })
  }

  const onSubmitClick = () => {
    HttpService.post('/signin', account).then((response) => {
      const { status, data } = response
      if (status === 200) {
        setIsLogin(true)
        setupToken(data)
        enqueueSnackbar('Signin successfully!', { variant: 'success' })
        navigate('/main')
      }
    })
  }

  const handleSocialSignIn = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const userData = {
        email: user.email,
        password: user.uid
      }

      const response = await HttpService.post('/signin', userData)
      const { status } = response
      if (status === 200) {
        setIsLogin(true)
        enqueueSnackbar(`${provider.providerId} Sign-In successful!`, {
          variant: 'success'
        })
        navigate('/main')
      } else {
        // If not signed up, prompt to sign up
        enqueueSnackbar('Account not found. Please sign up.', {
          variant: 'warning'
        })
        // Optionally, redirect to signup page
        navigate('/auth/register')
      }
    } catch (error) {
      console.error(`Error during ${provider.providerId} Sign-In:`, error)
      enqueueSnackbar(`Error during ${provider.providerId} Sign-In`, {
        variant: 'error'
      })
    }
  }

  const onGoogleSignIn = () => handleSocialSignIn(googleProvider)
  const onMicrosoftSignIn = () => handleSocialSignIn(microsoftProvider)
  const onFacebookSignIn = () => handleSocialSignIn(facebookProvider)

  return (
    <div className="flex max-w-[500px] flex-col gap-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-semibold text-slate-600">
          Log in to your account
        </h1>
        <h3 className="text-base text-slate-400">
          Welcome back! Enter your credentials to access your account
        </h3>
      </div>
      <div className="flex w-full flex-col gap-y-4">
        <Input
          name="email"
          label="Email"
          placeholder="example@example.com"
          value={account.email}
          updateValue={onAccountChange}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="********"
          value={account.password}
          updateValue={onAccountChange}
        />
      </div>
      <div className="flex justify-between">
        <Checkbox
          name="isRemember"
          label="Remember me"
          checked={account.isRemember}
          updateChecked={onRememberToggle}
        />
        <Link
          to="/auth/forgot-password"
          className="text-[14px] text-indigo-500 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <div className="space-y-4">
        <Button className="w-full" onClick={onSubmitClick}>
          Sign in
        </Button>
        <Button color="white" className="w-full" onClick={onGoogleSignIn}>
          <i className="fab fa-google mr-2"></i>
          Continue with Google
        </Button>
        <Button color="white" className="w-full" onClick={onMicrosoftSignIn}>
          <i className="fab fa-microsoft mr-2"></i>
          Continue with Azure
        </Button>
        <Button color="white" className="w-full" onClick={onFacebookSignIn}>
          <i className="fab fa-facebook mr-2"></i>
          Continue with Facebook
        </Button>
      </div>
      <div className="text-center">
        <p>
          Don&apos;t have an account?
          <Link
            to="/auth/register"
            className="ml-1 text-indigo-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
