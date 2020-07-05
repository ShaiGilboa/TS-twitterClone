import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { PATHS } from './Paths';

interface props {
  style?: React.CSSProperties,
  size: number,
  kind: keyof typeof PATHS, // this makes sure that kind can only be one of the keys of the object PATHS
};

const TweetActionIcon : React.FC<PropsWithChildren<props>> = ({size = 24, kind}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
      {PATHS[kind]}
    </svg>
)

export default TweetActionIcon;
