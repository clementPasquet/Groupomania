import {GET_USER} from "../actions/userActions";

const initialState = {};

export default function userReducer(state=initialState,action){
     switch (action.type){

        case GET_USER:
            return action.payload
        default:
            return state;
     }
}