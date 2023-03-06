export let initialState = {
  user: {},
  PostedTweets: [],
};

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_POSTED_TWEETS":
      return {
        ...state,
        PostedTweets: action.PostedTweets,
      };
    default:
      return state;
  }
};
