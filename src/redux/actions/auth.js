import axios from 'axios';

import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	ACTIVATION_SUCCESS,
	ACTIVATION_FAIL,
	UPDATE_PROFILE,
	CHANGE_THEME,
	CREATE_MESSAGE,
	USER_VALID_MASTER
} from './types';

import {BASE_URL} from "../server_types";
import React from "react";
import {Redirect} from "react-router-dom";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
	// User Loading
	dispatch({type: USER_LOADING});
	axios
		.get('/account/user/', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		})
		.catch((err) => {
			//dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
			localStorage.removeItem('token')
		});
};

// LOGIN USER
export const login = ({username, password}) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// Request Body
	const body = JSON.stringify({username, password});
	axios
		.post(BASE_URL + '/account/login/', body, config)
		.then((res) => {
			console.log(res);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
			//dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: LOGIN_FAIL,
			});
		});
};

// REGISTER USER
export const register = ({username, email, password, master_password}) => (dispatch) => {
	let regexp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
	if (password.length > 7 && password.match(regexp) !== null) {
		// Headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// Request Body
		const body = JSON.stringify({username, email, password, master_password});
		axios
			.post(BASE_URL + '/account/register/', body, config)
			.then((res) => {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				//dispatch(returnErrors(err.response.data, err.response.status));
				dispatch({
					type: REGISTER_FAIL,
				});
			});
	} else {
		//dispatch(returnErrors({passwordNotMatch: 'Пароль слишком простой'}, 400));
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

// VALIDATION MASTER PASS
export const validMasterPass = ({master_password}) => (dispatch, getState) => {
	// Request Body
	const body = JSON.stringify({master_password});
	axios
		.post(BASE_URL + '/account/check_master_pass/', body, tokenConfig(getState))
		.then((res) => {
			console.log(res);
			dispatch({
				type: USER_VALID_MASTER,
			});
			sessionStorage.setItem('isValidMaster', true)
		})
		.catch((err) => {
			console.log(err);
			//dispatch(returnErrors(err.response.data, err.response.status));
		});
};


export const tokenConfig = (getState) => {
	// Get token from state
	const token = getState().auth.token;

	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// If token, add to headers config
	if (token) {
		config.headers['Authorization'] = `Token ${token}`;
	}

	return config;
};