import styled from "@emotion/styled";

const ContentContainer = styled.div<{ editMode?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ editMode }) => (editMode ? "13rem" : "9rem")};
`;

export default ContentContainer;
