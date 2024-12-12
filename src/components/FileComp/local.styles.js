import styled from "styled-components";

export const FileCompWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    border-radius: 8px;
    overflow: hidden;

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);

      .removeBtn, .downloadBtn {
        display: flex;
      }
    }

    .ant-image {
      height: 100%;
      display: flex;
      align-items: center;

      img {
        max-width: 100%;
      }
      .ant-image-mask {
        z-index: 1;
      }
    }
    .removeBtn {
      display: none;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 4px;
      right: 4px;
      padding: 1px;
      z-index: 100000;
      background-color: white;
      border-radius: 4px;
    }
    .downloadBtn {
      display: none;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 4px;
      right: 28px;
      padding: 1px;
      z-index: 100000;
      background-color: white;
      border-radius: 4px;
    }
  //#212B36
    .downloadBtn {
      &:hover {
        cursor: pointer;
        background-color: #e1e0e0;
        svg {
          fill: var(--second-text-color) !important;
        }
      }
    }
    .removeBtn, .downloadBtn {
      svg {
        transition: all 0.2s ease;
      }

      &:hover {
        cursor: pointer;
        background-color: #e1e0e0;
        svg {
          fill: var(--main-color);
        }
      }

      //display: none;
    }
  .inforFile {
    width: 100%;
    overflow: hidden;
    padding: 4px;
    position: absolute;
    bottom: 0;
    background-color: white;
    > p:first-child {
      color: var(--second-text-color);
      font-weight: 600;
    }
    > p {
      font-size: 12px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;