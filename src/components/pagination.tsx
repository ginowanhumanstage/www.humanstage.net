import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import LeftIcon from 'react-feather/dist/icons/chevron-left';
import RightIcon from 'react-feather/dist/icons/chevron-right';

interface IProps {
  pageData?: any;
}

const Index: React.SFC<IProps> = ({ pageData }) => {
  const { current, next, prev } = pageData;

  return (
    <Pagination>
      {prev ? (
        <Link to={prev}>
          <LeftIcon />
        </Link>
      ) : (
        <div />
      )}

      <CurrentPage>
        {current.year}/{current.month}
      </CurrentPage>

      {next ? (
        <Link to={next}>
          <RightIcon />
        </Link>
      ) : (
        <div />
      )}
    </Pagination>
  );
};

export default Index;

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

const CurrentPage = styled.div`
  font-size: 1.4rem;

  @media (min-width: 768px) {
    font-size: 1.7rem;
  }
`;
