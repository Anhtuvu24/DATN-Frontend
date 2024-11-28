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