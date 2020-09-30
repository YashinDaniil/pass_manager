import {CARD_ADD, CARD_DELETE, CARD_EDIT, CARD_GET} from "../actions/types";
import React from "react";


const initialState = {
	cardList: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case CARD_GET:
			return {
				...state,
				cardList: action.payload,
			};
		case CARD_ADD:
			return {
				...state,
				cardList: [...state.cardList, action.payload],
			};
		case CARD_EDIT:
			let objIndex = state.cardList.findIndex((obj => obj.id === action.payload.id));
			return {
				...state,
				cardList: state.cardList.map(
					(cardList, i) => i === objIndex ? {
							id: action.payload.id,
							number: action.payload.val1,
							cvv: action.payload.val2,
							password: action.payload.val3,
							name: action.payload.val4 + ' ' + action.payload.val41,
							date: action.payload.val5
						}
						: cardList
				)
			};
		case CARD_DELETE:
			return {
				...state,
				cardList: state.cardList.filter(item => action.payload !== item.id)
			};
		default:
			return state;
	}
}