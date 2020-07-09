import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

interface props {
  style?: React.CSSProperties,
  
};

const MobileComposeTweet : React.FC<PropsWithChildren<props>> = () => {

  const user = useSelector((state : RootState) => state.user)
  console.log('user', user)
  return (
    <Wrapper data-css='MobileComposeTweet'>
      MobileComposeTweet
    </Wrapper>
  )
}

export default MobileComposeTweet;

const Wrapper = styled.div`

`;