import {combineReducers} from 'redux';
import auth from './auth';
import sidebar from './sidebar';
import passwords from './passwords';
import search from './search'

export default combineReducers({
	auth,
	sidebar,
	passwords,
	search
});