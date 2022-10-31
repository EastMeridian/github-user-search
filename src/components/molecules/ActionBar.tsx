import styled from "@emotion/styled";
import { MdDelete, MdOutlineFilterNone } from "react-icons/md";
import { colors } from "../../styles";
import Checkbox, { CheckBoxState } from "../atoms/Checkbox";
import IconButton from "../atoms/IconButton";

type ActionBarProps = {
  count?: number;
  onDelete: () => void;
  onDuplicate: () => void;
  onCheck: () => void;
  checked: CheckBoxState;
};

const ActionBar = ({
  onDelete,
  onDuplicate,
  checked,
  onCheck,
  count,
}: ActionBarProps) => (
  <Container>
    <InnerContainer>
      <Checkbox
        value={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheck()}
      />
      <div>{count} items selected</div>
    </InnerContainer>
    <InnerContainer>
      <IconButton onClick={onDelete}>
        <MdDelete />
      </IconButton>
      <IconButton onClick={onDuplicate}>
        <MdOutlineFilterNone />
      </IconButton>
    </InnerContainer>
  </Container>
);

const Container = styled.div`
  display: flex;
  height: 4rem;
  padding: 0 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.PAPER};
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default ActionBar;
