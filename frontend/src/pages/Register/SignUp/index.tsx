import React, { useEffect, useRef, useState } from 'react'
import { useNotification } from '../../../context/NotificationContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/UserContext'
import useForm from '../../../hooks/useForm'

import { createUser } from '../../../functions/User/createUser'

import * as s from './style'
import Button from '../../../styles/Button'
import InputStyle, { FileInputStyle } from '../../../styles/Input'
import { Actions, FormStyle, Separator } from '../SignIn/style'
import { FaEye, FaEyeSlash, FaUpload } from 'react-icons/fa'
import { useMutation } from 'react-query'

// utils functions
const nameValidation = (value: string) => {
  if (!value.trim()) return 'Name is required'

  return null
}

const passwordValidation = (value: string) => {
  if (!value.trim()) return 'Password is required'

  if (value.length < 6) {
    return 'Password must be at least 6 characters'
  } else if (value.length > 20) {
    return 'Password must be less than 20 characters'
  }

  return null
}

const confirmPasswordValidation = (value: string, password: string) => {
  if (passwordValidation(password)) return null
  if (!value.trim()) return 'Confirm password is required'

  if (value !== password) {
    return 'Confirm password must match password'
  }

  return null
}

interface ISignUpProps {
  setLogin: React.Dispatch<
    React.SetStateAction<'sign-in' | 'sign-up' | 'forgot-password'>
  >
}

const SignUp: React.FC<ISignUpProps> = ({ setLogin }) => {
  const signUpRef = useRef<HTMLDivElement | null>(null)

  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [userImage, setUserImage] = useState<{
    file: File | null
    url: string | null
  }>({
    file: null,
    url: null
  })
  const [showPassword, setShowPassword] = useState(false)
  const { createNotification } = useNotification()

  const emailField = useForm({ type: 'email' })
  const nameField = useForm({ customValidate: nameValidation })
  const passwordField = useForm({ customValidate: passwordValidation })
  const confirmPasswordField = useForm({
    customValidate: (value: string) => {
      return confirmPasswordValidation(value, passwordField.value)
    }
  })

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setUserImage({ file: null, url: null })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const data = reader.result as string
      if (data) {
        setUserImage({
          file,
          url: data
        })
      }
    }

    reader.readAsDataURL(file)
  }

  const createUserFn = () => {
    return createUser({
      name: nameField.value,
      email: emailField.value,
      password: passwordField.value
    })
  }

  const { mutate: mutateCreteUser, isLoading } = useMutation(createUserFn, {
    onSuccess: () => {
      setLogin('sign-in')
      createNotification(
        'success',
        'Account created successfully, please sign in'
      )
    },
    onError: (error: any) => {
      if (error.response.status === 400) {
        createNotification('error', 'Email already exists')
      } else {
        createNotification('error', 'oops! Email is already in use.')
      }
    }
  })

  const handleSubmitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !emailField.isValid ||
      !nameField.isValid ||
      !passwordField.isValid ||
      !confirmPasswordField.isValid
    ) {
      return
    }

    mutateCreteUser()
  }

  return (
    <s.SignUp ref={signUpRef}>
      <FormStyle onSubmit={handleSubmitSignUp}>
        <div>
          <InputStyle
            type="text"
            placeholder="Name"
            onChange={nameField.handleChange}
            value={nameField.value}
            isValid={nameField.isValid}
          />
        </div>

        <div>
          <InputStyle
            type="text"
            placeholder="Email"
            onChange={emailField.handleChange}
            onBlur={emailField.handleBlur}
            value={emailField.value}
            isValid={emailField.isValid}
          />
          {emailField.error && (
            <s.MessageError>{emailField.error}</s.MessageError>
          )}
        </div>

        <label>
          <InputStyle
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={passwordField.handleChange}
            onBlur={passwordField.handleBlur}
            value={passwordField.value}
            isValid={passwordField.isValid}
          />
          <button type="button" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

          {passwordField.error && (
            <s.MessageError>{passwordField.error}</s.MessageError>
          )}
        </label>

        <div>
          <InputStyle
            placeholder="Confirm password"
            type="password"
            onChange={confirmPasswordField.handleChange}
            onBlur={confirmPasswordField.handleBlur}
            value={confirmPasswordField.value}
            isValid={confirmPasswordField.isValid}
          />

          {confirmPasswordField.error && (
            <s.MessageError>{confirmPasswordField.error}</s.MessageError>
          )}
        </div>

        <Button outlined={false} type="submit" loading={isLoading}>
          Sign Up
        </Button>
      </FormStyle>

      <Actions>
        <p>
          <a
            onClick={e => {
              e.preventDefault()
              setLogin('sign-in')
            }}
          >
            Already have an <strong>account?</strong>
          </a>
        </p>
      </Actions>
    </s.SignUp>
  )
}

export default SignUp
