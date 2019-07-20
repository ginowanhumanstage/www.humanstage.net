import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { format } from 'date-fns';

import logo from '../images/logo.png';

export default () => {
  const thisMonth = format(new Date(), 'YYYY/MM');

  return (
    <Footer>
      <SiteInfo>
        <SiteInfoLogo>
          <Link to="/">
            <p>
              <img src={logo} alt="宜野湾 Human Stage" />
            </p>
          </Link>
        </SiteInfoLogo>
        <Menu>
          <li>
            <Link to={`/schedule/${thisMonth}`}>Schedule</Link>
          </li>
          <li>
            <Link to="/party">Party Plan</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/access">Access</Link>
          </li>
          <li>
            <Link to="/system">System</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </Menu>
        <SiteInfoAddress>
          <p>
            沖縄県宜野湾市長田1-11-1
            <br />
            〒901-2212
          </p>
          <p>
            TEL : 098-893-3060
            <br />
            Mail : human-s@nirai.ne.jp
          </p>
        </SiteInfoAddress>
      </SiteInfo>
      <Copyright>
        <p>© HUMAN STAGE.</p>
      </Copyright>
    </Footer>
  );
};

const Footer = styled.footer`
  background-color: #fff;
  margin-top: 3rem;
  border-top: 1px solid #ddd;
  padding: 0;

  @media (min-width: 768px) {
    padding: 0 0.5rem 0.5rem;
  }
`;

const SiteInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const SiteInfoLogo = styled.div`
  a {
    display: inline-block;
  }
  p {
    padding: 0.75rem 1rem;
    width: 120px;

    img {
      width: 100%;
      height: auto;
    }

    @media (min-width: 768px) {
      width: 240px;
      padding: 1rem;
    }
  }
`;

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  max-width: calc(100% - 2rem);
  margin: 0 auto;

  li {
    font-size: 1rem;
    line-height: 1.5;

    &:not(:last-child) {
      margin-right: 1rem;
    }

    a {
      color: #188fd9;

      &:hover {
        text-decoration: none;
      }
    }
  }

  @media (min-width: 768px) {
    margin: 0 0 0 2rem;
    align-items: center;

    li {
      &:not(:last-child) {
        margin-right: 1.5rem;
      }
      a {
        color: #333;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const SiteInfoAddress = styled.div`
  font-size: 0.75rem;
  padding: 0 1rem;

  @media (min-width: 768px) {
    font-size: 1rem;
    width: 100%;
  }
`;

const Copyright = styled.div`
  padding: 0 1rem;
  font-size: 0.75rem;
  text-align: center;
`;
