import {
	PASSWORD_GET,
	PASSWORD_ADD,
	PASSWORD_EDIT,
	PASSWORD_DELETE,
} from '../actions/types';
import React from "react";

const initialState = {
	passList: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case PASSWORD_GET:
			return {
				...state,
				passList: action.payload,
			};
		case PASSWORD_ADD:
			return {
				...state,
				passList: [...state.passList, action.payload],
			};
		case PASSWORD_EDIT:
			let objIndex = state.passList.findIndex((obj => obj.id === action.payload.id));
			return {
				...state,
				passList: state.passList.map(
					(passList, i) => i === objIndex ? {
							id: action.payload.id,
							url: action.payload.val1,
							name: action.payload.val2,
							username: action.payload.val3,
							password: action.payload.val4,
							category: action.payload.val5
						}
						: passList
				)
			};
		case PASSWORD_DELETE:
			return {
				...state,
				passList: state.passList.filter(item => action.payload !== item.id)
			};
		default:
			return state;
	}
}