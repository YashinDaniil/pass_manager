import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {sidebarOpenShow, sidebarOpenToEdit} from "../../../redux/actions/sidebar";
import {deletePassword} from "../../../redux/actions/passwords";

let zxcvbn = require('zxcvbn');
function PasswordItem(props) {

	let lineClassName = 'password-item-status-line-color';
	let lineColorWidthStyle = {width: props.reliability + '%'};
	let passReliability =zxcvbn(props.password).score;

	switch (passReliability) {
		case 0:
			lineClassName = 'password-item-status-line-color color-line--bad';
			lineColorWidthStyle = {width: '5%'};
			break;
		case 1:
			lineClassName = 'password-item-status-line-color color-line--bad';
			lineColorWidthStyle = {width: '20%'};
			break;
		case 2:
			lineClassName = 'password-item-status-line-color color-line--normal';
			lineColorWidthStyle = {width: '50%'};
			break;
		case 3:
			lineClassName = 'password-item-status-line-color color-line--good';
			lineColorWidthStyle = {width:  '80%'};
			break;
		case 4:
			lineClassName = 'password-item-status-line-color color-line--perfect';
			lineColorWidthStyle = {width: '100%'};
			break;
	}


	const faviconUrl = props.url + '/favicon.ico';
	
	function isShowPasswordItem(type) {
		let passwordData = {
			isShowType: 'password',
			sideBarContent: {
				id: props. id,
				val1: props.url,
				val2: props.name,
				val3: props.username,
				val4: props.password,
				val5: props.category,
			}
		};

		if (type === 'show'){
			props.sidebarOpenShow(passwordData)
		} else {
			props.sidebarOpenToEdit(passwordData)
		}
	}

	function copyPassword() {
	  const el = document.createElement('textarea');
	  el.value = props.password;
	  document.body.appendChild(el);
	  el.select();
	  document.execCommand('copy');
	  document.body.removeChild(el);
	  //this.props.alert.success('Copy!', {...options})
	};



	return (
		<div className='password-item shadows'>
			<div className='row ml-0'>
				<div className='row col '>
					<div className='password-item-img-block inner-shadows'>
						<img className='password-item-img-block-pic' src={faviconUrl} alt=""/>
					</div>
					<div className='password-item-title  text--24-bold'>{props.name}</div>
				</div>

				<div className='col'>
					<div className='password-item-cathegory text--18-regular--blue'>{props.category}</div>
					<div className='row ml-0 mt-10'>
						<div className='password-item-status-line-color-base'>
							<div className={lineClassName} style={lineColorWidthStyle}/>
						</div>
					</div>
				</div>
			</div>
			<div className='row mt-15 ml-0'>
				<button className='password-item-button text--14-medium--blue' onClick={copyPassword}>Copy</button>
				<button className='password-item-button text--14-medium--blue' onClick={isShowPasswordItem.bind(this, 'show')}>Show</button>
				<button className='password-item-button mr-auto text--14-medium--blue'onClick={isShowPasswordItem.bind(this, 'edit')}>Change</button>
				<button className='password-item-button delete-button text--14-medium--red' onClick={() => props.deletePassword(props.id)}>Delete</button>
			</div>
		</div>
	)
}

export default connect(null, {sidebarOpenShow,sidebarOpenToEdit, deletePassword})(PasswordItem);