import React from 'react';
import styled from 'styled-components';

interface props {
  text? : string,
}

const UnstyledButton : React.FC<props>= ({text, children}) => {

  return (
    <Wrapper>
      {text}
      {children}
    </Wrapper>
  )
}

export default UnstyledButton;

const Wrapper = styled.button`

`