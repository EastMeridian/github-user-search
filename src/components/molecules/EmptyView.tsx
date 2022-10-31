import styled from "@emotion/styled";
import { colors } from "../../styles";

const EmptyView = () => (
  <Container>
    <Title>No result</Title>
    <Subtitle>Try to search something</Subtitle>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 1rem;
  margin-top: 2rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.TEXT};
`;

const Subtitle = styled.div`
  color: #bdbdbd;
  color: ${colors.SUBTITLE};
`;

export default EmptyView;
