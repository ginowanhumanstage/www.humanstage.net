import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import { format } from 'date-fns';
import LiveItems from '../components/liveItems';

import Layout from '../components/layout';
import SEO from '../components/seo';

export default ({ data }) => {
  const thisMonth = format(new Date(), 'YYYY/MM');

  return (
    <Layout>
      <SEO title="" />
      <Headline>Upcoming Events</Headline>
      <LiveItems data={data} />
      <ButtonWrapper>
        <Link to={`/schedule/${thisMonth}`}>
          <Button>More Schedule</Button>
        </Link>
      </ButtonWrapper>
    </Layout>
  );
};

export const query = graphql`
  query($gte: Date!) {
    allWordpressPost(
      sort: { fields: [slug], order: ASC }
      filter: { slug: { gte: $gte } }
      limit: 4
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

const ButtonWrapper = styled.div`
  text-align: center;
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
