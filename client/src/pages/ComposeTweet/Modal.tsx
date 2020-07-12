import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface props {
  style?: React.CSSProperties,
  
};

const Modal : React.FC<PropsWithChildren<props>> = () => {

  return (
    <Wrapper data-css='Modal'>
      Modal
    </Wrapper>
  )
}

export default Modal;

const Wrapper = styled.div`

`;