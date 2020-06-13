import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from "../../assets/logo.svg";
const Sidebar = () => {

  return (
    <Wrapper>
      Sidebar
      <div style={{width: '100px', height: '100px'}}>
      <Logo/>
      </div>
    </Wrapper>
  )
}

export default Sidebar;

const Wrapper = styled.div`

`