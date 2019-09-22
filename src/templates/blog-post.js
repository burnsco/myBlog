import { graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import Bio from '../components/Bio'
import Layout from '../components/layout'
import '../utils/prismTheme.css'
import { rhythm, scale } from '../utils/typography'

const BlogPostTemplate = props => {
  const post = props.data.markdownRemark
  const siteTitle = get(
    props,
    'data.site.siteMetadata.title'
  )
  const siteUrl = get(
    props,
    'data.site.siteMetadata.siteUrl'
  )
  const { previous, next } = props.pageContext

  return (
    <Layout location={props.location}>
      <Helmet
        title={`${post.frontmatter.title} | ${siteTitle}`}
      >
        <meta
          name="title"
          content={post.frontmatter.title}
        />
        <meta name="description" content={post.excerpt} />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.assim.me/"
        />
        <meta
          property="og:title"
          content={post.frontmatter.title}
        />
        <meta
          property="og:description"
          content={post.excerpt}
        />
        <meta
          property="og:image"
          content={`${siteUrl}${post.fields.slug}twitter-card.jpg`}
        />

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
          content={post.frontmatter.title}
        />
        <meta
          property="twitter:description"
          content={post.excerpt}
        />
        <meta
          property="twitter:image"
          content={`${siteUrl}${post.fields.slug}twitter-card.jpg`}
        />
      </Helmet>
      <h1 style={{ textAlign: 'center' }}>
        {post.frontmatter.title}
      </h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: 'block',
          marginBottom: rhythm(1),
          marginTop: rhythm(-0.5),
          textAlign: 'center',
        }}
      >
        {post.frontmatter.date}
      </p>
      <p style={{ fontStyle: 'italic' }}>
        NOTE: This is a cross-post from{' '}
        {
          <a
            href={
              'https://www.getdrip.com/forms/14582623/submissions/new'
            }
          >
            my newsletter.
          </a>
        }{' '}
        I publish each email one week after it’s sent.
        Subscribe to get more content like this earlier
        right in your inbox! 💌
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <p style={{ fontStyle: 'italic' }}>
        NOTE: If you'd like to improve this post, please
        send a PR to{' '}
        {
          <a
            href={`https://github.com/RxAssim/myBlog/blob/master/src/posts/${post.fields.slug.replace(
              /\//g,
              ''
            )}.md`}
          >
            its repo on Github.
          </a>
        }{' '}
        💌
      </p>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      ></ul>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      fields {
        slug
      }
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
