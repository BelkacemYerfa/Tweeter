export let initialState = {
  user: {},
  PostedTweets: [],
  SavedTweets: [],
  LikedTweets: [],
  TopTweets: [],
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
    case "SET_SAVED_TWEETS":
      return {
        ...state,
        SavedTweets: action.SavedTweets,
      };
    case "SET_LIKED_TWEETS": {
      return {
        ...state,
        LikedTweets: action.LikedTweets,
      };
    }
    case "SET_TOP_TWEETS": {
      return {
        ...state,
        TopTweets: action.TopTweets,
      };
    }
    default:
      return state;
  }
};
