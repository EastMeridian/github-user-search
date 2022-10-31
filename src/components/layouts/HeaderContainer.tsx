import styled from "@emotion/styled";
import { colors } from "../../styles";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  color: ${colors.TEXT};
  position: fixed;
  width: 100%;
  z-index: 3;
`;

export default HeaderContainer;
