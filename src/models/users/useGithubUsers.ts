import {
  DUPLICATE_SELECTED,
  githubUserReducer,
  initialState,
  REMOVE_SELECTED,
  SET_SELECTED,
  SET_USERS,
  State,
  UNSET_SELECTED,
} from "./githubUsersReducer";
import { GITHUB_USERS_URL } from "./constants";
import { useAsync } from "./../../utils/useAsync";
import { createCache } from "../../utils/createCache";
import { User } from "./User";
import { useEffect, useReducer } from "react";
import { CheckBoxState } from "../../components/atoms/Checkbox";

const cache = createCache<User[]>();

const fetchUsers = async (search: string) => {
  if (!search) return Promise.resolve([]);

  const raw = await fetch(`${GITHUB_USERS_URL}?q=${search}`, {
    headers: {
      "User-Agent": "request",
    },
  });

  const json = await raw.json();

  return json.items;
};

const getSelectionState = ({ users, selectedUsers }: State): CheckBoxState => {
  const selectedLength = Object.keys(selectedUsers).length;
  if (selectedLength === 0) return "unchecked";
  if (selectedLength < users.length) return "indeterminate";
  return "checked";
};

export const useGithubUsers = (search: string) => {
  const { data, isLoading, error } = useAsync<User[]>(
    () => cache(search, () => fetchUsers(search)),
    [search]
  );

  const [{ users, selectedUsers }, dispatch] = useReducer(
    githubUserReducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: SET_USERS, payload: data || [] });
  }, [data]);

  const setSelected = (id?: number) => {
    if (id !== undefined && selectedUsers[id]) {
      return dispatch({ type: UNSET_SELECTED, payload: id });
    }
    dispatch({ type: SET_SELECTED, payload: id });
  };

  const unsetAllSelected = () => {
    return dispatch({ type: UNSET_SELECTED });
  };

  const removeSelected = () => dispatch({ type: REMOVE_SELECTED });

  const duplicateSelected = () => dispatch({ type: DUPLICATE_SELECTED });

  const loading = search !== "" ? isLoading : false;

  const selectedState = getSelectionState({ users, selectedUsers });

  return {
    users,
    selectedUsers,
    selectedState,
    loading,
    error,
    setSelected,
    unsetAllSelected,
    removeSelected,
    duplicateSelected,
  };
};
