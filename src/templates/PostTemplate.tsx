import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import LeftIcon from 'react-feather/dist/icons/chevron-left';
import RightIcon from 'react-feather/dist/icons/chevron-right';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LiveItem from '../components/liveItem';
import slugToPath from '../lib/slugToPath';

export default ({ data, pageContext, path }) => {
  const schedulePagePath = path.slice(0, -3);
  const { prev, next } = pageContext;

  return (
    <Layout>
      <SEO title={data.wordpressPost.title} />
      <Headline>{data.wordpressPost.title}</Headline>
      <LiveItemWrapper>
        <LiveItem data={data.wordpressPost} isDetail></LiveItem>
      </LiveItemWrapper>
      <Pagination>
        {prev ? (
          <Link to={`schedule/${slugToPath(prev.slug)}`} rel="prev">
            <LeftIcon />
          </Link>
        ) : (
          <div />
        )}

        <ButtonWrapper>
          <Link to={schedulePagePath}>
            <Button>More Schedule</Button>
          </Link>
        </ButtonWrapper>

        {next ? (
          <Link to={`schedule/${slugToPath(next.slug)}`} rel="next">
            <RightIcon />
          </Link>
        ) : (
          <div />
        )}
      </Pagination>
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

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.25rem;
  margin: 1rem 0;

  > a,
  > div {
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0 linear;
    color: inherit;

    &:hover {
      transition-duration: 100ms;
    }

    &:first-child {
      &:hover,
      &:focus {
        transform: translateX(-5px);
      }
    }

    &:last-child {
      &:hover,
      &:focus {
        transform: translateX(5px);
      }
    }
  }

  @media (min-width: 768px) {
    padding: 0 1rem;
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
