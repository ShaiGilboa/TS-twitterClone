import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface props {
  style?: React.CSSProperties,
  isLiked: boolean,
  numLikes: number,
  numRetweets: number,
  isRetweeted: boolean,
};

const Actions : React.FC<PropsWithChildren<props>> = ({ isLiked, isRetweeted, numLikes, numRetweets, children }) => {

  return (
    <Wrapper data-css='Actions'>
      isLiked:{isLiked}
      numLikes:{numLikes}
      numRetweets:{numRetweets}
      isRetweeted:{isRetweeted}
    </Wrapper>
  )
}

export default Actions;

const Wrapper = styled.div`
  grid-area: actions;
  display: flex;
  justify-content: space-around;
`;