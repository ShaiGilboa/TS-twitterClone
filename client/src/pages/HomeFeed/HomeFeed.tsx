import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState, State } from '../../Redux/store';
import Tweet from '../../components/Tweet';
import { userHomeFeed, userState } from '../../Redux/reducers/types';

const HomeFeed = () => {

  const feed = useSelector<RootState, userHomeFeed | null>(state => state.user.homeFeed)
  useEffect(()=>{
    console.log('feed', feed)
  },[feed])
  return (
    <Wrapper>
      {feed && <Tweet {...feed.tweetsById[feed.tweetIds[0]]}/>}
    </Wrapper>
  )
}

export default HomeFeed;

const Wrapper = styled.div`
  grid-area: feed;
`;