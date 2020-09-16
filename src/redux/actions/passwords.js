import {
	PASSWORD_GET,
	PASSWORD_ADD,
	PASSWORD_EDIT,
	PASSWORD_DELETE
} from '../actions/types';
import {SIDEBAR_CLEAR, SIDEBAR_ClOSE} from "./types";
import {tokenConfig} from "./auth";
import axios from 'axios';

export const getPasswords = () => (dispatch, getState) => {
	axios
		.get('/pass/', tokenConfig(getState))
		.then((res) => {
			console.log(res.data);
			dispatch({
				type: PASSWORD_GET,
				payload: res.data,
			});
		})
		.catch((err) => {
			//dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const addPassword = (newItem) => (dispatch, getState) => {
	let body = {
		url: newItem.val1,
		name: newItem.val2,
		username: newItem.val3,
		password: newItem.val4,
		category: (newItem.val5 === '') ? 'Other' : newItem.val5

	};
	axios
		.post('/pass/create/', body, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: PASSWORD_ADD,
				payload: {
					id: res.data.pass_id,
					url: newItem.val1,
					name: newItem.val2,
					username: newItem.val3,
					password: newItem.val4,
					category: (newItem.val5 === '') ? 'Other' : newItem.val5
				},
			});
			dispatch({type: SIDEBAR_ClOSE});
			setTimeout(() => dispatch({type: SIDEBAR_CLEAR}), 400);
		})
		.catch((err) => {
			//dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const editPassword = (editItem) => (dispatch, getState) => {
	const body = {
		id: editItem.id,
		url: editItem.val1,
		name: editItem.val2,
		username: editItem.val3,
		password: editItem.val4,
		category:editItem.val5
	};
	axios
		.put('/pass/edit/', body, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: PASSWORD_EDIT,
				payload: editItem,
			});
			dispatch({type: SIDEBAR_ClOSE});
			setTimeout(() => dispatch({type: SIDEBAR_CLEAR}), 400);
		})
		.catch((err) => {
			//dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const deletePassword = (passId) => (dispatch, getState) => {
	axios
		.post('/pass/delete/', {id: passId}, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: PASSWORD_DELETE,
				payload: passId,
			});

		})
		.catch((err) => {
			//dispatch(returnErrors(err.response.data, err.response.status));
		});
};