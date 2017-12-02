import {iState_calculator, iAction} from "../misc/interface";
import consts from "../misc/const.ts";
import socket from "../misc/socket.ts";

const ACT = consts.ACT;

export default function reducer_calculator (state:iState_calculator={
  fetching: false,
  fetched: false,
  error: null,
  value: "",
}, action:iAction) {
  switch (action.type) {
    case ACT.FETCHING: {
      state = {...state, fetching:true};
      socket.send(action.payload);
      break;
    }

    case ACT.FETCHED: {
      state = {
        ...state,
        fetched:true,
        fetching:false,
        value:action.payload,
      };
      break;
    }

    case ACT.ERROR: {
      state = {
        ...state,
        fetching:false,
        fetched:false,
        error:action.payload,
      };
      break;
    }

    default: {
      /**
       * If it wasn't a redux call.
      **/
      if (typeof action.type !== "string" || (<string>action.type).indexOf("@@redux") === -1) {
        throw new Error(`Invalid action type(${action.type})`);
      }
    }
  }

  return state;
}