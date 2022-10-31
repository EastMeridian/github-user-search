import { User } from "./User";
import {
  DUPLICATE_SELECTED,
  githubUserReducer,
  initialState,
  REMOVE_SELECTED,
  SET_SELECTED,
  SET_USERS,
  UNSET_SELECTED,
} from "./githubUsersReducer";

const users: User[] = [
  {
    id: 0,
    login: "login0",
    avatar_url: "avatar_url0",
    html_url: "html_url0",
  },
  {
    id: 1,
    login: "login1",
    avatar_url: "avatar_url1",
    html_url: "html_url1",
  },
  {
    id: 2,
    login: "login2",
    avatar_url: "avatar_url2",
    html_url: "html_url2",
  },
];

describe("githubUsersReducer", () => {
  it("should set users", () => {
    expect(
      githubUserReducer(initialState, { type: SET_USERS, payload: users })
    ).toStrictEqual({ selectedUsers: {}, users });
  });

  it("should set selected user when id provided", () => {
    expect(
      githubUserReducer(
        { ...initialState, users },
        { type: SET_SELECTED, payload: 0 }
      )
    ).toStrictEqual({ selectedUsers: { 0: true }, users });
  });

  it("should set all users selected when id not provided", () => {
    expect(
      githubUserReducer({ ...initialState, users }, { type: SET_SELECTED })
    ).toStrictEqual({ selectedUsers: { 0: true, 1: true, 2: true }, users });
  });

  it("should unset selected user when id provided", () => {
    expect(
      githubUserReducer(
        { selectedUsers: { 0: true, 1: true }, users },
        { type: UNSET_SELECTED, payload: 0 }
      )
    ).toStrictEqual({ selectedUsers: { 1: true }, users });
  });

  it("should unset all users selected when id not provided", () => {
    expect(
      githubUserReducer(
        { selectedUsers: { 0: true, 1: true, 2: true }, users },
        { type: UNSET_SELECTED }
      )
    ).toStrictEqual({ selectedUsers: {}, users });
  });

  it("should remove selected users", () => {
    expect(
      githubUserReducer(
        { selectedUsers: { 0: true, 1: true, 2: true }, users },
        { type: REMOVE_SELECTED }
      )
    ).toStrictEqual({ selectedUsers: {}, users: [] });
  });

  it("should duplicate selected users", () => {
    expect(
      githubUserReducer(
        { selectedUsers: { 0: true, 1: true, 2: true }, users },
        { type: DUPLICATE_SELECTED }
      )
    ).toStrictEqual({
      selectedUsers: { 0: true, 1: true, 2: true },
      users: [...users, ...users],
    });
  });
});
