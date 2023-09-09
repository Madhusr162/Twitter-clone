import {createStore} from "redux";
import { CombineReducer } from "./CombineReducer";

export const store= createStore(
    CombineReducer
)