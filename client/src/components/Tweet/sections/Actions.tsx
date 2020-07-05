import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import TweetActionIcon from '../../../assets/TweetActionsIcons.ts';
import { PATHS } from '../../../assets/TweetActionsIcons.ts/Paths';
import UnstyledButton from '../../../UI/UstyledButton';

interface props {
  style?: React.CSSProperties,
  isLiked: boolean,
  numLikes: number,
  numRetweets: number,
  isRetweeted: boolean,
};

const actions : (keyof typeof PATHS)[] = ['reply', 
'retweet', 
// 'share', 
'like']

enum ACTIONS_COLORS {
  reply = "rgb(27, 149, 224)",
  retweet = "rgb(23, 191, 99)",
  like = "rgb(224, 36, 94)",
  share = "rgb(27, 149, 224)",
}
const Actions : React.FC<PropsWithChildren<props>> = ({ isLiked, isRetweeted, numLikes, numRetweets, children }) => {

  return (
    <Wrapper data-css='Actions'>
      {actions.map((action : keyof typeof PATHS, index : number) =>
        <ActionBtn actionColor={ACTIONS_COLORS[action]}>
          <TweetActionIcon key={index} kind={action} size={24}/>
        </ActionBtn>
        )}
    </Wrapper>
  )
}

export default Actions;

const Wrapper = styled.div`
  grid-area: actions;
  display: flex;
  justify-content: space-around;
`;

const ActionBtn = styled<any>(UnstyledButton)`
  &:hover{
    background-color: ${props=>props.actionColor}
  }
`;