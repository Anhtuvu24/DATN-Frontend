import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  .banner {
    flex: 1;
    padding: 40px;
    @media only screen and (max-width: 768px) {
      display: none;
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background-color: #F5F6F9;
      border-radius: 32px;
      > img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .formLogin {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 24px;
    padding: 130px 80px 0;
    > img {
      max-width: 100%;
    }
    .loginTitle {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      h3 {
        font-size: 24px;
        color: var(--main-text-color);
        font-weight: 500;
        text-align: center;
        width: 100%;
      }
      p {
        font-size: 14px;
        text-align: center;
        width: 100%;
        color: var(--main-text-color);
      }
    }
    form {
      .ant-form-item {
        .ant-form-item-row {
          .ant-col-offset-8 {
            margin-left: unset !important;
            width: 100%;
            max-width: 100% !important;
            button {
              width: 100%;
            }
          }
        }
        &:nth-child(3) {
          margin-bottom: 8px;
        }
      }
    }
  }
`