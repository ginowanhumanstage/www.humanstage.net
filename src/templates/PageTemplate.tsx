import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import gql from 'graphql-tag';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PageContent from '../components/pageContent';
import withPreview from '../components/withPreview';

type Props = {
  data: any;
  preview: any;
};
const PageTemplate = (props: Props) => {
  /**
   * Determine if we're looking at a preview or live page.
   */
  const postData = props.preview
    ? props.preview.pageBy.revisions.nodes[0]
    : props.data.wpPage;

  return (
    <Layout>
      <SEO title={postData.title} />
      <Headline>{postData.title}</Headline>
      <PageContent data={postData} />
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
    }
  }
`;

// この query は gatsby 経由ではなく直接 WP へのリクエストへ用いる。
const PREVIEW_QUERY = gql`
  query getPreview($id: Int!) {
    pageBy(pageId: $id) {
      title
      revisions(first: 1) {
        nodes {
          id
          title
          content
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

export default withPreview({ preview: PREVIEW_QUERY })(PageTemplate);
