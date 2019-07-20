import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LiveItem from '../components/liveItem';

export default ({ data }) => {
  return (
    <Layout>
      <SEO title={data.wordpressPost.title} />
      <Headline>{data.wordpressPost.title}</Headline>
      <LiveItemWrapper>
        <LiveItem data={data.wordpressPost} isDetail></LiveItem>
      </LiveItemWrapper>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      slug
      acf {
        act
        adv
        date
        open
        start
      }
      featured_media {
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
