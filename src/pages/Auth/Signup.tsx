import { ChangeEvent, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

import Input from 'components/form/Input'
import Button from 'components/form/Button'

import { signInWithPopup } from 'firebase/auth'
import {
  auth,
  facebookProvider,
  googleProvider,
  microsoftProvider
} from 'utils/firebaseConfig'
import { HttpService } from 'utils/axios'

interface IAccount {
  email: string
  password: string
  confirm: string
}

type SubmitProps = Omit<IAccount, 'confirm'>

const initialAccount: IAccount = {
  email: '',
  password: '',
  confirm: ''
}

export default function Signup() {
  const navigate = useNavigate()
  const [account, setAccount] = useState<IAccount>(initialAccount)

  const onAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitClick = () => {
    const reqJson: SubmitProps = {
      email: account.email,
      password: account.password
    }
    HttpService.post('/signup', reqJson).then((response) => {
      const { status } = response
      if (status === 200) {
        enqueueSnackbar('Signup successfully!', { variant: 'success' })
        navigate('/auth/login')
      }
    })
  }

  const handleSocialSignIn = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log(user)

      const userData = {
        email: user.email,
        password: user.uid
      }

      const response = await HttpService.post('/signup', userData)
      const { status } = response
      if (status === 200) {
        enqueueSnackbar(`Sign-Up successful!`, { variant: 'success' })
        navigate('/auth/login')
      } else {
        // If account already exists, prompt to sign in
        enqueueSnackbar('Account already exists. Please sign in.', {
          variant: 'warning'
        })
        navigate('/auth/login')
      }
    } catch (error) {
      console.error(`Error during ${provider.providerId} Sign-Up:`, error)
      enqueueSnackbar(`Error during ${provider.providerId} Sign-Up`, {
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
          Create account
        </h1>

        <h3 className="text-base text-slate-400">
          Sign up for an account to get started
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

        <Input
          name="confirm"
          type="password"
          label="Confirm your password"
          placeholder="********"
          value={account.confirm}
          updateValue={onAccountChange}
        />
      </div>

      <div className="space-y-4">
        <Button className="w-full" onClick={onSubmitClick}>
          Continue with email
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
        <p className="mb-2 text-[14px] text-gray-600">
          By signing up you agree to the{' '}
          <a href="" className="text-indigo-500 hover:underline">
            Terms of Service
          </a>{' '}
          &{' '}
          <a href="" className="text-indigo-500 hover:underline">
            Privacy Policy
          </a>
        </p>

        <p className="text-[15px]">
          Already have an account?
          <Link
            to="/auth/login"
            className="ml-1 text-indigo-500 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
