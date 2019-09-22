import { Link } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import MetaImage from '../../static/react-repo.png'
import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'

const Title = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
  line-height: 1.4;
`

const BlogIndex = props => {
  const siteTitle = get(
    props,
    'data.site.siteMetadata.title'
  )
  const posts = get(props, 'data.allMarkdownRemark.edges')

  return (
    <Layout location={props.location}>
      <Helmet title={siteTitle}>
        <title>
          Assim's Blog | React, React Native and GraphQL
        </title>
        <meta
          name="title"
          content="Assim's Blog | React, React Native and GraphQL"
        />
        <meta
          name="description"
          content="Hi ! My name is Assim and I'm a software engineer."
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.assim.me/"
        />
        <meta
          property="og:title"
          content="Assim's Blog | React, React Native and GraphQL"
        />
        <meta
          property="og:description"
          content="Hi ! My name is Assim and I'm a software engineer."
        />
        <meta property="og:image" content={MetaImage} />

        <meta
          property="twitter:card"
          content="summary_large_image"
        />
        <meta
          property="twitter:url"
          content="https://www.assim.me/"
        />
        <meta
          property="twitter:title"
          content="Assim's Blog | React, React Native and GraphQL"
        />
        <meta
          property="twitter:description"
          content="Hi ! My name is Assim and I'm a software engineer."
        />
        <meta
          property="twitter:image"
          content={MetaImage}
        />
      </Helmet>
      <Bio />
      {posts.map(({ node }) => {
        const title =
          get(node, 'frontmatter.title') || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <Title>
              <Link
                style={{ boxShadow: 'none' }}
                to={node.fields.slug}
              >
                {title}
              </Link>
            </Title>
            <small>{node.frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: node.excerpt,
              }}
            />
          </div>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
