import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import iconSrc from './assets/icon.png';
import { COLORS } from '../../../constants';
import Input from '../../../UI/Input';
interface props {
  title? : string,
  style? : React.CSSProperties,
}
const Search = ({title} : props) => {
  const [term, setTerm] = React.useState('');
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const submitHandler = (event : React.FormEvent<HTMLFormElement>) : void => {
    event.preventDefault();
  }
  useEffect(()=>{
    console.log('focus', focus)
  },[focus])
  return (
    <Wrapper
      onSubmit={submitHandler}
    >
      {title && <Title>{title}</Title>}
      <StyledInput backgroundColor={COLORS.background} mainColor={COLORS.main} iconSrc={iconSrc} iconAlt={'magnifying-glass'} clearButton={true}
      />
    </Wrapper>
  )
}

export default Search;

const Wrapper = styled.form`
  width: 60%;
  transition: width 0.5s ease-in-out;
  height: fit-content;
  display: flex;
  align-items: center;
  padding: 0 10px;
  &:focus-within {
    width: 100%;
  }
`;

const StyledInput = styled(Input)`
  /* width: 60%; */
  /* &:active{
    flex:1;
  } */
`

const Title = styled.h2`
  margin: 0;
  padding: 0;
`;