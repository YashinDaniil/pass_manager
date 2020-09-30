import {combineReducers} from 'redux';
import auth from './auth';
import sidebar from './sidebar';
import passwords from './passwords';
import search from './search'
import navigation from './navigation'
import cards from './cards'

export default combineReducers({
	auth,
	sidebar,
	passwords,
	search,
	navigation,
	cards,
});