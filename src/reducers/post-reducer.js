const initialPostState = {};

export const postReducer = (state = initialPostState, action) => {
  switch (action.type) {
    case "sdasd": {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
