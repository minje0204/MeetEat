// // actions
// const ADD_PARTICIPANT = "participants/ADD_PARTICIPANT";
// const REMOVE_PARTICIPANT = "participants/REMOVE_PARTICIPANT";

// export const AddParticipant = (name, rtcPeer) => ({
//   type: ADD_PARTICIPANT,
//   name,
//   rtcPeer,
// });
// export const RemoveParticipant = name => ({
//   type: REMOVE_PARTICIPANT,
//   name,
// });

// const initialState = {};

// // reducer
// export default function participants(state = initialState, action) {
//   switch (action.type) {
//     case ADD_PARTICIPANT:
//       const newParticipant = {};
//       newParticipant[data.name] = data.rtcPeer;
//       return { ...state, ...newParticipant };
//     case REMOVE_PARTICIPANT: {
//       let newParticipants = { ...state };
//       delete newParticipants[action.name];
//       return { ...newParticipants };
//     }
//     default:
//       return state;
//   }
// }
