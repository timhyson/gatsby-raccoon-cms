import React from "react"
import PropTypes from "prop-types"
import { Link, graphql, StaticQuery } from "gatsby"
import PreviewCompatibleImage from "./PreviewCompatibleImage"

class CaseRoll extends React.Component {
    render() {
        const { data } = this.props
        const { edges: posts } = data.allMarkdownRemark

        return (
            <div className="columns">
                {posts &&
                    posts
                        .slice(0, 3) // show three most recent case studies
                        .map(({ node: post }) => (
                            <div key={post.id} className="is-parent column">
                                <article
                                    className={`case-study-item tile is-child box notification ${
                                        post.frontmatter.featuredpost ? "is-featured" : ""
                                    }`}
                                >
                                    <header>
                                        {post.frontmatter.featuredimage ? (
                                            <div className="featured-thumbnail">
                                                <PreviewCompatibleImage
                                                    imageInfo={{
                                                        image: post.frontmatter.featuredimage,
                                                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                                    }}
                                                />
                                            </div>
                                        ) : null}
                                    </header>
                                    <p className="post-meta">
                                        <Link className="title has-text-primary is-size-4" to={post.fields.slug}>
                                            {post.frontmatter.title}
                                        </Link>
                                    </p>
                                    <p className="subtitle is-size-5 is-block">{post.frontmatter.description}</p>
                                    <p>
                                        {/* {post.excerpt} */}
                                        <br />
                                        <br />
                                        <Link className="button" to={post.fields.slug}>
                                            Keep Reading →
                                        </Link>
                                    </p>
                                </article>
                            </div>
                        ))}
            </div>
        )
    }
}

CaseRoll.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export default () => (
    <StaticQuery
        query={graphql`
            query CaseRollQuery {
                allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] }
                    filter: { frontmatter: { templateKey: { eq: "case-study" } } }
                ) {
                    edges {
                        node {
                            excerpt(pruneLength: 400)
                            id
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                templateKey
                                date(formatString: "MMMM DD, YYYY")
                                featuredpost
                                featuredimage {
                                    childImageSharp {
                                        fluid(maxWidth: 1200, quality: 100) {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                                description
                            }
                        }
                    }
                }
            }
        `}
        render={(data, count) => <CaseRoll data={data} count={count} />}
    />
)
