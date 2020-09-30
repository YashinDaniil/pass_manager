import React from 'react';
import Sidebar from "react-sidebar";

import PassIcon from '../../img/PassIcon.svg'
import NoteIcon from '../../img/NoteIcon.svg'
import LocationIcon from '../../img/LocationIcon.svg'
import CardIcon from '../../img/CardIcon.svg'

import '../../styles/sidebar.scss'
import {connect} from "react-redux";
import {sidebarClose, sidebarEditInput, sidebarOpen, sidebarOpenToEdit} from "../../redux/actions/sidebar";
import {addPassword, editPassword} from "../../redux/actions/passwords";
import {addCard, editCard} from "../../redux/actions/cards";
import InputMask from "react-input-mask";
import MaskedInput from 'react-text-mask'
class DashboardSidebar extends React.Component {
	state = {
		step: 0,
		selectedItem: '',
		isEditMode: this.props.sidebarOpenToEdit,
	};

	onChangeGlobalState = (e) => {
		this.props.sidebarEditInput({name: e.target.name, value: e.target.value})
	};

	onClearState = () => {
		this.props.sidebarEditInput({name: 'val1', value: ''});
		this.props.sidebarEditInput({name: 'val2', value: ''});
		this.props.sidebarEditInput({name: 'val3', value: ''});
		this.props.sidebarEditInput({name: 'val4', value: ''});
		this.props.sidebarEditInput({name: 'val41', value: ''});
		this.props.sidebarEditInput({name: 'val5', value: ''});
		this.setState({
			step: 0,
			selectedItem: '',
		})
	};


	onSetSidebarOpen = (open) => {
		if (!open) {
			this.props.sidebarClose();
			setTimeout(() => this.setState({step: 0, selectedItem: ''}), 400)
		}
	};

	generatePassword = () => {
		const newPass = Array(20)
			.fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$')
			.map(x => x[Math.floor(crypto.getRandomValues(new Uint32Array(3))[0] / (0xffffffff + 3) * x.length)])
			.join('');
		this.props.sidebarEditInput({name: 'val4', value: newPass})
	};

	onChangeStep = (step, selectedItem) => this.setState({step: step, selectedItem: selectedItem});

	onSaveNewItem = () => {
		switch (this.state.selectedItem) {
			case 'password':
				if (this.props.sideBarContent.val1 !== '' &&
					this.props.sideBarContent.val !== '' &&
					this.props.sideBarContent.val3 !== '' &&
					this.props.sideBarContent.val4 !== ''
				) {
					this.props.addPassword(this.props.sideBarContent)
				}
				break;
			case 'card':
				if (this.props.sideBarContent.val1 !== '' &&
					this.props.sideBarContent.val !== '' &&
					this.props.sideBarContent.val3 !== '' &&
					this.props.sideBarContent.val4 !== '' &&
					this.props.sideBarContent.val41 !== ''
				) {
					this.props.addCard(this.props.sideBarContent)
				}
		}
	};

	onEditItem = () => {
		switch (this.props.isShowType) {
			case 'password':
				this.props.editPassword(this.props.sideBarContent);
				break;
			case 'card':
				this.props.editCard(this.props.sideBarContent);
				break;
		}
	};

	render() {
		let sideBgColor = (document.querySelector('body').className === 'dark') ? '#191919' : '#f3f9ff';
		let styles = {sidebar: {background: sideBgColor, borderBottomLeftRadius: '15px', borderTopLeftRadius: '15px'}, width: '555px'};

		let stepZero = (
			<div className='sidebar-block-add-content row'>
				<div onClick={this.onChangeStep.bind(this, 1, 'password')} className='sidebar-block-add-content-item mr-auto'>
					<img className='sidebar-block-add-content-item-pic' src={PassIcon} alt=""/>
					<div className='text--21-medium--sidebar'>Password</div>
				</div>
				<div className='sidebar-block-add-content-item disabled mr-auto'> {/* onClick={this.onChangeStep.bind(this, 1, 'note')} */}
					<img className='sidebar-block-add-content-item-pic' src={NoteIcon} alt=""/>
					<div className='text--21-medium--sidebar'>Notes</div>
				</div>
				<div className='sidebar-block-add-content-item disabled'> {/* onClick={this.onChangeStep.bind(this, 1, 'location')} */}
					<img className='sidebar-block-add-content-item-pic' src={LocationIcon} alt=""/>
					<div className='text--21-medium--sidebar'>Address</div>
				</div>
				<div onClick={this.onChangeStep.bind(this, 1, 'card')} className='sidebar-block-add-content-item'>
					<img className='sidebar-block-add-content-item-pic card-last' src={CardIcon} alt=""/>
					<div className='text--21-medium--sidebar'>Card</div>
				</div>
			</div>
		);
		let inputNames = {
			inputFieldOne: '',
			inputFieldTwo: '',
			inputFieldThree: '',
			inputFieldFour: '',
			inputFieldFive: '',
		};

		switch ((this.props.isShowMode || this.props.isEditMode || this.props.isEditMode) ? this.props.isShowType : this.state.selectedItem) {
			case 'password':
				inputNames.inputFieldOne = 'Url';
				inputNames.inputFieldTwo = 'Name';
				inputNames.inputFieldThree = 'Username';
				inputNames.inputFieldFour = 'Password';
				inputNames.inputFieldFive = 'Category';
				break;
			case 'note':
				inputNames.inputFieldOne = '';
				inputNames.inputFieldTwo = '';
				inputNames.inputFieldThree = '';
				inputNames.inputFieldFour = '';
				inputNames.inputFieldFive = '';
				break;
			case 'location':
				inputNames.inputFieldOne = 'Country';
				inputNames.inputFieldTwo = 'City';
				inputNames.inputFieldThree = 'Street';
				inputNames.inputFieldFour = 'House';
				inputNames.inputFieldFive = 'Flat';
				break;
			case 'card':
				inputNames.inputFieldOne = 'Number';
				inputNames.inputFieldTwo = 'Cvv';
				inputNames.inputFieldThree = 'Password';
				inputNames.inputFieldFour = ['Name', 'Lastname'];
				inputNames.inputFieldFive = 'Date';
				break;
			default:
				inputNames.inputFieldOne = '';
				inputNames.inputFieldTwo = '';
				inputNames.inputFieldThree = '';
				inputNames.inputFieldFour = '';
				inputNames.inputFieldFive = '';
		}


		let stepOne = (
			<div className='sidebar-block-add-content input-list'>
				<div className='sidebar-block-add-content-input-item'>
					<div className='text--16-bold'>{inputNames.inputFieldOne}</div>
					<InputMask className='inner-shadows input-filed sidebar-search sidebar-block-input' mask={(this.state.selectedItem === 'card' || this.props.isShowType === 'card') ? '9999 9999 9999 9999' : null} name={'val1'} onChange={this.onChangeGlobalState}
					           value={this.props.sideBarContent.val1}/>
				</div>
				<div className='sidebar-block-add-content-input-item'>
					<div className='text--16-bold'>{inputNames.inputFieldTwo}</div>
					<InputMask className='inner-shadows input-filed sidebar-search sidebar-block-input' mask={(this.state.selectedItem === 'card' || this.props.isShowType === 'card') ? '999' : null} name={'val2'} onChange={this.onChangeGlobalState}
					           value={this.props.sideBarContent.val2}/>
				</div>
				<div className='sidebar-block-add-content-input-item'>
					<div className='text--16-bold'>{inputNames.inputFieldThree}</div>
					<InputMask className='inner-shadows input-filed sidebar-search sidebar-block-input' mask={(this.state.selectedItem === 'card' || this.props.isShowType === 'card') ? '9999' : null} name={'val3'} onChange={this.onChangeGlobalState}
					           value={this.props.sideBarContent.val3}/>
				</div>

				{(this.state.selectedItem === 'password' || this.props.isShowType === 'password') ?
					<div className='sidebar-block-add-content-input-item'>
						<div className='text--16-bold'>{inputNames.inputFieldFour}</div>
						<input className='inner-shadows input-filed sidebar-search sidebar-block-input' type="text" name='val4' value={this.props.sideBarContent.val4}
						       onChange={this.onChangeGlobalState}/>
						<div className='text--14-regular  sidebar-block-generate' onClick={this.generatePassword}>Generate</div>
					</div>
					:
					<div className='sidebar-block-add-content-input-item'>
						<div className="row ml-0">
							<div className='col-6 pl-0'>
								<div className='text--16-bold'>{inputNames.inputFieldFour[0]}</div>
								<InputMask className='inner-shadows input-filed sidebar-search sidebar-block-input'
								           mask={[/[A-Z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/]}
								           name={'val4'}
								           onChange={this.onChangeGlobalState}
								           value={this.props.sideBarContent.val4}
								           maskPlaceholder={''}
								/>
							</div>
							<div className='col-6 pl-0'>
								<div className='text--16-bold'>{inputNames.inputFieldFour[1]}</div>
								<InputMask className='inner-shadows input-filed sidebar-search sidebar-block-input'
								           mask={[/[A-Z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/, /[a-z]/]}
								           name={'val41'}
								           onChange={this.onChangeGlobalState}
								           value={this.props.sideBarContent.val41}
								           maskPlaceholder={''}
								/>
							</div>
						</div>
					</div>
				}


				{(this.state.selectedItem === 'password' || this.props.isShowType === 'password') ?
					<div className='sidebar-block-add-content-input-item'>
						<div className='text--16-bold'>{inputNames.inputFieldFive}</div>
						<select className='inner-shadows input-filed sidebar-search sidebar-block-input select-data' id="category" name="val5" onChange={this.onChangeGlobalState}>
							<option selected={(this.props.sideBarContent.val5 === 'Other')} value="Other">Other</option>
							<option selected={(this.props.sideBarContent.val5 === 'Develop')} value="Develop">Develop</option>
							<option selected={(this.props.sideBarContent.val5 === 'Design')} value="Design">Design</option>
							<option selected={(this.props.sideBarContent.val5 === 'Hobby')} value="Hobby">Hobby</option>
							<option selected={(this.props.sideBarContent.val5 === 'Work')} value="Work">Work</option>
							<option selected={(this.props.sideBarContent.val5 === 'Social Network')} value="Social Network">Social Network</option>
						</select>
					</div> :
					<div className='sidebar-block-add-content-input-item'>
						<div className='text--16-bold'>{inputNames.inputFieldFive}</div>
						<input className='inner-shadows input-filed sidebar-search sidebar-block-input' type={(this.state.selectedItem || this.props.isShowType === 'card') ? 'month' : 'text'}
						       name='val5'
						       value={(this.props.sideBarContent.val5.indexOf('/') !== -1) ? 20 + this.props.sideBarContent.val5.split('/')[1]+'-'+this.props.sideBarContent.val5.split('/')[0] : this.props.sideBarContent.val5}
						       onChange={this.onChangeGlobalState}/>
					</div>
				}

				<div className='sidebar-block-add-bottom-block fixed-bottom'>
					{(this.props.isEditMode) ?
						<button className='button sidebar-button' onClick={this.onEditItem}>Save</button> :
						(this.props.isOpen && this.state.step === 1 && !this.props.isShowMode) ?
							<button className='button sidebar-button' onClick={this.onSaveNewItem}>Save</button> :
							''
					}
					{(!this.props.isEditMode) ?
						<div className='sidebar-back row' onClick={this.onClearState}>
							<div className="arrow arrow-left" title="Previous"></div>
							<div className='sidebar-back-title text--16-medium'>Back</div>
						</div> : ''
					}
				</div>
			</div>
		);

		let stepIsShow = (
			<div className='sidebar-block-add-content input-list'>
				<div className='sidebar-block-add-content-input-item row'>
					<div className='text--16-bold col-3'>{inputNames.inputFieldOne}</div>
					<div className='text--16-regular col-8'>{this.props.sideBarContent.val1}</div>
				</div>
				<div className='sidebar-block-add-content-input-item row'>
					<div className='text--16-bold col-3'>{inputNames.inputFieldThree}</div>
					<div className='text--16-regular col-8'>{this.props.sideBarContent.val3}</div>
				</div>
				<div className='sidebar-block-add-content-input-item row'>
					<div className='text--16-bold col-3'>{inputNames.inputFieldFour}</div>
					<div className='text--16-regular col-8'>{this.props.sideBarContent.val4}</div>
				</div>
				<div className='sidebar-block-add-content-input-item row'>
					<div className='text--16-bold col-3'>{inputNames.inputFieldFive}</div>
					<div className={(this.props.isShowType === 'password') ? 'text--16-regular--blue col-8' : 'text--16-regular col-8'}>{this.props.sideBarContent.val5}</div>
				</div>
			</div>
		);

		let content = (
			<div className='sidebar-block'>
				<div className='sidebar-header'>
					{(this.props.isShowMode) ?
						(this.props.isShowType === 'password') ?
							<div className='row'>
								<div className='password-item-img-block inner-shadows'>
									<img className='password-item-img-block-pic' src={this.props.sideBarContent.val1 + '/favicon.ico'} alt=""/>
								</div>
								<div className='text--30-medium password-item-title mr-auto'>{this.props.sideBarContent.val2}</div>
								<div onClick={() => this.onSetSidebarOpen(false)} className='sidebar-header-plus mt-15'></div>
							</div> :
							<div>
								<div className='row'>
									<div className='text--30-medium password-item-title mr-auto'>{this.props.sideBarContent.val2}</div>
									<div onClick={() => this.onSetSidebarOpen(false)} className='sidebar-header-plus mt-15'></div>
								</div>
							</div>
						:
						<div className='row'>
							<div className='text--30-medium mr-auto'>{(this.props.isEditMode) ? 'Edit ' + this.props.isShowType : 'Add new ' + this.state.selectedItem}</div>
							<div onClick={() => this.onSetSidebarOpen(false)} className='sidebar-header-plus'></div>
						</div>
					}
				</div>
				{(this.props.isShowMode) ? stepIsShow : (this.state.step === 0 && !this.props.isEditMode) ? stepZero : stepOne}
			</div>
		);

		return (
			<Sidebar
				sidebar={content}
				open={this.props.isOpen}
				onSetOpen={this.onSetSidebarOpen}
				styles={styles}
				pullRight={true}
				shadow={true}
			>
				{this.props.children}
			</Sidebar>
		)
	}
}

const mapStateToProps = (state) => ({
	isOpen: state.sidebar.isOpen,
	sideBarContent: state.sidebar.sideBarContent,
	isShowMode: state.sidebar.isShowMode,
	isShowType: state.sidebar.isShowType,
	isEditMode: state.sidebar.isEditMode
});

export default connect(mapStateToProps, {sidebarOpen, sidebarOpenToEdit, sidebarClose, sidebarEditInput, addPassword, editPassword, addCard, editCard})(DashboardSidebar)