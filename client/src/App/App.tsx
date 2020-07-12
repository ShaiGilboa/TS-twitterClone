import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
  } from 'react-router-dom';

import Infobar from '../components/Infobar';
import Topbar from '../components/Topbar';
import { MEDIA_GATES, SIZES } from '../constants';
import GlobalStyle from '../GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import { setUserHomeFeed, setUserProfile } from '../Redux/actions';
import HomeFeed from '../pages/HomeFeed';
import ComposeTweet from '../pages/ComposeTweet';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state : RootState) => state.user)
  useEffect(()=>{
    fetch('/api/feed/treasurymog/home-feed')
      .then(res=>res.json())
      .then(res=>{
        console.log('res feed', res)
        dispatch(setUserHomeFeed(res.data))
      })
      .catch(err => console.log('err in feed', err))
    fetch('/api/profile/treasurymog/get')
      .then(res => res.json())
      .then(res => {
        console.log('res profile', res)
        dispatch(setUserProfile(res.data))
      })
  },[])

  return (
    <GridContainer>
      <Router>
        <GlobalStyle />
        <Topbar />
        <Infobar />
        <Switch>
          <Route path='/' exact>
            <HomeFeed />
          </Route>
          <Route path='/compose' exact>
            <ComposeTweet />
          </Route>
        </Switch>
      </Router>
    </GridContainer>
  );
}

export default App;

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: ${SIZES.Topbar} auto ${SIZES.Topbar};
  grid-template-areas:
  "Topbar"
  "feed"
  "Infobar"
  ;

  @media (min-width: ${MEDIA_GATES.tablet}) {
  grid-auto-columns: 1fr 3fr 1fr;
  grid-template-rows: ${SIZES.Topbar} auto ;
  grid-template-areas:
  "empty Topbar extra"
  "Infobar feed extra"
  "none feed extra";
  }

  @media (min-width: ${MEDIA_GATES.desktop}) {

  }
`;

const Extra = styled.div`
  display: none;
  grid-area: 'extra';

  @media (min-width: ${MEDIA_GATES.tablet}) {
    display: block;
  }
`