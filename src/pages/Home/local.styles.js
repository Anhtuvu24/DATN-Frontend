import styled from "styled-components";
import { Form } from "antd";

export const HomeWrapper = styled.div`
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
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    .ant-input-outlined {
      width: 224px;
      height: 100%;
    }
    .ant-select-outlined {
      height: 100%;
      width: 224px;
      .ant-select-selector {
        .ant-select-selection-wrap {
          min-width: 200px;
          height: 100%;
        }
      }
    }
  }
  .ant-popover-inner {
    padding: 4px;
  }
  .ant-menu-vertical {
    border: unset !important;
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

export const OpionSelectUser = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const ProjectName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const BoxStar = styled.div`
  &:hover {
    cursor: pointer;
  }
`