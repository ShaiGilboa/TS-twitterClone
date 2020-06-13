import React from 'react';
import styled from 'styled-components';
import icon from './assets/icon.png';
import { COLORS } from '../../../constants';
interface props {
  title? : string,
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
      {title && <h2>{title}</h2>}
      <StyledInputArea data-css='search'>
        <SearchIcon src={icon} alt='magnifying-glass' />
        <StyledInput 
          ref={inputRef}
          onFocus={(event)=>{
            event.preventDefault();
          }}
          value={term}
          onChange={(event)=>setTerm(event.target.value)}
        />
      <ClearButton
        onClick={()=>{
          setTerm('');
          if(inputRef !== null && inputRef.current !== null) inputRef.current.focus();
        }}
        style={{display: term.length > 0 ? 'block' : 'none'}}
        >
        X
      </ClearButton>
      </StyledInputArea>
    </Wrapper>
  )
}

export default Search;

const Wrapper = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledInputArea = styled.div`
  width: 100%;
  height: fit-content;
  background-color: ${COLORS.background};
  border: solid 1px ${COLORS.background};
  border-radius: 10px;
  display: flex;
  align-items: center;
  transition: background-color 0.5s ease;

  button {
    display: none;
  }

  &:focus-within {
    background-color: white;
    button{
      display: block;
    }
  }
`;

const SearchIcon = styled.img`
  height: 10px;
  width: 10px;
  margin: 3px;
`

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color:transparent;
  caret-color: ${COLORS.main};
  padding: 5px;
  &:focus-within  {
    outline:none;
  }
`;

const ClearButton = styled.button`
  border: none;
  background-color: ${COLORS.main};
  font-weight: bold;
  text-align: bottom;
  margin: 0;
  padding: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 5px;
`;