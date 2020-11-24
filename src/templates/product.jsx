import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import styled from "@emotion/styled"
import colors from "styles/colors"
import { Link, graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import Button from "components/_ui/Button"
import Layout from "components/Layout"

const ProductHeroContainer = styled("div")`
  background: ${colors.grey200};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  margin-bottom: 3.5em;

  img {
    width: 100%;
    max-width: 972px;
  }
`

const ProductTitle = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
`

const ProductBody = styled("div")`
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

const ProductsLink = styled(Link)`
  margin-top: 3em;
  display: block;
  text-align: center;
`

const Product = ({ product, meta }) => {
  return (
    <>
      <Helmet
        title={`${product.product_title[0].text}`}
        titleTemplate={`%s | ${meta.title}`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `${product.product_title[0].text} | Clove Labs`,
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
        <ProductTitle>{RichText.render(product.product_title)}</ProductTitle>
        {product.product_hero_image && (
          <ProductHeroContainer>
            <img src={product.product_hero_image.url} alt="bees" />
          </ProductHeroContainer>
        )}
        <ProductBody>
          {RichText.render(product.product_description)}
          <ProductsLink to={"/products"}>
            <Button className="Button--secondary">All Products</Button>
          </ProductsLink>
        </ProductBody>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const productContent = data.prismic.allProducts.edges[0].node
  const meta = data.site.siteMetadata
  return <Product product={productContent} meta={meta} />
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
}

export const query = graphql`
  query ProductQuery($uid: String) {
    prismic {
      allProducts(uid: $uid) {
        edges {
          node {
            product_title
            product_preview_description
            product_preview_thumbnail
            product_category
            product_hero_image
            product_description
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
