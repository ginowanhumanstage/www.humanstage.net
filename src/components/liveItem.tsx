import React from 'react';
import styled from 'styled-components';
import { getDay, format } from 'date-fns';
import Img from 'gatsby-image';
import loadable from '@loadable/component';

const ShareButton = loadable(() => import('./shareButton'));

const Index = ({ isDetail, data }) => {
  const dates = data.acf.date.split('/');
  const dataTime = new Date(`${dates[2]}/${dates[1]}/${dates[0]}`);

  const dateTime = format(dataTime, 'MM/DD');

  const day = ['日', '月', '火', '水', '木', '金', '土'];
  const weekDay = day[getDay(dataTime)];

  const openTime = new Date(
    `${dates[2]}/${dates[1]}/${dates[0]} ${data.acf.open}`,
  );
  const startTime = new Date(
    `${dates[2]}/${dates[1]}/${dates[0]} ${data.acf.start}`,
  );

  const openDate = format(openTime, 'HH:mm');
  const startDate = format(startTime, 'HH:mm');
  const performers = data.acf.act ? data.acf.act.split(/\n|\r\n|\r/) : null;
  const performer = performers
    ? performers.map((act, i) => {
        return <li key={i}>{act}</li>;
      })
    : null;

  return (
    <LiveItem>
      <MainVisual>
        {data && data.featured_media ? (
          <Img
            fluid={data.featured_media.localFile.childImageSharp.fluid}
            alt=""
          />
        ) : (
          <NoImage>
            <NoImageCaption>HUMAN STAGE</NoImageCaption>
          </NoImage>
        )}
      </MainVisual>
      <Meta>
        <MetaDateTime>
          <span>{dateTime}</span>
          <MetaDateTimeWeek>{weekDay}</MetaDateTimeWeek>
          <MetaDateTimeOpen>OPEN {openDate}</MetaDateTimeOpen>
          <MetaDateTimeStart>START {startDate}</MetaDateTimeStart>
        </MetaDateTime>
      </Meta>
      {!isDetail ? <Title dangerouslySetInnerHTML={{ __html: data.title }} /> : null}
      <Adv isDetail={isDetail}>
        <AdvHeadline>Ticket info</AdvHeadline>
        <AdvContent dangerouslySetInnerHTML={{ __html: data.acf.adv }} />
      </Adv>
      <Cast isDetail={isDetail}>
        <CastHeadline>Cast</CastHeadline>
        <CastContent>{performer}</CastContent>
      </Cast>
      {isDetail ? (
        <Details dangerouslySetInnerHTML={{ __html: data.description }} />
      ) : null}
      {isDetail ? (
        <ShareButtonWrapper>
          <ShareButton title={data.title} />
        </ShareButtonWrapper>
      ) : null}
    </LiveItem>
  );
};

export default Index;

const LiveItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;

  border: 1px solid #bbb;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: #fff;
  text-decoration: none;
  color: inherit;
  overflow: hidden;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 170px 3fr 4fr;
    grid-template-rows: auto auto 1fr;
  }
`;

const MainVisual = styled.div`
  line-height: 0;
  border-bottom: 1px solid #ccc;
  overflow: hidden;

  grid-column: 1 / 3;
  grid-row: 1 / 2;

  .gatsby-image-outer-wrapper,
  .gatsby-image-wrapper {
    height: 100%;
  }

  img {
    width: 100%;
    height: auto;
  }

  @media (min-width: 768px) {
    border: none;
    border-right: 1px solid #ccc;

    grid-column: 2 / 3;
    grid-row: 1 / 4;
  }
`;

const Meta = styled.div`
  padding: 0.5em;
  border-right: 1px solid #ccc;
  box-sizing: border-box;

  grid-column: 1 / 2;
  grid-row: 2 / 3;

  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -30px;
    order: 0;
    width: 170px;

    grid-column: 1 / 2;
    grid-row: 1 / 4;
  }
`;

const MetaDateTime = styled.div`
  text-align: center;
  font-size: 1.4rem;

  @media (min-width: 768px) {
    font-size: 1.6rem;
  }
`;

const MetaDateTimeWeek = styled.div`
  border: 1px solid #000;
  text-align: center;
  font-size: 0.85rem;
  margin: 0.25em auto;
  width: 85px;
  padding: 0.15rem 0;
  box-sizing: border-box;

  @media (min-width: 768px) {
    width: 120px;
    font-size: 1rem;
    margin: 0.25rem auto 0.5rem;
    padding: 0.15rem 0;
  }
`;

const MetaDateTimeOpen = styled.div`
  font-size: 0.85rem;
  margin-top: 0.25em;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const MetaDateTimeStart = styled.div`
  font-size: 0.85rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 0.25rem;

  grid-column: 2 / 3;
  grid-row: 2 / 3;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 768px) {
    display: block;
    font-size: 1.4rem;
    padding: 1.5rem;
    margin: 0;
    border-bottom: 1px solid #ccc;

    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
`;

const Adv = styled.section`
  font-size: 0.85rem;
  white-space: pre-wrap;
  padding: 0.5rem 0.25rem 0.5rem;

  grid-column: ${({ isDetail }) => (isDetail ? '2 / 3' : '1 / 3')};
  grid-row: ${({ isDetail }) => (isDetail ? '2 / 3' : '4 / 5')};

  @media (min-width: 768px) {
    border-top: 1px solid #ccc;
    font-size: 1rem;
    padding: 1.5rem;

    grid-column: ${({ isDetail }) => (isDetail ? '3 / 4' : '3 / 4')};
    grid-row: ${({ isDetail }) => (isDetail ? '2 / 3' : '3 / 4')};
  }
`;

const AdvHeadline = styled.h2`
  font-size: 0.7rem;
  margin: 0;
  font-weight: 400;
  color: #888;
`;
const AdvContent = styled.div``;

const Cast = styled.section`
  border-top: 1px solid #ccc;
  padding: 0.5rem;

  grid-column: 1 / 3;
  grid-row: 3 / 4;

  @media (min-width: 768px) {
    border: none;
    padding: 1.5rem;

    grid-column: ${({ isDetail }) => (isDetail ? '3 / 4' : '3 / 4')};
    grid-row: ${({ isDetail }) => (isDetail ? '1 / 2' : '2 / 3')};
  }
`;

const CastHeadline = styled.h2`
  font-size: 0.7rem;
  margin: 0;
  font-weight: 400;
  color: #888;
`;

const CastContent = styled.ul`
  font-size: 0.85rem;
  white-space: pre-wrap;
  padding: 0;
  list-style: none;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const Details = styled.div`
  font-size: 0.85rem;
  width: 100%;
  padding: 0 0.5rem;
  border-top: 1px solid #ccc;
  box-sizing: border-box;

  grid-column: 1 / 3;
  grid-row: 4 / 5;

  & img {
    max-width: 100%;
    height: auto;
  }

  @media (min-width: 768px) {
    order: 1;
    width: auto;
    font-size: 1rem;
    padding: 0 1rem;

    grid-column: 3 / 4;
    grid-row: 3 / 4;
  }
`;

const ShareButtonWrapper = styled.div`
  grid-column: 1 / 3;
  border-top: 1px solid #ccc;
  padding: 0;
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    position: absolute;
    right: 24px;
    top: 24px;
    background-color: #fff;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
  }
`;

const NoImage = styled.div`
  height: 212px;
  background: #DDD;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    height: 100%;
  }
`;

const NoImageCaption = styled.p`
  line-height: 1.5;
  font-size: 1.6rem;
  color: #AAA;

  @media (min-width: 768px) {
    font-size: 1.6rem;
  }
`;
