import styled from "styled-components";
import { Form } from 'antd';

export const ProjectDetailWrapper = styled.div`
  height: 100%;
  padding: 24px 40px 0;
  display: flex;
  flex-direction: column;
  .sprintHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    > h1 {
      font-size: 24px;
      font-weight: 500;
    }
    .sprintOption {
      display: flex;
      align-items: center;
      height: 100%;
      gap: 8px;
      > button {
        height: 32px;
      }
      .ant-btn-default {
        padding: 8px;
        background-color: #091E420F;
      }
    }
  }
  .searchAndFilterNav {
    display: flex;
    align-items: center;
    margin-top: 16px;
    gap: 16px;
    .ant-input-outlined {
      width: 200px;
      height: 32px;
    }
    .listUser {
      display: flex;   
    }
  }
  .TasksWrapper {
    margin-top: 24px;
    overflow-x: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-bottom: 24px;
    .tasksWrapper {
      flex: 1;
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }
  }
`

export const UserItem = styled.div`
  padding: 2px;
  border: 2px solid;
  background-color: white;
  margin-right: -10px;
  border-radius: 50%;
  z-index: ${props => props.is_select ? 2 : 1};
  border-color: ${props => props.is_select ? '#EC1C2A' : 'transparent'};
  &:hover {
    cursor: pointer;
    z-index: 2;
  }
`

export const FormEditSprint = styled(Form) `
  .note {
    color: var(--text-disabled);
    span {
      color: red;
    }
  }
  input {
    max-width: 248px;
  }
  .ant-picker {
    max-width: 248px;
    width: 100%;
  }
`