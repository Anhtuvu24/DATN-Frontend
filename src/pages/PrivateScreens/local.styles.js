import styled from "styled-components";

export const NavigationWrapper = styled.div`
  box-shadow: 0px -1px 0px 0px #E9EBF0 inset;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  .primaryNavigation {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
  }
  .secondNavigation {
    display: flex;
    height: 100%;
    align-items: center;
    gap: 8px;
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