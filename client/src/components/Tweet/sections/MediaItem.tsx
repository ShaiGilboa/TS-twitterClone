import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface props {
  style?: React.CSSProperties,
  type: string,
  url: string,
};

const MediaItem : React.FC<PropsWithChildren<props>> = ({type, url}) => {
  switch (type) {
    case 'img':
      return <Image src={url} />
    default:
      return <p>error</p>
  }
}

export default MediaItem;

const Image = styled.img`
  box-sizing: border-box;
  width: 100%;
  border-radius: 20px;
  padding: 10px;
`;