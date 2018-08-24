import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import { rhythm } from '../utils/typography'

import Signup from '../components/Signup'

class Landing extends React.Component {
  render() {
    const siteTitle = 'LandingPage'

    return (
      <div>
        <Helmet title={siteTitle} />
        <Signup landing title="Sign up now and get my latest blog posts right to your email !"/>
      </div>
    )
  }
}

export default Landing
