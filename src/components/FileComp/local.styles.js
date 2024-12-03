import styled from "styled-components";

export const FileCompWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  width: ${props => props.size ? props.size : '140px'};
  height: ${props => props.size ? props.size : '140px'};
  border-radius: 4px;
  border: 1px solid var(--border-color);
  padding: 4px;
  > p {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }
`;