import {NAVIGATION_CHANGE} from "../actions/types";
import React from "react";

const initialState = {
		navState: 0,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case NAVIGATION_CHANGE:
			return {
				...state,
				navState: action.payload,
			};
		default:
			return state;
	}
}