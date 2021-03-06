import React from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import Features from "../components/Features"
import BlogRoll from "../components/BlogRoll"
import CaseRoll from "../components/CaseRoll"

export const IndexPageTemplate = ({ image, title, heading, subheading, mainpitch, description, intro, offers }) => (
    <div>
        <Helmet>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway" rel="stylesheet" />
        </Helmet>
        <div
            className="full-width-image margin-top-0 has-text-centered"
            style={{
                backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image})`,
                backgroundPosition: `center center`,
                backgroundAttachment: `fixed`,
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    height: "90vh",
                    lineHeight: "1",
                    justifyContent: "space-around",
                    alignItems: "left",
                    flexDirection: "column",
                }}
            >
                <h1
                    className="has-text-primary has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                    style={{
                        backgroundColor: "rgba(237, 237, 237, 0.7)",
                        lineHeight: "1",
                        padding: "0.25em",
                        textAlign: "center",
                    }}
                >
                    {title}
                </h1>
                <h3
                    className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                    style={{
                        backgroundColor: "rgba(237, 237, 237, 0.7)",
                        lineHeight: "1",
                        padding: "0.25em",
                    }}
                >
                    {subheading}
                </h3>
            </div>
        </div>
        <div className="content full-width-image margin-top-0 has-text-centered has-background-primary">
            <section className="section">
                <div
                    className="container"
                    style={{
                        display: "flex",
                        lineHeight: "1",
                        justifyContent: "space-around",
                        alignItems: "left",
                        flexDirection: "column",
                    }}
                >
                    <h3
                        className="has-text-white has-text-weight-semibold is-size-2"
                        style={{
                            lineHeight: "1",
                            padding: "0.25em",
                        }}
                    >
                        {mainpitch.title}
                    </h3>
                    <hr />
                    {mainpitch.description &&
                        mainpitch.description.split("\n\n").map((paragraph, i) => (
                            <h6
                                className="subtitle has-text-white has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                                key={i}
                            >
                                {paragraph}
                            </h6>
                        ))}
                </div>
            </section>
        </div>

        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="content has-text-centered">
                            <div className="columns">
                                <div className="column is-12">
                                    <h3 className="has-text-weight-semibold is-size-2">{intro.heading}</h3>
                                    <hr className="bg-primary" />
                                    <p>{description}</p>
                                </div>
                            </div>
                            <Features gridItems={intro.blurbs} />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* <div className="columns">
            <div className="column is-12 has-text-centered">
                <Link className="btn" to="/products">
                    See all products
                </Link>
            </div>
        </div> */}

        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="content has-text-centered">
                            <div className="column is-12">
                                <h3 className="has-text-weight-semibold is-size-2">See What We Do</h3>
                                <hr className="bg-primary" />
                                <CaseRoll />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="content has-text-centered">
                            <div className="columns">
                                <div className="column is-12">
                                    <h3 className="has-text-weight-semibold is-size-2">{offers.heading}</h3>
                                    <hr className="bg-primary" />
                                </div>
                            </div>
                            <Features gridItems={offers.blurbs} />
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="content has-text-centered">
                            <div className="column is-12">
                                <BlogRoll />
                                <div className="column is-12 has-text-centered">
                                    <Link className="btn" to="/blog">
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
)

IndexPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    heading: PropTypes.string,
    subheading: PropTypes.string,
    mainpitch: PropTypes.object,
    description: PropTypes.string,
    intro: PropTypes.shape({
        blurbs: PropTypes.array,
    }),
    offers: PropTypes.shape({
        blurbs: PropTypes.array,
    }),
}

const IndexPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark

    return (
        <Layout>
            <IndexPageTemplate
                image={frontmatter.image}
                title={frontmatter.title}
                heading={frontmatter.heading}
                subheading={frontmatter.subheading}
                mainpitch={frontmatter.mainpitch}
                description={frontmatter.description}
                intro={frontmatter.intro}
                offers={frontmatter.offers}
            />
        </Layout>
    )
}

IndexPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
}

export default IndexPage

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            frontmatter {
                title
                image {
                    childImageSharp {
                        fluid(maxWidth: 2048, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                heading
                subheading
                mainpitch {
                    title
                    description
                }
                description
                intro {
                    blurbs {
                        icon
                        text
                        title
                    }
                    heading
                    description
                }
                offers {
                    blurbs {
                        icon
                        text
                        title
                    }
                    heading
                    description
                }
            }
        }
    }
`
