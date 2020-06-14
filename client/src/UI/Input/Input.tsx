import React from 'react';
import styled from 'styled-components';

interface props {
  backgroundColor : string,
  mainColor: string,
  iconSrc?: string,
  iconAlt?: string,
  clearButton: boolean,
}

interface colorProp {
  color: string,
}

const Input = ({backgroundColor, mainColor, iconSrc, iconAlt, clearButton} : props) => {
  const [term, setTerm] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <Wrapper color={backgroundColor} data-css='search'>
      {iconSrc!==undefined && <Icon src={iconSrc} alt={iconAlt} />}
      <StyledInput 
        color={mainColor}
        ref={inputRef}
        onFocus={(event)=>{
          event.preventDefault();
        }}
        value={term}
        onChange={(event)=>setTerm(event.target.value)}
      />
      {clearButton && <ClearButton
        color={mainColor}
        onClick={()=>{
          setTerm('');
          if(inputRef !== null && inputRef.current !== null) inputRef.current.focus();
        }}
        style={{display: term.length > 0 ? 'block' : 'none'}}
        >
        X
      </ClearButton>}
    </Wrapper>
  )
}

export default Input;

const Wrapper = styled.div<colorProp>`
  width: 100%;
  height: fit-content;
  background-color: ${(props) => props.color};
  border: solid 1px ${(props) => props.color};
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
const Icon = styled.img`
  height: 10px;
  width: 10px;
  margin: 3px;
`;
const StyledInput = styled.input<colorProp>`
  width: 100%;
  height: 100%;
  border: none;
  background-color:transparent;
  caret-color: ${(props) => props.color};
  padding: 5px;
  &:focus-within  {
    outline:none;
  }
`;

const ClearButton = styled.button<colorProp>`
  border: none;
  background-color: ${(props) => props.color};
  font-weight: bold;
  text-align: bottom;
  margin: 0;
  padding: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 5px;
`;