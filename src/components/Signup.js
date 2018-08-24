import Spinner from '@atlaskit/spinner'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 4px rgba(0, 105, 255, 0.5);
  border: 1px solid #0069ff;
  border-radius: 3px;
  background: #fff;
  padding: 10px 20px;
  height: ${props => props.landing && '100vh'};
`

const Button = styled.button`
  border-radius: 3px;
  border: 0;
  color: white;
  background-color: #0069ff;
  margin: 20px 0 20px 10px;
  font-size: 1rem;
  height: auto;
  display: inline-block;
  overflow: visible;
  padding: 0 32px;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  white-space: nowrap;
  line-height: 48px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  appearance: none;
  &:hover {
    background: #005fe6;
    color: hsla(0, 0%, 100%, 0.9);
  }
`

const Input = styled.input`
  background: #fcfcfc;
  border: ${props => (props.error ? '2px solid #f54424' : '2px solid #e7e7e7')};
  margin: 20px auto;
  padding: 15px;
  width: 100%;
  display: block;
  border-radius: 3px;
  font-size: 18px;
  transition: opacity 0.4s;
  text-align: left;
  height: auto;
`

const Title = styled.h1`
  font-size: 1.5rem;
  color: #0069ff;
  text-align: center;
`

const ErrorMessage = styled.p`
  color: #f54424;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  justify-content: center;
  flex-wrap: wrap;
`

const Ps = styled.p`
  font-size: 0.6rem;
  text-align: center;
`

class Signup extends React.Component {
  state = {
    error: false,
    email: '',
    name: '',
    submitted: false,
    submitting: false,
  }

  _handleName = event => {
    this.setState({ name: event.target.value })
  }

  _handleEmail = event => {
    this.setState({ email: event.target.value })
  }

  _validate = () => {
    const { email, name } = this.state
    let hasErrors = false
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(email)) {
      this.setState({ emailError: true })
      hasErrors = true
    } else {
      this.setState({ emailError: false })
    }

    if (name === '') {
      this.setState({ nameError: true })
      hasErrors = true
    } else {
      this.setState({ nameError: false })
    }

    return !hasErrors
  }

  encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  handleSubmit = e => {
    e.preventDefault()
    const valid = this._validate()
    if (valid) {
      this.setState({ submitting: true })
      const { name, email } = this.state
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({ 'form-name': 'contact', name, email }),
      })
        .then(() => {
          this.setState({ submitted: true, submitting: false })
        })
        .catch(error => {
          this.setState({ submitting: false })
        })
    }
  }

  render() {
    const {
      emailError,
      nameError,
      email,
      name,
      submitted,
      submitting,
    } = this.state
    let title = this.props.title
      ? this.props.title
      : 'Sign up to my newsletter and get the latest React news !!'
    if (submitted) {
      title = `Email successfully submitted ! Welcome to the family ${name}`
    }
    return (
      <Wrapper
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
        landing={this.props.landing}
      >
        <Title>{title}</Title>
        {!submitted && (
          <InputWrapper>
            <input type="hidden" name="bot-field" />
            <Input
              error={nameError}
              value={name}
              type="text"
              name="name"
              onChange={this._handleName}
              placeholder="Your First Name Here..."
            />
            <Input
              value={email}
              type="text"
              name="email"
              error={emailError}
              onChange={this._handleEmail}
              placeholder="Your Email Here..."
            />
            <Button type="submit">
              {!submitting ? 'SIGN ME UP' : `SIGNING YOU UP... `}
              {submitting && <Spinner invertColor />}
            </Button>
          </InputWrapper>
        )}
        {emailError && (
          <ErrorMessage>Oops... ! Please add a valid email </ErrorMessage>
        )}
        {nameError && (
          <ErrorMessage>Oops... ! Please add your first name </ErrorMessage>
        )}
        <Ps>
          I hate spam , probably more than you do, so don't worry, you won't get
          any of that 💩 !
        </Ps>
      </Wrapper>
    )
  }
}

export default Signup
