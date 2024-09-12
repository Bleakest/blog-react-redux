const initialUsersState = {};

export const usersReducer = (state = initialUsersState, action) => {
  switch (action.type) {
    case "dasdasd": {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
