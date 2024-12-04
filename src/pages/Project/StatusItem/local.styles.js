import styled from "styled-components";

export const StatusItemWrapper = styled.div`
  max-width: 282px;
  min-width: 282px;
  padding: 16px;
  background-color: var(--second-background-color);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: ${props => (props.isScrolled ? '0px 4px 2px -2px gray' : 'none')};
  > p {
    font-size: 12px;
    font-weight: 600;
    color: #626F86;
    text-transform: uppercase;
  }
`