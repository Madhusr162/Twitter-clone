import {combineReducers} from "redux";
import { userReducer } from "./UserReducer";

export const CombineReducer=combineReducers({userReducer: userReducer });
