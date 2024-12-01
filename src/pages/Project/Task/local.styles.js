import styled from "styled-components";

export const TaskWrapper = styled.div`
  background-color: #FFFFFF;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px #172b4d33, 0 0 1px #172b4d33);
  transition: all 0.3s ease;
  .title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--second-text-color);
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
  }
`