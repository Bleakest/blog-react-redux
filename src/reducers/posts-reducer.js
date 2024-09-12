const initialPostsState = {};

export const postsReducer = (state = initialPostsState, action) => {
  switch (action.type) {
    case "dasdasd": {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
