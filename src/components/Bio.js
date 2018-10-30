import React from 'react'
import { rhythm } from '../utils/typography'
import profilePic from './Profile.png'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Assim ELHAMMOUTI`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Hi 👋 ! I'm <strong>Assim ELHAMMOUTI</strong>, I'm a fullstack
          engineer 💻 and <strong>React/React Native/GraphQL</strong> 🤖
          consultant.{' '}
          <a href="https://twitter.com/rxassim">Come follow me on Twitter 🐦</a>
        </p>
      </div>
    )
  }
}

export default Bio
