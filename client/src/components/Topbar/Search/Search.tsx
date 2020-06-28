import React from 'react';
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const submitHandler = (event : React.FormEvent<HTMLFormElement>) : void => {
    event.preventDefault();
    console.log(term)
  }

  return (
    <Wrapper
      onSubmit={submitHandler}
    >
      {title && <Title>{title}</Title>}
      <Input backgroundColor={COLORS.background} mainColor={COLORS.main} iconSrc={iconSrc} iconAlt={'magnifying-glass'} clearButton={true}/>
    </Wrapper>
  )
}

export default Search;

const Wrapper = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
`;