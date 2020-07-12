import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { MEDIA_GATES } from '../../constants';
import Mobile from './Mobile';
import Modal from './Modal';
import { userState } from '../../Redux/reducers/types';

interface props {
  style?: React.CSSProperties,
  
};

const ComposeTweet : React.FC<PropsWithChildren<props>> = () => {

  const user : userState = useSelector((state : RootState) => state.user)
  console.log('user', user)
  return (
    <Wrapper data-css='ComposeTweet'>
    ComposeTweet
    { window.innerWidth < parseInt(MEDIA_GATES.tablet)
    ? (<Mobile />)
    : (<Modal />)  
    }
    </Wrapper>
  )
}

export default ComposeTweet;

const Wrapper = styled.div`

`;