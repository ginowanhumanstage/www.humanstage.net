import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import LiveItem from './liveItem';

// interface IProps {
//   data: Event[];
// }

export default ({ data }) => {
  function dateFormat(date: string): string {
    const dates = date.split('/');
    const year = dates[2];
    const month = dates[1];
    const day = dates[0];

    return `${year}/${month}/${day}`;
  }

  return (
    <LiveItems>
      {data.allWordpressPost.edges.map(({ node }) => {
        const path = dateFormat(node.acf.date);

        return (
          <StyledLink
            to={`/schedule/${path}`}
            title={`${node.title}の詳細を見る`}
            key={node.id}
          >
            <LiveItem isDetail={false} data={node} />
          </StyledLink>
        );
      })}
    </LiveItems>
  );
};

const LiveItems = styled.div`
  margin: 1rem auto;
  width: calc(100% - 30px);

  a {
    &:hover {
      img {
        transform: scale(1.02);
        transition: transform 400ms ease-in-out;
      }
    }
  }

  &:empty {
    text-align: center;
    font-size: 0.8rem;

    &::after {
      content: 'ライブ情報は現在準備中です。';
    }
  }

  @media (min-width: 768px) {
    width: calc(100% - 100px);
  }
`;

const StyledLink = styled(props => <Link {...props} />)`
  text-decoration: none;
  color: inherit;
`;
