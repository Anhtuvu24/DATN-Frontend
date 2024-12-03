import styled from "styled-components";
import { Form, Upload } from 'antd';

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
      > div {
        height: 100%;
      }
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
  .uploadWrapper {
    .ant-upload {
      width: 100%;
      height: 100%;
    }
  }
`

export const FormCreateTask = styled(Form) `
  .note {
    color: var(--text-disabled);
    span {
      color: red;
    }
  }
  .ant-picker {
    width: 100%;
  }
  .uploadWrapper {
    .ant-upload {
      width: 100%;
      height: 150px;
    }
  }
`

export const UploadAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px dashed #000;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  color: var(--second-text-color);
`

export const ListFileWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px dashed #000;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  gap: 8px;
  font-weight: 500;
  color: var(--second-text-color);
  overflow-y: auto;
`

export const SelectOptionItem = styled.div`
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
  }
`