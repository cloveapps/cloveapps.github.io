const path = require('path');

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
    promise.then(result => {
        if (result.errors) {
            throw result.errors
        }
        return result
    });

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await wrapper(
        graphql(`
        {
            prismic {
                allProducts {
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
                allUpdates {
                    edges {
                        node {
                            update_title
                            update_hero_image
                            update_hero_annotation
                            update_date
                            update_category
                            update_body
                            update_preview_description
                            update_author
                            _meta {
                                uid
                            }
                        }
                    }
                }
            }
        }
    `)
    )

    const productsList = result.data.prismic.allProducts.edges;
    const updatesList = result.data.prismic.allUpdates.edges;

    const productTemplate = require.resolve('./src/templates/product.jsx');
    const updateTemplate = require.resolve('./src/templates/update.jsx');

    productsList.forEach(edge => {
        // The uid you assigned in Prismic is the slug!
        createPage({
            type: 'Product',
            match: '/products/:uid',
            path: `/products/${edge.node._meta.uid}`,
            component: productTemplate,
            context: {
                // Pass the unique ID (uid) through context so the template can filter by it
                uid: edge.node._meta.uid,
            },
        })
    })

    updatesList.forEach(edge => {
        createPage({
            type: 'Update',
            match: '/updates/:uid',
            path: `/updates/${edge.node._meta.uid}`,
            component: updateTemplate,
            context: {
                uid: edge.node._meta.uid,
            },
        })
    })
}
