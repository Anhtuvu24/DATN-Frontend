import styled from "styled-components";
import { Input } from 'antd';

export const FileDetailContainer = styled.div`
  max-height: 100%;
  width: 100%;
  .ant-splitter {
    max-height: 100%;
  }
`

export const MainContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 24px 12px 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .ant-skeleton-button {
    width: 100% !important;
  }
`

export const NameTask = styled(Input)`
  font-size: 24px;
  font-weight: 500;
`

export const DescriptionWrapper = styled.div`
    > h2 {
      padding-left: 8px;
      font-weight: 600;
      font-size: 16px;
    }
`

export const DescriptionContent = styled.div`
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background-color: #091E420F;
  }
`

export const EditDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
  .main-container {
    margin: unset;
    width: 100%;
    .editor-container {
      .editor-container__editor {
        max-width: 100%;
        max-height: 400px;
        .ck-editor__editable_inline {
          padding: 0 24px;
        }
      }
    }
  }
  .btnsEditWrapper {
    display: flex;
    gap: 8px;
  }
`

export const AttachmentsTaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  > h2 {
    font-size: 16px;
    color: var(--second-text-color);
    font-weight: 600;
    padding-left: 8px;
  }

  .attachmentList {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    padding: 8px;
    
    .ant-skeleton-image {
      width: 140px;
      height: 140px;
    }

    .attachmentAdd {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 140px;
      border: 1px dashed #637381;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

      &:hover {
        background-color: var(--hover-color);
        cursor: pointer;
      }
    }
  }
`

export const ActivityWrapper = styled.div`
  > h2 {
    color: #172B4D;
    font-weight: 500;
    font-size: 16px;
  }
  .typeShow {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-top: 8px;
    .ant-radio-group {
      display: flex;
      gap: 8px;
      .ant-radio-button-wrapper {
        height: 24px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        padding: 0 4px;
        border-radius: 4px;
        border: 1px solid rgb(217, 217, 217);
        &:before {
          display: none;
        }
        span:last-child {
          display: inline-flex;
          align-items: center;
          height: 24px;
        }
      }
      .ant-radio-button-wrapper-checked {
        border-color: var(--main-color);
      }
    }
  }
  .addCommentWrapper {
    display: flex;
    gap: 12px;
    width: 100%;
    margin-top: 24px;
    .blockAvatar {
      display: flex;
      height: 100% !important;
    }
    .ant-form {
      flex: 1;
      > div:first-child {
        margin-bottom: 12px;
      }
    }
    > .ant-skeleton {
      width: 100%;
    }
  }
  .listCommentWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
  }
`

export const MentionLabelWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`



