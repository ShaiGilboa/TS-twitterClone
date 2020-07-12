import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../Redux/store';
import { userState } from '../../Redux/reducers/types';

interface props {
  style?: React.CSSProperties,
  
};

const Mobile : React.FC<PropsWithChildren<props>> = () => {
  const user : userState = useSelector((state : RootState) => state.user)
  return (
    <Wrapper data-css='Mobile'>
      Mobile
    </Wrapper>
  )
}

export default Mobile;

const Wrapper = styled.div`

`;