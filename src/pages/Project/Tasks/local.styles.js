import styled from "styled-components";

export const TasksWrapper = styled.div`
  background-color: #F5F6F9;
  box-shadow: 0px 12px 24px -4px #919EAB1F;
  box-shadow: 0px 0px 2px 0px #919EAB33;
  max-width: 282px;
  min-width: 282px;
  padding: 0 8px 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
    //transition: none;
  }
  button {
    display: flex;
    justify-content: flex-start;
    font-weight: 500;
    color: var(--second-text-color);
  }
`