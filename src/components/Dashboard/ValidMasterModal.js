import React, {useState} from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {connect} from "react-redux";
import {validMasterPass} from "../../redux/actions/auth";
import '../../styles/modal.scss'

function ValidMasterModal(props) {

	function validPassword() {
		props.validMasterPass({master_password: document.getElementById('valid_password_modal_input').value})
	}

	function validPasswordDemo() {
		props.validMasterPass({master_password: '1234qw'})
	}

	return (
		<div>
			<Modal show={!props.isValidMaster}>
				<Modal.Header>
					<Modal.Title><span className='text--24-bold'>User verification</span></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='text--16-regular modal-body-text'>Please enter your master password to confirm your account</div>
					<input id='valid_password_modal_input' className='input-filed inner-shadows' type="password"/>
				</Modal.Body>
				<Modal.Footer>
					<button className='button modal-button text--14-medium--blue' onClick={validPasswordDemo}>Demo Account</button>
					<button className='button modal-button text--14-medium--blue' onClick={validPassword}>Confirm</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

const mapStateToProps = (state) => ({
	isValidMaster: state.auth.isValidMaster,
});

export default connect(mapStateToProps, {validMasterPass})(ValidMasterModal)