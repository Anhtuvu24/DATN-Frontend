import styled from "styled-components";

export const TaskWrapper = styled.div`
  background-color: #FFFFFF;
  padding: 8px 12px;
  display: ${props => props.isHidden ? 'none !important' : 'flex'};
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px #172b4d33, 0 0 1px #172b4d33);
  transition: transform, background-color 0.2s ease-in-out;
  will-change: transform;
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
  .ant-popover {
    z-index: 99999999999999999;
  }
  .ant-popover-inner {
    padding: 2px;
    .ant-menu {
      border-inline-end: unset;
      .ant-menu-item {
        height: 32px;
        .ant-menu-title-content {
          > p {
            line-height: 32px;
          }
        }
      }
    }
  }
  &:hover {
    cursor: pointer;
    background-color: #091E420F;
    .optionTask {
      display: flex;
      align-items: center;
    }
  }
`;
