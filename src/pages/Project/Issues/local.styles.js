import styled from "styled-components";

export const IssuesWrapper = styled.div`
  height: 100%;
  padding: 24px 40px 0;
  display: flex;
  flex-direction: column;
  > h1 {
    font-size: 24px;
    font-weight: 500;
    text-transform: capitalize;
  }
  .searchAndFilterNav {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .filterContent {
    flex: 1;
    width: 100%;
    margin-top: 32px;
    padding-bottom: 16px;
    display: flex;
    gap: 24px;
    overflow-y: auto;
    .listTask {
      width: 260px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 2px 2px 2px 8px;
      background-color: #F1F2F4;
      height: 100%;
      border-radius: 4px;
      overflow-y: scroll;
      > h3 {
        padding-left: 12px;
      }
    }
    .taskDetail {
      flex: 1;
      height: 100%;
      max-height: 100%;
      overflow-y: auto;
      border: 1px solid #172b4d33;
      border-radius: 4px;
      > div {
        max-height: 100%;
      }
    }
  }
`

export const TaskWrapper = styled.div`
  background-color: #FFFFFF;
  padding: 8px 12px;
  display: ${props => props.isHidden ? 'none !important' : 'flex'};
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  transition: transform, background-color 0.2s ease-in-out;
  will-change: transform;
  &:hover {
    cursor: pointer;
    background-color: #E4E6EA;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 26px;
    .optionTask {
      display: none;
    }
    .title {
      flex: 1;
      padding-right: 8px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--second-text-color);
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--second-text-color);
    .footerLeft {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`