import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoSrc } from "../../assets/logo.svg";
import Search from './Search';
import { COLORS, MEDIA_GATES } from '../../constants';

interface props {
  style?: React.CSSProperties,
  className?: string,
}

const Topbar : React.FC<PropsWithChildren<props>> = () => {

  return (
    <Wrapper data-css="Topbar">
      <Logo>
        <LogoSrc style={{fill:`${COLORS.main}`}} />
      </Logo>
      Topbar
      <Search title='test' style={{flex:'1'}}/>
    </Wrapper>
  )
}

export default Topbar;

const Wrapper = styled.div`
  box-sizing: border-box;
  grid-area: Topbar;
  display: flex;
  align-items: center;
  padding: 5px;
`;

const Logo = styled.div`
  fill: ${COLORS.main};
  width: 40px;
  height: 40px;

  @media (min-width: ${MEDIA_GATES.tablet}) {
    display: none;
  }
`;