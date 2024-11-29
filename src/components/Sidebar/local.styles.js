import styled from "styled-components";

export const SidebarWrapper = styled.div`
  height: 100%;
  .projectInforWrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 24px 16px;
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
`