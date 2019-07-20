import React from 'react';
import styled from 'styled-components';
import IosShareIcon from 'react-feather/dist/icons/share';
import AndroidShareIcon from 'react-feather/dist/icons/share-2';
import FacebookIcon from 'react-feather/dist/icons/facebook';
import TwitterIcon from 'react-feather/dist/icons/twitter';
import LineIcon from '../images/icon-line.svg';

export default ({ title }) => {
  const userAgent = navigator.userAgent;

  let isIOS = false;
  let isAndroid = false;
  if (/iP(hone|(o|a)d)/.test(userAgent)) {
    isIOS = true;
  } else if (userAgent.indexOf('Android') > 0) {
    isAndroid = true;
  }

  const pageTitle = document.title;
  const url = location.href;

  const shareBtnClickEvent = function(e) {
    e.preventDefault();
    if ((navigator as any).share) {
      (navigator as any)
        .share({
          title: pageTitle,
          text: `${title} のイベント情報です。`,
          url: url,
        })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing', error));
    }
  };

  const fbBtnClickEvent = function(e) {
    e.preventDefault();
    const href = `http://www.facebook.com/sharer.php?u=${url}&amp;t=${pageTitle}`;
    window.open(
      encodeURI(decodeURI(href)),
      'sharewindow',
      'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=!',
    );
  };

  const twBtnClickEvent = function(e) {
    e.preventDefault();

    const href = `http://twitter.com/intent/tweet?text=${pageTitle}&amp;url=${url}&amp;`;
    window.open(
      encodeURI(decodeURI(href)),
      'tweetwindow',
      'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1',
    );
  };

  const lineBtnClickEvent = function(e) {
    e.preventDefault();

    const href = `https://social-plugins.line.me/lineit/share?url=${url}`;
    window.open(
      encodeURI(decodeURI(href)),
      'tweetwindow',
      'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1',
    );
  };

  return (
    <>
      {(isIOS || isAndroid) && (navigator as any).share ? (
        <ShareButton onClick={shareBtnClickEvent}>
          {isIOS ? <IosShareIcon /> : <AndroidShareIcon />}
        </ShareButton>
      ) : (
        [
          <SnsShareButton
            onClick={fbBtnClickEvent}
            key="1"
            title="Facebookでシェア"
          >
            <FacebookIcon />
          </SnsShareButton>,
          <SnsShareButton
            key="2"
            onClick={twBtnClickEvent}
            title="Twitterでシェア"
          >
            <TwitterIcon />
          </SnsShareButton>,
          <SnsShareButton
            key="3"
            onClick={lineBtnClickEvent}
            title="Lineでシェア"
          >
            <img src={LineIcon} width="25" height="auto" />
          </SnsShareButton>,
        ]
      )}
    </>
  );
};

const ShareButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  padding: 0;
  width: 44px;
  height: 44px;
  cursor: pointer;
`;

const SnsShareButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  padding: 0;
  width: 44px;
  height: 44px;
  color: inherit;
  cursor: pointer;
`;
