import React from 'react';
import styled from 'styled-components';

interface IProps {
  data: any;
}

export default (props: IProps) => {
  return (
    <PageSection>
      <Content dangerouslySetInnerHTML={{ __html: props.data.content }} />
    </PageSection>
  );
};

const PageSection = styled.div`
  background-color: #fff;
  width: calc(100% - 30px);
  margin: 0 auto;
  @media (min-width: 768px) {
    width: calc(100% - 100px);
  }
`;

const Content = styled.div`
  padding: 0.75rem;
  line-height: 1.7;
  border: 1px solid #ddd;
  box-sizing: border-box;
  h2 {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 400;
    font-feature-settings: 'palt';
    @media (min-width: 768px) {
      font-size: 1.7rem;
    }
  }
  p {
    font-size: 1rem;
    & img {
      width: 100%;
      height: auto;
    }
    &.has-drop-cap {
      &::first-letter {
        font-size: 2.2rem;
        background-color: #ff2151;
        color: #fff;
        float: left;
        margin: 0 0.5rem 0 0;
        padding: 10px;
        line-height: 1;
      }
    }
  }
  hr {
    border: none;
    border-top: 1px dashed #888;
  }
  ul {
    li {
      font-size: 1rem;
    }
  }
  table {
    font-size: 1rem;
    border: none;
    td {
      border: none;
    }
  }
  .iframeWrap {
    position: relative;
    width: 100%;
    padding-top: 100%;
    iframe {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }
  .wp-block-gallery {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    max-width: 100%;
    .blocks-gallery-item {
      margin: 0 16px 16px 0;
      width: calc((100% - 16px) / 2);
      position: relative;
      &:last-child {
        margin-right: 0;
      }
      figure {
        margin: 0;
        line-height: 0;
        img {
          width: 100%;
        }
      }
      figcaption {
        position: absolute;
        bottom: 0;
        width: 100%;
        max-height: 100%;
        overflow: auto;
        line-height: 1.6;
        margin: 0;
        padding: 0.5rem;
        text-align: center;
        box-sizing: border-box;
        color: #fff;
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.7),
          rgba(0, 0, 0, 0.3) 60%,
          transparent
        );
      }
    }
    &.columns-1 {
      .blocks-gallery-item {
        width: 100%;
        margin-right: 0;
      }
    }
    &.columns-3 {
      .blocks-gallery-item {
        width: calc((100% - 32px) / 3);
        &:nth-child(3) {
          margin-right: 0;
        }
      }
    }
  }
  > .alignleft {
    float: left;
    margin-top: 0;
    margin-left: 0;
    margin-right: calc(2 * 1rem);
    max-width: calc(4 * (100vw / 12));
  }
  > .alignright {
    float: right;
    margin-top: 0;
    margin-right: 0;
    margin-left: calc(2 * 1rem);
    max-width: calc(4 * (100vw / 12));
  }
  @media (min-width: 768px) {
    padding: 1rem 1.5rem;
    .iframeWrap {
      padding-top: 33.33%;
    }
  }
`;
