import styled from "styled-components";

export const DetailsWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
  .selectStatus {
    max-width: 140px;
    .ant-select-selector {
      border: unset;
      background-color: ${props => props.bgColor};
      height: 34px;
      .ant-select-selection-wrap {
        .ant-select-selection-item {
          > div {
            background-color: unset !important;
          }
        }
      }
    }
    .ant-select-arrow {
      svg {
        fill: ${props => props.color};
      }
    }
  }
  .listStatusWrapper {
    width: 200px !important;
  }
  .ant-collapse {
    .ant-collapse-item {
      .ant-collapse-content {
        .ant-collapse-content-box {
          display: flex;
          flex-direction: column;
          gap: 20px;
          .detailItem {
            display: flex;
            align-items: center;
            width: 100%;
            flex-wrap: wrap;
            > p:first-child {
              width: 100px;
              font-weight: 500;
              font-size: 14px;
              color: #44545F;
            }
            .sprintName {
              text-transform: capitalize;
            }
            .priorityOption {
              width: 120px !important;
            }
            .ant-select {
              flex: 1;
              max-width: 100%;
            }
            .ant-picker {
              flex: 1;
              min-width: 110px;
            }
            .reporterWrapper {
              display: flex;
              gap: 8px;
              align-items: center;
            }
            .ant-skeleton {
              width: 100%;
              .ant-skeleton-button {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
  .createUpdateTime {
    padding-left: 16px !important;
    display: flex;
    flex-direction: column;
    gap: 4px;
    p {
      font-size: 12px;
      color: #44546F;
    }
  }
`

export const LabelStatusItem = styled.div`
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  font-weight: 700;
  font-size: 11px;
  border-radius: 4px;
`

export const SelectOptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    border-radius: 50%;
  }
  p {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const PriorityOption = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`