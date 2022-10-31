import { User } from "./User";

export type State = {
  users: User[];
  selectedUsers: Record<number, boolean>;
};

export const initialState = {
  users: [],
  selectedUsers: [],
};

export const SET_USERS = "SET_USERS";
export const SET_SELECTED = "SET_SELECTED";
export const UNSET_SELECTED = "UNSET_SELECTED";
export const REMOVE_SELECTED = "REMOVE_SELECTED";
export const DUPLICATE_SELECTED = "DUPLICATE_SELECTED";

interface SetUsers {
  type: typeof SET_USERS;
  payload: User[];
}

interface SetSelected {
  type: typeof SET_SELECTED;
  payload?: User["id"];
}

interface UnsetSelected {
  type: typeof UNSET_SELECTED;
  payload?: User["id"];
}

interface RemoveSelected {
  type: typeof REMOVE_SELECTED;
}

interface DuplicateSelected {
  type: typeof DUPLICATE_SELECTED;
}

type Action =
  | SetUsers
  | SetSelected
  | UnsetSelected
  | RemoveSelected
  | DuplicateSelected;

const selectedToNumbers = (selected: State["selectedUsers"]) =>
  Object.keys(selected).map((key) => parseInt(key));

export const githubUserReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USERS: {
      return { users: action.payload, selectedUsers: {} };
    }
    case SET_SELECTED: {
      const selectedUsers =
        action.payload !== undefined
          ? { ...state.selectedUsers, [action.payload]: true }
          : state.users
              .map(({ id }) => id)
              .reduce((acc, curr) => ({ ...acc, [curr]: true }), {});

      return { ...state, selectedUsers };
    }
    case UNSET_SELECTED: {
      const selectedUsers =
        action.payload !== undefined
          ? selectedToNumbers(state.selectedUsers)
              .filter((id) => id !== action.payload)
              .reduce((acc, curr) => ({ ...acc, [curr]: true }), {})
          : {};

      return { ...state, selectedUsers };
    }
    case REMOVE_SELECTED: {
      const selectedIds = selectedToNumbers(state.selectedUsers);

      const users = state.users.filter(({ id }) => !selectedIds.includes(id));

      return { users, selectedUsers: {} };
    }
    case DUPLICATE_SELECTED: {
      const selectedIds = selectedToNumbers(state.selectedUsers);

      const selected = state.users.filter(({ id }) => selectedIds.includes(id));

      const users = [...state.users, ...selected];

      return { ...state, users };
    }
    default:
      return state;
  }
};
