import styled from "styled-components";
import { Form } from "antd";

export const HomeWrapper = styled.div`
  min-width: 800px;
  padding: 22px 40px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .headerWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > h1 {
      font-weight: 500;
      font-size: 24px;
      color: var(--main-text-color);
    }
  }
  .searchsWrapper {
    height: 40px;
    display: flex;
    align-items: center;
    gap: 8px;
    .ant-input-outlined {
      width: 224px;
      height: 100%;
    }
    .ant-select-outlined {
      height: 100%;
      .ant-select-selector {
        .ant-select-selection-wrap {
          min-width: 200px;
          height: 100%;
        }
      }
    }
  }
  .ant-dropdown-menu-item {
    > span {
      text-align: left;
    }
  }
`

export const MoreOption = styled.div`
  > svg {
    &:hover {
      fill: var(--active-color);
      cursor: pointer;
    }
  }
`

export const FormWrapper = styled(Form)`
  .ant-upload-wrapper {
    display: flex;
    justify-content: center;
    height: 102px;
  }
`