import React from 'react';
import styled from 'styled-components';
import { MEDIA_GATES } from '../../../constants';

interface props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>,
  Title: string
}

const MenuItem : React.FunctionComponent<props>= ({Icon, Title}: props) : JSX.Element=> {

  return (
    <Wrapper>
      <Icon />
      <MenuItemTitle data-title={Title}>
        {/* {Title} */}
      </MenuItemTitle>
    </Wrapper>
  )
}

export default MenuItem;

const Wrapper = styled.li`
  margin: 5px 0;
  height: 30px;
  display: flex;
  align-items: center;
`;

const MenuItemTitle = styled.p`
  margin: 0;
  padding: 0;

  @media (min-width: ${MEDIA_GATES.desktop}){
    margin-left: 10px;
    &::after {
      content: attr(data-title);
    }
  }
`;