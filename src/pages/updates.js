import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import dimensions from "styles/dimensions";
import Layout from "components/Layout";
import UpdateCard from "components/UpdateCard";

const UpdatesTitle = styled("h1")`
    margin-bottom: 1em;
`

const UpdatesGrid = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2.5em;

    @media(max-width: 1050px) {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1.5em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        grid-template-columns: 1fr;
        grid-gap: 2.5em;
    }
`

const Updates = ({ updates, meta }) => (
    <>
        <Helmet
            title={`Updates`}
            titleTemplate={`%s | Clove Crypto`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Updates | Clove Crypto`,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
        <Layout>
            <UpdatesTitle>
                Updates
            </UpdatesTitle>
            <UpdatesGrid>
                {updates.map((update, i) => (
                    <UpdateCard
                        key={i}
                        author={update.node.update_author}
                        category={update.node.update_category}
                        title={update.node.update_title}
                        date={update.node.update_date}
                        description={update.node.update_preview_description}
                        uid={update.node._meta.uid}
                    />
                ))}
            </UpdatesGrid>
        </Layout>
    </>
);

export default ({ data }) => {
    const updates = data.prismic.allUpdates.edges;
    const meta = data.site.siteMetadata;
    if (!updates) return null;

    return (
        <Updates updates={updates} meta={meta}/>
    )
}

Updates.propTypes = {
    updates: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
};


export const query = graphql`
    {
        prismic {
            allUpdates(sortBy: update_date_DESC) {
                edges {
                    node {
                        update_title
                        update_date
                        update_category
                        update_preview_description
                        update_author
                        _meta {
                            uid
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`

