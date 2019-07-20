import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PageContent from '../components/pageContent';

export default ({ data }) => {
  return (
    <Layout>
      <SEO title={data.wordpressPage.title} />
      <Headline>{data.wordpressPage.title}</Headline>
      <PageContent data={data.wordpressPage} />
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
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
