import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import SEO from '../components/seo';

import baseImg from '../images/img-base.jpg';

export default ({ pageContext }) => {
  return (
    <Layout lastSchedule={pageContext.lastSchedule}>
      <SEO title="" />

      { /* Tweet 埋め込みようの script */}
      <Helmet>
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
      </Helmet>

      <TwitterCard>
        <blockquote className="twitter-tweet"><p lang="ja" dir="ltr">ヒューマンステージからのお知らせ！ <a href="https://t.co/FLdCFA4Sdj">pic.twitter.com/FLdCFA4Sdj</a></p>&mdash; 山田さん (@HumanStage) <a href="https://twitter.com/HumanStage/status/1270614616658202624?ref_src=twsrc%5Etfw">June 10, 2020</a></blockquote>
      </TwitterCard>

      <CampfireLink>
        <p>
          本当にたくさんのご支援ありがとうございます！<br />
          NEXT HUMAN STAGE の詳細は9月に公表できる予定です。<br />
          ご期待ください！
        </p>
        {/* @ts-ignore: loading="lazy" への型エラーを抑制 */}
        <iframe frameBorder="0" height="365" scrolling="no" src="https://camp-fire.jp/projects/298923/widget" width="245" loading="lazy" />
      </CampfireLink>
      <BaseLink>
        <a href="https://humanstage.thebase.in/" target="_blank"><img src={baseImg} alt="Human Stage 応援サイト" /></a>
      </BaseLink>
    </Layout>
  );
};

const BaseLink = styled.p`
　text-align: center;
  display: block;
  width: calc(100% - 30px);
  margin: 0 auto;
`;

const CampfireLink = styled.div`
  text-align: center;
  display: block;
  width: calc(100% - 30px);
  margin: 2rem auto 2rem;

  > p {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.4;
  }
`;

const TwitterCard = styled.div`
  margin: 0 auto 1.5rem;
  width: calc(100% - 30px);

  > .twitter-tweet {
    margin: 0 auto;
  }
`;
