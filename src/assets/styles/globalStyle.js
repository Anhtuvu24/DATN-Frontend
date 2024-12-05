import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .item-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    &:hover {
      background-color: var(--hover-color);
      cursor: pointer;
    }
  }
  
  // Button antd
  .ant-btn-primary {
    > span {
      font-weight: 500;
    }
  }
  
  // Modal antd
  .ant-modal-content {
    padding-bottom: 0.5px !important;
  }

  .ant-breadcrumb-link {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`

export default GlobalStyle;