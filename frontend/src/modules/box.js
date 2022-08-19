// actions

const GET_BOUNDARY = "box/GET_BOUNDARY";

export const GetBoundary = data => ({
  type: GET_BOUNDARY,
  data,
});

const initialState = { box: {} };

// reducer

export default function box(state = initialState, action) {
  switch (action.type) {
    case GET_BOUNDARY:
      return { ...state, box: action.data };
    default:
      return state;
  }
}
