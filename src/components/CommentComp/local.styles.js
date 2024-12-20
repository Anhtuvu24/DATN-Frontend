import styled from "styled-components";

export const CommentItemWrapper = styled.div`
  display: flex;
  gap: 12px;
  background-color: ${props => props.isCommentSelect ? '#F1F2F4' : 'unset'};
  padding: 8px;
  border-radius: 8px;
  .commentWrapper {
    width: 100%;
    .headerComment {
      display: flex;
      gap: 12px;
      > p {
        font-size: 14px;
      }
      .userName {
        color: var(--second-text-color);
        font-weight: 500;
      }
      .timeCreated {
        color: var(--disable-color);
      }
    }
    .bodyComment {
      margin-top: 8px;
      .ant-form {
        width: 100%;
        > div:first-child {
          margin-bottom: 12px;
        }
      }
      .mentionItem {
        background-color: #091E420F;
        padding: 4px 8px;
        border-radius: 500px;
        &:hover {
          background-color: #091E4224;
          cursor: pointer;
        }
      }
      > .ant-skeleton {
        width: 100%;
      }
    }
    .footer {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      font-weight: 500;
      color: #44546F;
      > p {
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
`