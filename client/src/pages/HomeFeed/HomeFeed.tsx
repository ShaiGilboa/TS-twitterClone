import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState, State } from '../../Redux/store';
import Tweet from '../../components/Tweet';
import { userHomeFeed, userState } from '../../Redux/reducers/types';

const HomeFeed = () => {

  const feed = useSelector<RootState, userHomeFeed | null>(state => state.user.homeFeed)

  return (
    <Wrapper>
      {feed && feed.tweetIds.map(id => <Tweet key={id} {...feed.tweetsById[id]}/>)}
    </Wrapper>
  )
}

export default HomeFeed;

const Wrapper = styled.div`
  grid-area: feed;
  overflow-y: auto;
`;