import React from 'react';
import styled from 'styled-components';

interface props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>,
  Title: string
}

const MenuItem : React.FunctionComponent<props>= ({Icon, Title}: props) : JSX.Element=> {

  return (
    <Wrapper>
      <Icon />
      <MenuItemTitle>
        {Title}
      </MenuItemTitle>
    </Wrapper>
  )
}

export default MenuItem;

const Wrapper = styled.div`
  margin: 5px 0;
  height: 30px;
  display: flex;
  align-items: center;
`;

const MenuItemTitle = styled.p`
  margin: 0;
  padding: 0;
  margin-left: 10px;
`;