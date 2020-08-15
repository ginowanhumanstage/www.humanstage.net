const path = require(`path`);
const { format } = require(`date-fns`);

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allWpPage {
        edges {
          node {
            id
            slug
          }
        }
      }
      allWpPost(sort: { fields: [slug], order: ASC }) {
        edges {
          node {
            id
            slug
            acfScuedule {
              date
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const { allWpPage, allWpPost } = result.data;

  // 固定ページを生成
  const pageTemplate = path.resolve(`src/templates/PageTemplate.tsx`);

  allWpPage.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}/`,
      component: pageTemplate,
      context: {
        id: edge.node.id,
        slug: edge.node.slug,
      },
    });
  });

  // トップページを生成
  const topPageTemplate = path.resolve(`src/templates/TopPageTemplate.tsx`);
  const today = format(new Date(), 'YYYYMMDD');

  createPage({
    path: '/',
    component: topPageTemplate,
  });
};
