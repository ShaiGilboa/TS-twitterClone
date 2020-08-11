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
  reply = "rgba(27, 149, 224, 0.5)",
  retweet = "rgba(23, 191, 99, 0.5)",
  like = "rgba(224, 36, 94, 0.5)",
  share = "rgba(27, 149, 224, 0.5)",
}


const Actions : React.FC<PropsWithChildren<props>> = ({ isLiked, isRetweeted, numLikes, numRetweets, children }) => {
  const numbers = {
    like: numLikes,
    retweet: numRetweets,
    reply: '',
    share: '',
  }
  return (
    <Wrapper data-css='Actions'>
      {actions.map((action : keyof typeof PATHS, index : number) =>
      <div key={`${index}${action}`}>
        <ActionBtn actionColor={ACTIONS_COLORS[action]} key={`${index}${action}`}
          onClick={()=>console.log('action', action, numLikes, numRetweets)}
        >
          <TweetActionIcon key={index} kind={action} size={24}/>
        </ActionBtn>
      <div>{
        numbers[action]
      // (() => {
      //   switch (action) {
      //     case 'like':
      //       return numLikes;
      //     case 'retweet':
      //       return numRetweets;
      //   }
      // })
      }</div>
      </div>
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
  border-radius: 50%;
  width: 30px;
  height: 30px;
  justify-content: center;
  &:hover{
    background-color: ${props=>props.actionColor}
  }
  svg {
    margin-top: 3px;
  }
`;