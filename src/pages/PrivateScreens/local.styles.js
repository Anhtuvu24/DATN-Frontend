import styled from "styled-components";

export const NavigationWrapper = styled.div`
  box-shadow: 0px -1px 0px 0px #E9EBF0 inset;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  .primaryNavigation {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
    .mainActive {
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 32px;
    }
  }
  .secondNavigation {
    display: flex;
    height: 100%;
    align-items: center;
    gap: 8px;
    margin-right: 8px;
    
    .ant-badge-count {
      transform: unset !important;
    }
    > div {
      &:hover {
        cursor: pointer;
      }
    }
  }
`

export const ListTaskSearch = styled.div`
  max-height: 300px;
  min-height: 100px;
  width: 400px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .searchLoading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }
  .taskItem {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 4px 8px;
    border-radius: 4px;
    overflow: hidden;
    min-height: 30px;
    .taskName {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:hover {
      background-color: var(--hover-color);
      cursor: pointer;
    }
  }
  .emptyResult {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
  }
`

export const ListNotiSearch = styled.div`
  max-height: 300px;
  min-height: 100px;
  width: 400px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .searchLoading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }
  .notiItem {
    display: flex;
    gap: 8px;
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    overflow: hidden;
    min-height: 86px;
    .buttonRead {
      svg {
        border-radius: 50%;
        &:hover {
          border: 1px solid #EC1C2A;
        }
      }
      .isRead {
        display: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: 1px solid #EC1C2A;
      }
    }
    .notiContent {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow: hidden;
      
      .notiName {
        font-weight: 600;
        > span {
          margin-left: 8px;
          color: #7A869A;
          font-weight: 400;
        }
      }
      .taskName {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .noTask {
        color: #42526E;
        font-size: 12px;
      }
      .commentContent {
        border: 1px solid rgba(9, 30, 66, 0.08);
        padding: 8px;
        border-radius: 4px;
      }
    }
    &:hover {
      background-color: var(--hover-color);
      cursor: pointer;
      .isRead {
        display: block;
      }
    }
  }
  .emptyResult {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
  }
`

export const TitleListNoties = styled.p`
  > span {
    margin-left: 8px;
  }
`

export const OptionProject = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const DropDownButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  &:hover {
    cursor: pointer;
    background-color: #091E4224;
  }
  > p {
    font-weight: 500;
    font-size: 14px;
    color: #44546F;
  }
`