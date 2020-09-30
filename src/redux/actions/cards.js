import {CARD_ADD, CARD_DELETE, CARD_EDIT, CARD_GET} from "./types";
import {SIDEBAR_CLEAR, SIDEBAR_ClOSE} from "./types";
import {BASE_URL} from "../server_types";
import {tokenConfig} from "./auth";
import axios from 'axios';

export const getCards = () => (dispatch, getState) => {
	axios
		.get('/card/', tokenConfig(getState))
		.then((res) => {
			console.log(res.data);
			dispatch({
				type: CARD_GET,
				payload: res.data,
			});
		})
		.catch((err) => {
			//dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const addCard = (newItem) => (dispatch, getState) => {
	let body = {
		number: newItem.val1,
		cvv: newItem.val2,
		password: newItem.val3,
		name: newItem.val4 + ' ' + newItem.val41,
		date: newItem.val5.split('-')[1]+'/'+newItem.val5.split('-')[0].slice(2)
	};
	axios
		.post('/card/create/', body, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: CARD_ADD,
				payload: {
					id: res.data.card_id,
					number: newItem.val1,
					cvv: newItem.val2,
					password: newItem.val3,
					name: newItem.val4 + ' ' + newItem.val41,
					date: newItem.val5.split('-')[1]+'/'+newItem.val5.split('-')[0].slice(2)
				},
			});
			dispatch({type: SIDEBAR_ClOSE});
			setTimeout(() => dispatch({type: SIDEBAR_CLEAR}), 400);
		})
		.catch((err) => {
			//dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const editCard = (editItem) => (dispatch, getState) => {
	const body = {
		id: editItem.id,
		number: editItem.val1,
		cvv: editItem.val2,
		password: editItem.val3,
		name: editItem.val4 + ' ' + editItem.val41,
		date: (editItem.val5.indexOf('/') === -1) ?  editItem.val5.split('-')[1]+'/'+editItem.val5.split('-')[0].slice(2) : editItem.val5
	};
	axios
		.put('/card/edit/', body, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: CARD_EDIT,
				payload: {
					...editItem,
					val5: (editItem.val5.indexOf('/') === -1) ?  editItem.val5.split('-')[1]+'/'+editItem.val5.split('-')[0].slice(2) : editItem.val5
				},
			});
			dispatch({type: SIDEBAR_ClOSE});
			setTimeout(() => dispatch({type: SIDEBAR_CLEAR}), 400);
		})
		.catch((err) => {
			//dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const deleteCard = (cardId) => (dispatch, getState) => {
	axios
		.post('/card/delete/', {id: cardId}, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: CARD_DELETE,
				payload: cardId,
			});

		})
		.catch((err) => {
			//dispatch(returnErrors(err.response.data, err.response.status));
		});
};