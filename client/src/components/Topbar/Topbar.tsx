import React from 'react';
import styled from 'styled-components';
import Search from './Search';

interface props {
  Page: string,
  Arrow?: React.FC<React.SVGProps<SVGSVGElement>>,
}

const Topbar = () => {

  return (
    <Wrapper>
      Topbar
      <Search title='test'/>
    </Wrapper>
  )
}

export default Topbar;

const Wrapper = styled.div`

`;