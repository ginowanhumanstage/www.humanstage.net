import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LiveItem from '../components/liveItem';
import slugToPath from '../lib/slugToPath';
import Pagination from '../components/pagination';

export default ({ data, pageContext, path }) => {
  const schedulePagePath = path.slice(0, -3);
  const { prev, next } = pageContext;
  const prevPath = prev ? `/schedule/${slugToPath(prev.slug)}` : null;
  const nextPath = next ? `/schedule/${slugToPath(next.slug)}` : null;

  return (
    <Layout>
      <SEO title={data.wpPost.title} />
      <Headline dangerouslySetInnerHTML={{ __html: data.wpPost.title }} />
      <LiveItemWrapper>
        <LiveItem data={data.wpPost} isDetail></LiveItem>
      </LiveItemWrapper>
      <Pagination prev={prevPath} next={nextPath}>
        <ButtonWrapper>
          <Link to={schedulePagePath}>
            <Button>More Schedule</Button>
          </Link>
        </ButtonWrapper>
      </Pagination>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      slug
      content
      acfScuedule {
        act
        adv
        date
        open
        start
      }
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
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

const LiveItemWrapper = styled.div`
  margin: 0 auto;
  width: calc(100% - 30px);
  position: relative;

  @media (min-width: 768px) {
    width: calc(100% - 100px);
  }
`;

const ButtonWrapper = styled.div`
  flex: 1;
`;

const Button = styled.div`
  display: inline-block;
  border: 1px solid #ccc;
  font-size: 1rem;
  text-decoration: none;
  color: #188fd9;
  padding: 0.75rem 2rem;
  background-color: #fff;
  border-radius: 50px;

  &:hover {
    border-color: #ccc;
  }
`;
