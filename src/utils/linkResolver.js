// -- The Link Resolver
// This function will be used to generate links to Prismic documents
// As your project grows, you should update this function according to your routes

exports.linkResolver = function linkResolver(doc) {
    // Route for updates
    if (doc.type === 'Update') {
        return '/updates/' + doc.uid;
    }

    // Homepage route fallback
    return '/';
}