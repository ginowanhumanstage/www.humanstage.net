import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LiveItems from '../components/liveItems';
import Pagination from '../components/pagination';
// import Calendar from '../components/calendar';

export default ({ data, pageContext, location }) => {
  const pathItems = location.pathname.split('/');
  const year = pathItems[2];
  const month = pathItems[3];

  const title =
    year && month
      ? `${year}年${parseInt(month, 10)}月のスケジュール`
      : 'スケジュール';

  // カレンダーコンポーネントへイベント開催日を装飾させるためにslugの配列を生成
  // const slugs = data.allWordpressPost.edges.map(edge => {
  //   return edge.node.slug;
  // });

  return (
    <Layout>
      <SEO title={title} />
      <Headline>スケジュール</Headline>
      <Pagination prev={pageContext.prev} next={pageContext.next}>
        <CurrentPage>
          {year}/{month}
        </CurrentPage>
      </Pagination>
      <ContentsWrapper>
        {/* <Sidebar>
          <Calendar date={`${year}-${month}-01`} slugs={slugs} />
        </Sidebar> */}
        <Main>
          <LiveItems data={data} />
        </Main>
      </ContentsWrapper>
      <Pagination prev={pageContext.prev} next={pageContext.next} />
    </Layout>
  );
};

export const query = graphql`
  query($gt: Date!, $lt: Date!) {
    allWordpressPost(
      sort: { fields: [slug], order: ASC }
      filter: { slug: { gt: $gt, lt: $lt } }
    ) {
      edges {
        node {
          id
          title
          featured_media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000, maxHeight: 620, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          slug
          acf {
            date
            open
            start
            adv
            act
          }
        }
      }
    }
  }
`;

const Headline = styled.h1`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 400;
  font-feature-settings: 'palt';

  @media (min-width: 768px) {
    font-size: 1.7rem;
  }
`;

const ContentsWrapper = styled.div`
  margin: 0 auto;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row-reverse;
    width: calc(100% - 100px);
  }
`;

const Main = styled.div`
  @media (min-width: 768px) {
    flex: 1;
    margin-right: 1rem;
  }
`;

const Sidebar = styled.aside`
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;

  @media (min-width: 768px) {
    width: 240px;
    border: none;
    margin: 0;
  }
`;

const CurrentPage = styled.div`
  font-size: 1.4rem;
  word-break: break-all;
  flex: 1;

  @media (min-width: 768px) {
    font-size: 1.7rem;
  }
`;
