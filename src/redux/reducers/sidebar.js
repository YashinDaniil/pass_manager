import {SIDEBAR_OPEN, SIDEBAR_ClOSE, SIDEBAR_CLEAR, SIDEBAR_OPEN_SHOW, SIDEBAR_EDIT, SIDEBAR_EDIT_INPUT} from "../actions/types";

const initialState = {
	isOpen: false,
	isShowMode: false,
	isShowType: '',
	isEditMode: false,
	sideBarContent: {
		id: -1,
		val1: '',
		val2: '',
		val3: '',
		val4: '',
		val41: '',
		val5: '',
	}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SIDEBAR_OPEN:
			return {
				...state,
				isOpen: action.payload.isOpen,
			};
		case SIDEBAR_OPEN_SHOW:
			return {
				...state,
				isOpen: true,
				isShowMode: true,
				isShowType: action.payload.isShowType,
				sideBarContent: {
					val1: action.payload.sideBarContent.val1,
					val2: action.payload.sideBarContent.val2,
					val3: action.payload.sideBarContent.val3,
					val4: action.payload.sideBarContent.val4,
					val41: action.payload.sideBarContent.val41,
					val5: action.payload.sideBarContent.val5,
				}
			};
		case SIDEBAR_EDIT:
			return {
				...state,
				isEditMode: true,
				isOpen: true,
				isShowType: action.payload.isShowType,
				sideBarContent: {
					id: action.payload.sideBarContent.id,
					val1: action.payload.sideBarContent.val1,
					val2: action.payload.sideBarContent.val2,
					val3: action.payload.sideBarContent.val3,
					val4: action.payload.sideBarContent.val4,
					val41: action.payload.sideBarContent.val41,
					val5: action.payload.sideBarContent.val5,
				}
			};
		case SIDEBAR_ClOSE:
			return {
				...state,
				isOpen: false,
			};
		case SIDEBAR_CLEAR:
			return {
				...state,
				isShowMode: false,
				isEditMode: false,
				isShowType: '',
				sideBarContent: {
					val1: '',
					val2: '',
					val3: '',
					val4: '',
					val41: '',
					val5: '',
				}
			};
		case SIDEBAR_EDIT_INPUT:
			return{
				...state,
				sideBarContent: {
					...state.sideBarContent,
					[action.payload.name]: action.payload.value,

				}
			};
		default:
			return state;
	}
}
