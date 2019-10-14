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
      allWordpressPage {
        edges {
          node {
            id
            slug
          }
        }
      }
      allWordpressPost(sort: { fields: [slug], order: ASC }) {
        edges {
          node {
            id
            slug
            acf {
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

  const { allWordpressPage, allWordpressPost } = result.data;

  // 固定ページを生成
  const pageTemplate = path.resolve(`src/templates/PageTemplate.tsx`);

  allWordpressPage.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}/`,
      component: pageTemplate,
      context: {
        id: edge.node.id,
        slug: edge.node.slug,
      },
    });
  });

  // イベントページを生成
  const postTemplate = path.resolve(`src/templates/PostTemplate.tsx`);
  const posts = allWordpressPost.edges;
  const YYYYMMs = new Set();

  posts.forEach(({ node }, index) => {
    const dates = node.acf.date.split('/');
    const year = dates[2];
    const month = dates[1];
    const date = dates[0];

    const prev = index === 0 ? false : posts[index - 1].node;
    const next = index === posts.length - 1 ? false : posts[index + 1].node;

    createPage({
      path: `/schedule/${year}/${month}/${date}/`,
      component: postTemplate,
      context: {
        id: node.id,
        slug: node.slug,
        prev,
        next,
      },
    });

    // スケジュールページで使用する年月のリストをここで生成
    YYYYMMs.add(parseInt(`${year}${month}`, 10));
  });

  // スケジュールページを生成
  const scheduleTemplate = path.resolve(`src/templates/ScheduleTemplate.tsx`);

  const min = Math.min(...YYYYMMs);
  const max = Math.max(...YYYYMMs);
  let schedulesArray = [];

  for (let i = min; i <= max; i++) {
    schedulesArray.push(i);
  }

  function generatePath(YYYYMM) {
    const YYYY = YYYYMM.slice(0, 4);
    const MM = YYYYMM.slice(4);

    return `/schedule/${YYYY}/${MM}`;
  }

  const thisMonth = parseInt(format(new Date(), 'yyyyLL'), 10);

  schedulesArray.forEach((YYYYMM, index) => {
    const path = generatePath(YYYYMM.toString());
    const gt = `${YYYYMM}00`;
    const lt = `${YYYYMM}99`;

    const prev =
      index === 0 ? false : generatePath(schedulesArray[index - 1].toString());
    const next =
      index === schedulesArray.length - 1
        ? false
        : generatePath(schedulesArray[index + 1].toString());

    createPage({
      path,
      component: scheduleTemplate,
      context: {
        gt,
        lt,
        prev,
        next,
      },
    });

    if (YYYYMM === thisMonth) {
      // スケジュールトップページを生成
      createPage({
        path: '/schedule/',
        component: scheduleTemplate,
        context: {
          gt,
          lt,
          prev,
          next,
        },
      });
    }
  });

  // トップページを生成
  const topPageTemplate = path.resolve(`src/templates/TopPageTemplate.tsx`);
  const today = format(new Date(), 'yyyyLLdd');

  createPage({
    path: '/',
    component: topPageTemplate,
    context: {
      gte: today,
    },
  });
};
