import styled from "styled-components";

export const TaskWrapper = styled.div`
  background-color: #FFFFFF;
  padding: 8px 12px;
  display: flex;
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
    height: 26px;
    .optionTask {
      display: none;
    }
    .title {
      flex: 1;
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
