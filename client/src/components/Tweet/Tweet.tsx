import React, { PropsWithChildren } from 'react';
import { MediaType, DenormalizedTweet, UserProfileType} from '../../types/tweets'
import styled from 'styled-components';

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
        <DisplayName>{author.displayName}</DisplayName>
        <Handle>@{author.authorHandle}</Handle>
        <Time>{sortedTimestamp}</Time>
        <Content>
          {status}
          {media && <div>{media}</div>}
        </Content>
        <Footer>
          isLiked:{isLiked}
          numLikes:{numLikes}
          numRetweets:{numRetweets}
          isRetweeted:{isRetweeted}
          {/* retweetFrom:{retweetFrom} */}
        </Footer>
      Tweet
    </Wrapper>
  )
}

export default Tweet;

const Wrapper = styled.div`
  display: grid;
  /* flex-direction: column; */
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-template-areas:
    'retweet retweet retweet retweet'
    'Avatar displayName handle time'
    'Avatar content content content'
    'Avatar footer footer footer';
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
`

const Retweet = styled.div`
  grid-area: retweet;
  width: 100%;
  height: fit-content;
`

const Avatar = styled.img`
  grid-area: Avatar;
`

const DisplayName = styled.h2`
  grid-area: displayName;
`;

const Handle = styled.h3`
  grid-area: handle;
`

const Time = styled.p`
  grid-area: time;
`

const Content = styled.div`
  grid-area: content;
`

const Footer = styled.div`
  grid-area: footer;
`