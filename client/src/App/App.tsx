import React from 'react';
import styled from 'styled-components';
import Infobar from '../components/Infobar';
import Topbar from '../components/Topbar';
import { MEDIA_GATES, SIZES } from '../constants';
import GlobalStyle from '../GlobalStyle';

const App = () => {
  

  return (
    <GridContainer>
      <GlobalStyle />
      <Topbar style={{gridArea: 'Topbar'}}/>
      <Content/>
      <Infobar style={{gridArea: 'Infobar'}}/>
      {/* <Extra /> */}
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
  "content"
  "Infobar";
  
  @media (min-width: ${MEDIA_GATES.tablet}) {
  grid-auto-columns: 1fr 3fr 1fr;
  grid-template-rows: ${SIZES.Topbar} auto ;
  grid-template-areas:
  "Infobar Topbar extra"
  "Infobar content extra"
  "Infobar content extra";
  }

  @media (min-width: ${MEDIA_GATES.desktop}) {

  }
`;

const Content = styled.div`
  grid-area: content;
`;

const Extra = styled.div`
  display: none;
  grid-area: 'extra';

  @media (min-width: ${MEDIA_GATES.tablet}) {
    display: block;
  }
`