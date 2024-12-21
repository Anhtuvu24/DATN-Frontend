import styled from "styled-components";
import {Input} from "antd";

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  .profileContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .profileHeader {
      width: 100%;
      height: 192px;
      background-image: linear-gradient(270deg, rgb(179, 245, 255) 0%, rgb(121, 226, 242) 100%);
      background-size: cover;
      background-position: center center;
      display: flex;
      justify-content: center;
      box-shadow: 0px 2px 2px -2px gray;
      @media only scren and (max-width: 985px) {
        padding: 0 24px !important;
      }
      .ant-avatar-string {
        font-size: 42px !important;
      }
      .boxAvatar {
        position: relative;
        max-width: 960px;
        width: 100%;
        height: 100%;
        > div {
          transition: 0.25s;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          bottom: -65px;
          border-radius: 50%;
          padding: 3px;
          background: white;
        }
        .ant-upload {
          width: 128px;
          height: 128px;
          border: none;
        }
        .ant-upload-list-item-container {
          width: 128px;
          height: 128px;
        }
      }
    }
    .profileBody {
      width: 100%;
      max-width: 960px;
      height: 100%;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .leftWrapper {
        min-width: 320px;
        height: 100%;
        padding: 80px 20px 0;
        .aboutUser {
          max-width: 315px;
          box-shadow: 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13);
          border-radius: 8px;
          margin-bottom: 24px;
          margin-top: 24px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      }
      .rightWrapper {
        min-width: 456px;
        flex: 1;
        padding: 32px 24px 0;
        height: 100%;
        .tasksWrapper {
          margin-bottom: 32px;
          h3 {
            font-size: 16px;
            font-weight: 600;
            color: var(--second-text-color);
          }
          .listItem {
            margin-top: 16px;
            box-shadow: 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13);
            width: 100%;
            min-height: 100px;
            border-radius: 4px;
            padding: 24px 12px;
            max-height: 300px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 8px;
            .taskItem {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 4px 12px;
              &:hover {
                background-color: rgba(9, 30, 66, 0.06);
                border-radius: 4px;
                cursor: pointer;
              }
            }
            .emptyResult {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              gap: 6px;
            }
          }
        }
        .projectsWrapper {
          h3 {
            font-size: 16px;
            font-weight: 600;
            color: var(--second-text-color);
          }
          .listItem {
            margin-top: 16px;
            box-shadow: 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13);
            width: 100%;
            min-height: 100px;
            border-radius: 4px;
            padding: 24px 12px;
            max-height: 300px;
            overflow-y: auto;
            .projectItem {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 4px 12px;
              &:hover {
                background-color: rgba(9, 30, 66, 0.06);
                border-radius: 4px;
                cursor: pointer;
              }
            }
            .emptyResult {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              gap: 6px;
            }
          }
        }
      }
    }
  }
`

export const AboutItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  .ant-select {
    flex: 1;
  }
`

export const UserName = styled(Input)`
  font-size: 24px;
  font-weight: 500;
  background-color: unset;
`