import styled from "styled-components";

export const SidebarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #F5F6F9;
  .projectInforWrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 24px 16px 24px 30px;
    .projectName {
      flex: 1;
      h3 {
        font-size: 14px;
        font-weight: 600;
        color: var(--main-text-color);
      }
      p {
        font-size: 12px;
        color: var(--third-text-color);
      }
    }
  }
  .menuWrapper {
    flex: 1;
    overflow-y: auto;
    border-bottom: 1px solid #091E4224;
    background-color: #F5F6F9;
    .ant-menu {
      background-color: #F5F6F9;
      .ant-menu-item {
        .ant-menu-item-icon {
          font-size: 22px;
        }
        .ant-menu-title-content {
          font-size: 16px;
          color: var(--second-text-color);
        }
      }
    }
  }
`