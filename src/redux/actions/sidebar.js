import {
	SIDEBAR_OPEN,
	SIDEBAR_ClOSE,
	SIDEBAR_CLEAR,
	SIDEBAR_OPEN_SHOW,
	SIDEBAR_EDIT,
	SIDEBAR_EDIT_INPUT
} from "./types";

export const sidebarOpen = (isOpen) => (dispatch) => {
	dispatch({
		type: SIDEBAR_OPEN,
		payload: isOpen,
	});
};

export const sidebarOpenShow = (showData) => (dispatch) => {
	dispatch({
		type: SIDEBAR_OPEN_SHOW,
		payload: showData,
	});
};

export const sidebarOpenToEdit = (showData) => (dispatch) => {
	dispatch({
		type: SIDEBAR_EDIT,
		payload: showData,
	});
};

export const sidebarEditInput = (newInputValue) => (dispatch) => {
	console.log(newInputValue);
	dispatch({
		type: SIDEBAR_EDIT_INPUT,
		payload: newInputValue,
	});
};

export const sidebarClose = () => (dispatch) => {
	dispatch({
		type: SIDEBAR_ClOSE
	});
	setTimeout(() => dispatch({type: SIDEBAR_CLEAR}), 400)

};