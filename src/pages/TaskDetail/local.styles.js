import styled from "styled-components";
import { Input } from 'antd';

export const FileDetailContainer = styled.div`
  height: 100%;
  width: 100%;
`

export const MainContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 24px 12px 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
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
`

export const DetailsWrapper = styled.div`

`