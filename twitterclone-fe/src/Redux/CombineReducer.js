import {combineReducers} from "redux";
import { UserReducer } from "./UserReducer";

export const CombineReducer=combineReducers({UserReducer: UserReducer });
