import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoSrc } from "../../assets/logo.svg";
import {ReactComponent as HomeIcon} from '../../assets/MenuIcons/Home.svg';
import {ReactComponent as ProfileIcon} from '../../assets/MenuIcons/Profile.svg';
import { COLORS, MEDIA_GATES, SIZES } from '../../constants';
import MenuItem from './MenuItem/MenuItem';
import UnstyledButton from '../../UI/UstyledButton';

interface props {
  style?: React.CSSProperties,
  className?: string,
};

const Infobar : React.FC<PropsWithChildren<props>>= () => {

  return (
    <Wrapper data-css="Infobar">
      <Logo>
        <LogoSrc style={{fill:COLORS.main}}/>
      </Logo>
      <Menu>
        <MenuItem Icon={HomeIcon} Title='Home' />
        <MenuItem Icon={ProfileIcon} Title='Profile' />
      </Menu>
      <HopButton>
        Hop
      </HopButton>
    </Wrapper>
  )
}

export default Infobar ;

const Wrapper = styled.div`
  box-sizing: border-box;
  border-top: 2px solid ${COLORS.border};
  grid-area: Infobar;
  height: 100%;
  display: flex;
  padding: 5px;
  align-items: center;
  @media (min-width: ${MEDIA_GATES.tablet}) {
    flex-direction: column;
    width: 100px;
    padding: 10px 10px;
    margin: 0 0 0 auto;
    height: fit-content;
    /* justify-content: right; */
    /* margin: 0 0 0 auto; */

  }
`;

const Menu = styled.ul`
  height: fit-content;
  display: flex;
  
  /* justify-content: start; */
  justify-content: space-around;
  flex: 2;
  @media (min-width: ${MEDIA_GATES.tablet}) {
    flex-direction: column;
    /* justify-content: end; */
    /* background-color: red; */
    margin: 0 auto 0 auto;
    & > li {
      padding: 10px 0;
    }
  }

  @media (min-width: ${MEDIA_GATES.desktop}) {
    margin: 0 auto 0 0;
    width: 100%;
  }
`;

const HopButton = styled(UnstyledButton)`
  margin: 5px;
  padding: 3px 0;
  width: 100%;
  border-radius: 15px;
  max-height: ${SIZES.item};
  background-color: ${COLORS.main};
  color: ${COLORS.text};
  flex: 1;
  &:focus-within  {
    outline:none;
  }

  @media (min-width: ${MEDIA_GATES.tablet}) {
    /* flex-direction: column; */
    /* justify-content: center; */
    /* background-color: red; */
    margin: 0 auto 0 auto;
    width: ${SIZES.item}
  }

  @media (min-width: ${MEDIA_GATES.desktop}) {
    /* flex-direction: column; */
    /* justify-content: end; */
    /* background-color: red; */
    margin: 0 0 0 auto;
    width: 100%;
  }
`;

const Logo = styled.div`
  fill: ${COLORS.main};
  display: none;

  @media (min-width: ${MEDIA_GATES.tablet}) {
    display: block;
    width: 40px;
    height: 40px;
    margin: 0 auto 0 auto;
  }

  @media (min-width: ${MEDIA_GATES.desktop}) {
    /* flex-direction: column; */
    /* justify-content: end; */
    /* background-color: red; */
    margin: 0 auto 0 0;
    /* width: 100%; */
  }
`;