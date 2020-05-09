import React from 'react';
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Moment from 'react-moment';
import { graphql } from 'gatsby';
import { RichText } from "prismic-reactjs";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Layout from "components/Layout";

const UpdateHeroContainer = styled("div")`
    max-height: 500px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 3em;

    img {
        width: 100%;
    }
`

const UpdateHeroAnnotation = styled("div")`
    padding-top: 0.25em;

    h6 {
        text-align: right;
        color: ${colors.grey600};
        font-weight: 400;
        font-size: 0.85rem;
    }

    a {
        color: currentColor;
    }
`

const UpdateCategory = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    text-align: center;
    font-weight: 600;
    color: ${colors.grey600};

    h5 {
        margin-top: 0;
        margin-bottom: 1em;
    }
`

const UpdateTitle = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    text-align: center;

    h1 {
        margin-top: 0;
    }
`

const UpdateBody = styled("div")`
    max-width: 550px;
    margin: 0 auto;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const UpdateMetas = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-bottom: 2em;
    justify-content: space-between;
    font-size: 0.85em;
    color: ${colors.grey600};
`

const UpdateAuthor = styled("div")`
    margin: 0;
`

const UpdateDate = styled("div")`
    margin: 0;
`

const Update = ({ update, meta }) => {
    return (
        <>
            <Helmet
                title={`${update.update_title[0].text}`}
                titleTemplate={`%s | ${meta.title}`}
                meta={[
                    {
                        name: `description`,
                        content: meta.description,
                    },
                    {
                        property: `og:title`,
                        content: `${update.update_title[0].text} | Clove Crypto`,
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
                <UpdateCategory>
                    {RichText.render(update.update_category)}
                </UpdateCategory>
                <UpdateTitle>
                    {RichText.render(update.update_title)}
                </UpdateTitle>
                <UpdateMetas>
                    <UpdateAuthor>
                        {update.update_author}
                    </UpdateAuthor>
                    <UpdateDate>
                        <Moment format="MMMM D, YYYY">{update.update_date}</Moment>
                    </UpdateDate>
                </UpdateMetas>
                    {update.update_hero_image && (
                    <UpdateHeroContainer>
                        <img src={update.update_hero_image.url} alt="bees" />
                        <UpdateHeroAnnotation>
                            {RichText.render(update.update_hero_annotation)}
                        </UpdateHeroAnnotation>
                    </UpdateHeroContainer>
                )}
                <UpdateBody>
                    {RichText.render(update.update_body)}
                </UpdateBody>
            </Layout>
        </>
    )
}

export default ({ data }) => {
    const updateContent = data.prismic.allUpdates.edges[0].node;
    const meta = data.site.siteMetadata;
    return (
        <Update update={updateContent} meta={meta}/>
    )
}

Update.propTypes = {
    update: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
};

export const query = graphql`
    query UpdateQuery($uid: String) {
        prismic {
            allUpdates(uid: $uid) {
                edges {
                    node {
                        update_title
                        update_hero_image
                        update_hero_annotation
                        update_date
                        update_category
                        update_body
                        update_author
                        update_preview_description
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