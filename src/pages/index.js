import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { RichText } from "prismic-reactjs"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Button from "components/_ui/Button"
import About from "components/About"
import Layout from "components/Layout"
import ProductCard from "components/ProductCard"

const Hero = styled("div")`
  padding-top: 2.5em;
  padding-bottom: 3em;
  margin-bottom: 6em;
  max-width: 830px;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    margin-bottom: 3em;
  }

  h1 {
    a {
      text-decoration: none;
      transition: all 100ms ease-in-out;

      &:nth-of-type(1) {
        color: ${colors.orange500};
      }
      &:nth-of-type(2) {
        color: ${colors.green500};
      }
      &:nth-of-type(3) {
        color: ${colors.blue500};
      }
      &:nth-of-type(4) {
        color: ${colors.purple500};
      }
      &:nth-of-type(5) {
        color: ${colors.teal500};
      }

      &:hover {
        cursor: pointer;
        transition: all 100ms ease-in-out;

        &:nth-of-type(1) {
          color: ${colors.orange600};
          background-color: ${colors.orange200};
        }
        &:nth-of-type(2) {
          color: ${colors.green600};
          background-color: ${colors.green200};
        }
        &:nth-of-type(3) {
          color: ${colors.blue600};
          background-color: ${colors.blue200};
        }
        &:nth-of-type(4) {
          color: ${colors.purple600};
          background-color: ${colors.purple200};
        }
        &:nth-of-type(5) {
          color: ${colors.teal600};
          background-color: ${colors.teal200};
        }
      }
    }
  }
`

const Section = styled("div")`
  margin-bottom: 10em;
  display: flex;
  flex-direction: column;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin-bottom: 4em;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const ProductsAction = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;
  margin-left: auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin: 0 auto;
  }

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }

  &:hover {
    color: ${colors.blue500};
    transition: all 150ms ease-in-out;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: transform 150ms ease-in-out;
    }
  }
`

const UpdateItem = styled("div")`
  margin-bottom: 2em;
  a {
    text-decoration: none;
    transition: all 100ms ease-in-out;
    &:hover {
      cursor: pointer;
      transition: all 100ms ease-in-out;
    }
  }
  &:nth-of-type(1) a {
    color: ${colors.orange500};
    &:hover {
      color: ${colors.orange600};
    }
  }
  &:nth-of-type(2) a {
    color: ${colors.green500};
    &:hover {
      color: ${colors.green600};
    }
  }
  &:nth-of-type(3) a {
    color: ${colors.blue500};
    &:hover {
      color: ${colors.blue600};
    }
  }
  &:nth-of-type(4) a {
    color: ${colors.purple500};
    &:hover {
      color: ${colors.purple600};
    }
  }
  &:nth-of-type(5) a {
    color: ${colors.teal500};
    &:hover {
      color: ${colors.teal600};
    }
  }
`

const RenderBody = ({ home, products, updates, meta }) => (
  <>
    <Helmet
      title={`Driving the next wave of Blockchain adoption | Clove Crypto`}
      meta={[
        {
          name: `description`,
          content: meta.description,
        },
        {
          property: `og:title`,
          content: meta.title,
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
    <Hero>
      {RichText.render(home.hero_title)}
      <a
        href={home.hero_button_link.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>{RichText.render(home.hero_button_text)}</Button>
      </a>
    </Hero>
    <Section>
      {products.map((product, i) => (
        <ProductCard
          key={i}
          category={product.node.product_category}
          title={product.node.product_title}
          description={product.node.product_preview_description}
          thumbnail={product.node.product_preview_thumbnail}
          uid={product.node._meta.uid}
        />
      ))}
      <ProductsAction to={"/products"}>
        All Products <span>&#8594;</span>
      </ProductsAction>
    </Section>
    <Section>
      <h3>What's new</h3>
      {updates.map((update, i) => (
        <UpdateItem>
          <a
            key={i}
            href={update.node.update_link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>{update.node.update_title[0].text}</h3>
          </a>
          <div>{update.node.update_body[0].text}</div>
        </UpdateItem>
      ))}
    </Section>
    <Section>
      {RichText.render(home.about_title)}
      <About bio={home.about_bio} socialLinks={home.about_links} />
    </Section>
  </>
)

export default ({ data }) => {
  //Required check for no data being returned
  const doc = data.prismic.home_page
  const products = data.prismic.allProducts.edges
  const updates = data.prismic.allUpdates.edges
  const meta = data.site.siteMetadata

  if (!doc || !products || !updates) return null

  return (
    <Layout>
      <RenderBody
        home={doc}
        products={products}
        updates={updates}
        meta={meta}
      />
    </Layout>
  )
}

RenderBody.propTypes = {
  home: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  updates: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
}

export const query = graphql`
  {
    prismic {
      home_page(lang: "en-us", uid: "home") {
        hero_title
        hero_button_text
        hero_button_link {
          ... on PRISMIC__ExternalLink {
            _linkType
            url
          }
        }
        about_title
        about_bio
        about_links {
          about_link
        }
      }
      allProducts(sortBy: order_ASC, first: 1) {
        edges {
          node {
            product_title
            product_preview_description
            product_preview_thumbnail
            product_category
            _meta {
              uid
            }
          }
        }
      }
      allUpdates(sortBy: meta_lastPublicationDate_DESC) {
        edges {
          node {
            update_title
            update_body
            update_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
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
