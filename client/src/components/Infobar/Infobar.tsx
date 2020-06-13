import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from "../../assets/logo.svg";
import {ReactComponent as HomeIcon} from '../../assets/MenuIcons/Home.svg';
import {ReactComponent as ProfileIcon} from '../../assets/MenuIcons/Profile.svg';
import { COLORS } from '../../constants';
import MenuItem from './MenuItem/MenuItem';

const Infobar = () => {

  return (
    <Wrapper>
      <div style={{width:'40px'}}>
        <Logo style={{fill:COLORS.main}}/>
      </div>
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
  height: 100%;
  width: 100px;
  padding: 10px 10px;
  margin: 0;
`;

const Menu = styled.div`
  height: 100%;
`;

const HopButton = styled.button`
  margin: 5px;
  width: 100%;
  border-radius: 15px;
  background-color: ${COLORS.main};
  color: ${COLORS.text};
  &:focus-within  {
    outline:none;
  }
`;