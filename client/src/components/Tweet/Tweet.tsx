import React, { PropsWithChildren } from 'react';
import { MediaType, DenormalizedTweet, UserProfileType} from '../../types/tweets'
import styled from 'styled-components';
import MediaItem from './sections/MediaItem';
import Actions from './sections/Actions';

interface props {
  id: string,
  author?: UserProfileType,
  timestamp: string,
  sortedTimestamp: string,
  retweetOf? : string, //original tweet id
  retweetFrom? : UserProfileType,
  isLiked: boolean,
  numLikes: number,
  numRetweets: number,
  isRetweeted: boolean,
  status?: string,
  media?: MediaType[],
};
const Tweet : React.FC<PropsWithChildren<DenormalizedTweet>> = ({
  id,
  author,
  timestamp,
  sortedTimestamp,
  retweetOf, //original tweet id
  retweetFrom,
  isLiked,
  numLikes,
  numRetweets,
  isRetweeted,
  status,
  media,
}) => {
  return (
    <Wrapper>
        <Avatar src={author.avatarSrc} alt={`${author.authorHandle}-image`} />
        <Info>
          <DisplayName>{author.displayName}</DisplayName>
          <Handle>@{author.authorHandle}</Handle>
          <Time>{sortedTimestamp}</Time>
        </Info>
        <Content>
          {status} 
          {media && <div>{media.map(item=><MediaItem key={item.url} {...item}/>)}</div>}
        </Content>
        <Actions
          isLiked={isLiked}
          numLikes={numLikes}
          numRetweets={numRetweets}
          isRetweeted={isRetweeted}
        />
    </Wrapper>
  )
}

export default Tweet;

const Wrapper = styled.div`
  display: grid;
  grid-auto-columns: 55px min-content min-content auto;
  grid-auto-rows: 15px max-content 30px;
  grid-template-areas:
    'Avatar Info Info Info'
    'Avatar content content content'
    'Avatar actions actions actions';
  width: 100%;
  height: fit-content;
  padding: 10px;
  box-sizing: border-box;  
`

const Info = styled.div`
  grid-area: Info;
  display: flex;
  
`

const Retweet = styled.div`
  grid-area: retweet;
  width: 100%;
  height: fit-content;
`

const Avatar = styled.img`
  grid-area: Avatar;
  box-sizing: border-box;
  width: 100%;
  border-radius: 50%;
  padding: 7px;
`

const DisplayName = styled.h2`
  grid-area: displayName;
  padding: 0 5px;
`;

const Handle = styled.h3`
  grid-area: handle;
  padding: 0 5px;
`

const Time = styled.p`
  grid-area: time;
`

const Content = styled.div`
  grid-area: content;
  height: fit-content;
  padding: 5px;
`