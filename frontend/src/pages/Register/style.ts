import styled from 'styled-components'

import linearGradient from '../../assets/cover-register.svg'

export const RegisterCover = styled.div`
  background-image: url(${linearGradient});
  background-size: cover;
  background-color: ${props => props.theme.colors.g2};
  background-repeat: no-repeat;

  min-height: 100vh;
`

export const ResgisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  padding: 60px 20px 0;
  height: 100%;
  margin: 0 auto;
`

export const RegisterFormContainer = styled.div`
  width: 100%;
  background: rgba(14, 14, 14, 0.97);
  box-shadow: 0 8px 8px -2px rgba(0, 0, 0, 0.2);
  border-radius: ${props => props.theme.borderRadius};
  backdrop-filter: blur(5px);
  backdrop-filter: 5px;
  margin-top: 24px;
  overflow: hidden;
`

export const RegisterContent = styled.div`
  padding: 30px 20px;
`
