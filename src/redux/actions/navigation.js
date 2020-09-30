import {NAVIGATION_CHANGE} from "./types";

export const changeNav = (position) => (dispatch) => {
	dispatch({
		type: NAVIGATION_CHANGE,
		payload: position,
	});
};