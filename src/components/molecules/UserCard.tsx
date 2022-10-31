import styled from "@emotion/styled";
import { colors } from "../../styles";
import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";

export type UserCardProps = {
  shouldDisplayAction?: boolean;
  avatarUrl: string;
  id: number;
  username: string;
  profileUrl: string;
  onSelectUser: (id: number) => void;
  checked?: boolean;
};

const UserCard = ({
  shouldDisplayAction,
  avatarUrl,
  id,
  username,
  profileUrl,
  onSelectUser,
  checked,
}: UserCardProps) => {
  return (
    <Container>
      <Avatar src={avatarUrl} />
      <NameContainer>
        <Subtitle>{id}</Subtitle>
        <Title>{username}</Title>
      </NameContainer>
      <a href={profileUrl} target="_blank" rel="noreferrer">
        <Button>View profile</Button>
      </a>
      {shouldDisplayAction && (
        <CheckboxContainer>
          <input
            type="checkbox"
            id="scales"
            name="scales"
            onChange={() => onSelectUser?.(id)}
            checked={checked}
          />
        </CheckboxContainer>
      )}
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 8rem;
  gap: 1rem;
  background-color: ${colors.PAPER};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 0.5rem;
  position: relative;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const Title = styled.div`
  color: ${colors.TEXT};
  font-size: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 8rem;
  text-align: center;
`;

const Subtitle = styled.div`
  color: ${colors.SUBTITLE};
  font-size: 0.75rem;
`;

const CheckboxContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
`;

export default UserCard;
