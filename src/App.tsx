import React, { useCallback, useState } from "react";
import IconButton from "./components/atoms/IconButton";
import Search from "./components/atoms/Search";
import ContentContainer from "./components/layouts/ContentContainer";
import HeaderContainer from "./components/layouts/HeaderContainer";
import ListContainer from "./components/layouts/ListContainer";
import ScreenContainer from "./components/layouts/ScreenContainer";
import SearchContainer from "./components/layouts/SearchContainer";
import TitleContainer from "./components/layouts/TitleContainer";
import ActionBar from "./components/molecules/ActionBar";
import EmptyView from "./components/molecules/EmptyView";
import UserCard from "./components/molecules/UserCard";
import { useGithubUsers } from "./models/users";
import { debounce } from "./utils/debounce";
import { MdEditOff, MdModeEditOutline } from "react-icons/md";
import styled from "@emotion/styled";

function App() {
  const [editMode, setEditMode] = useState(true);
  const [search, setSearch] = useState("");
  const {
    users,
    selectedUsers,
    selectedState,
    loading,
    setSelected,
    unsetAllSelected,
    removeSelected,
    duplicateSelected,
  } = useGithubUsers(search);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const debounceOnChange = useCallback(debounce(onChange, 500), []);

  return (
    <ScreenContainer>
      <HeaderContainer>
        <TitleContainer>Github Search</TitleContainer>
        <SearchContainer>
          <Search placeholder="Search" onChange={debounceOnChange} />
        </SearchContainer>
        {editMode && (
          <ActionBar
            onCheck={() =>
              selectedState === "checked" ? unsetAllSelected() : setSelected()
            }
            onDelete={removeSelected}
            onDuplicate={duplicateSelected}
            checked={selectedState}
          />
        )}
      </HeaderContainer>
      <ContentContainer editMode={editMode}>
        {!loading && users?.length === 0 && <EmptyView />}

        <ListContainer>
          {users.map(({ id, avatar_url, login, html_url }, index) => (
            <UserCard
              key={`${id}-${index}`}
              id={id}
              username={login}
              avatarUrl={avatar_url}
              profileUrl={html_url}
              shouldDisplayAction={editMode}
              onSelectUser={setSelected}
              checked={Boolean(selectedUsers[id])}
            />
          ))}
        </ListContainer>
      </ContentContainer>
      <EditButtonContainer>
        <IconButton onClick={() => setEditMode((prev) => !prev)}>
          {editMode ? <MdEditOff /> : <MdModeEditOutline />}
        </IconButton>
      </EditButtonContainer>
    </ScreenContainer>
  );
}

const EditButtonContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 4;
`;

export default App;
