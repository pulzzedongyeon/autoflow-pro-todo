import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../../../context/NotificationContext'
import { useAuth } from '../../../context/UserContext'

import { loginUser } from '../../../functions/User/loginUser'

import * as s from './style'
import Button from '../../../styles/Button'
import InputStyle from '../../../styles/Input'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useMutation, useQuery } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerValidation } from '../validations'

interface ISignInProps {
  setLogin: React.Dispatch<
    React.SetStateAction<'sign-in' | 'sign-up' | 'forgot-password'>
  >
}

const SignIn: React.FC<ISignInProps> = ({ setLogin }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(registerValidation),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const signInRef = useRef<HTMLDivElement | null>(null)

  const { createNotification } = useNotification()
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const { mutate: mutateLogin, isLoading: loginLoading } = useMutation(
    async (data: { email: string; password: string }) => {
      return await loginUser(data.email, data.password)
    },
    {
      onSuccess: data => {
        signIn(data)
        navigate('/')
      },

      onError: (err: any) => {
        if (err?.response?.status === 400) {
          createNotification('error', 'Invalid email or password')
        } else {
          createNotification('error', 'oops! something went wrong')
        }
      }
    }
  )

  const onSubmit = handleSubmit(data => {
    mutateLogin({
      email: data.email,
      password: data.password
    })
  })

  return (
    <s.SignIn ref={signInRef}>
      <s.FormStyle onSubmit={onSubmit}>
        <div>
          <Controller
            name="email"
            control={control}
            render={props => (
              <>
                <InputStyle type="text" placeholder="Email" {...props.field} />
                {Boolean(errors?.email) && (
                  <s.MessageError>{errors.email?.message}</s.MessageError>
                )}
              </>
            )}
          />
        </div>
        <label>
          <Controller
            name="password"
            control={control}
            render={props => (
              <>
                <InputStyle
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  {...props.field}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

                {Boolean(errors?.password) && (
                  <s.MessageError>{errors.password?.message}</s.MessageError>
                )}
              </>
            )}
          />
        </label>

        <Button outlined={false} type="submit" loading={loginLoading}>
          Sign in
        </Button>
      </s.FormStyle>

      <s.Actions>
        <p>
          <a
            onClick={e => {
              e.preventDefault()
              setLogin('sign-up')
            }}
          >
            Dont have an <strong>account?</strong>
          </a>
        </p>
      </s.Actions>
    </s.SignIn>
  )
}

export default SignIn
