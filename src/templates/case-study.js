import React from "react"
import PropTypes from "prop-types"
import { kebabCase } from "lodash"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"

import { FaPhone, FaRegEnvelope } from "react-icons/fa"

import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"

export const CaseStudyTemplate = ({ content, contentComponent, description, tags, title, helmet }) => {
    const PostContent = contentComponent || Content

    return (
        <section className="section">
            {helmet || ""}
            <div className="container content has-text-centered">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">{title}</h1>
                        <p>{description}</p>
                        <PostContent content={content} />
                        {/* reference(s) */}
                        {/* team photo */}
                        <hr className="has-background-primary" />
                    </div>
                </div>
            </div>
            {/* get in touch */}
            <div className="container content has-text-centered">
                <div className="columns">
                    <div className="column" />
                    <div className="column is-6">
                        <p>
                            Ready to start your next project with us? That's great! Give us a call or send us an email
                            and let us inspire you!
                        </p>
                        <i className="has-text-primary is-size-1">
                            <FaPhone />
                        </i>
                        <p>
                            <a href="tel://447875769655">+44 7875 769655</a>
                        </p>
                        <i className="has-text-primary is-size-1">
                            <FaRegEnvelope />
                        </i>
                        <p>
                            <a href="mailto:inspireme@theeventsraccoon.co.uk">inspireme@theeventsraccoon.co.uk</a>
                        </p>
                    </div>
                    <div className="column" />
                </div>
                <div className="columns is-centered">
                    <div className="column is-10 is-offset-1">
                        {tags && tags.length ? (
                            <div style={{ marginTop: `4rem` }}>
                                <h4>Tags</h4>
                                <ul className="taglist" style={{ justifyContent: "center" }}>
                                    {tags.map((tag) => (
                                        <li key={tag + `tag`}>
                                            <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    )
}

CaseStudyTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    helmet: PropTypes.object,
}

const CaseStudy = ({ data }) => {
    const { markdownRemark: post } = data

    return (
        <Layout>
            <CaseStudyTemplate
                content={post.html}
                contentComponent={HTMLContent}
                description={post.frontmatter.description}
                helmet={
                    <Helmet titleTemplate="%s | Blog">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta name="description" content={`${post.frontmatter.description}`} />
                    </Helmet>
                }
                tags={post.frontmatter.tags}
                title={post.frontmatter.title}
            />
        </Layout>
    )
}

CaseStudy.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
}

export default CaseStudy

export const pageQuery = graphql`
    query CaseStudyByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                tags
            }
        }
    }
`
