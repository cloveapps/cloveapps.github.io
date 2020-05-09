import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "components/Layout";
import ProductCard from "components/ProductCard";

const ProductsTitle = styled("h1")`
    margin-bottom: 1em;
`

const Products = ({ products, meta }) => (
    <>
        <Helmet
            title={`Products`}
            titleTemplate={`%s | Clove Crypto`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Products | Clove Crypto`,
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
            <ProductsTitle>
                Products
            </ProductsTitle>
            <>
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
            </>
        </Layout>
    </>
);

export default ({ data }) => {
    const products = data.prismic.allProducts.edges;
    const meta = data.site.siteMetadata;
    if (!products) return null;

    return (
        <Products products={products} meta={meta}/>
    )
}

Products.propTypes = {
    products: PropTypes.array.isRequired,
};

export const query = graphql`
    {
        prismic {
            allProducts (sortBy: order_ASC) {
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

