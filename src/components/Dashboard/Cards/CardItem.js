import React from 'react'
import ReactCardFlip from 'react-card-flip';

import AE_Light from '../../../img/payment/AmerExpr_Light.svg'
import AE_Dark from '../../../img/payment/AmerExpr_Dark.svg'
import JCB_Light from '../../../img/payment/JCB_Light.svg'
import JCB_Dark from '../../../img/payment/JCB_Dark.svg'
import MC_Light from '../../../img/payment/Mastercard_Light.svg'
import MC_Dark from '../../../img/payment/Mastercard_Dark.svg'
import VISA_Light from '../../../img/payment/VISA_Light.svg'
import VISA_Dark from '../../../img/payment/VISA_Dark.svg'
import UnionPay from '../../../img/payment/UnionPay_Light.svg'
import Discover_Light from '../../../img/payment/Discover_Light.svg'
import Discover_Dark from '../../../img/payment/Discover_Dark.svg'
import DC_Light from '../../../img/payment/DinersClub_Light.svg'
import DC_Dark from '../../../img/payment/DinersClub_Dark.svg'
import Other_Light from '../../../img/payment/Other_Light.svg'
import Other_Dark from '../../../img/payment/Other_Dark.svg'
import LightLogo from '../../../img/LightLogo.svg'

import Delete from '../../../img/Delete.svg'
import Edit from '../../../img/Edit.svg'

import {connect} from "react-redux";
import {deleteCard} from "../../../redux/actions/cards";
import {sidebarOpenToEdit} from "../../../redux/actions/sidebar";

class CardItem extends React.Component {
	constructor() {
		super();
		this.state = {
			isFlipped: false,
			payment: '',
			stripColor: ''
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		this.setState(prevState => ({isFlipped: !prevState.isFlipped}));
	}

	componentDidMount() {
		switch (true) {
			case (this.props.cardNumber[0] === '3'):
				if (this.props.cardNumber[1] === '0' || this.props.cardNumber[1] === '6' || this.props.cardNumber[1] === '8') {
					(this.props.theme === 'dark') ? this.setState({payment: DC_Dark, stripColor: 'card-item-bg dc'}) : this.setState({payment: DC_Light, stripColor: 'card-item-bg dc'})
				} else if (this.props.cardNumber[1] === '1' || this.props.cardNumber[1] === '5') {
					(this.props.theme === 'dark') ? this.setState({payment: JCB_Dark, stripColor: 'card-item-bg jcb'}) : this.setState({payment: JCB_Light, stripColor: 'card-item-bg jcb'})
				} else if (this.props.cardNumber[1] === '4' || this.props.cardNumber[1] === '7') {
					(this.props.theme === 'dark') ? this.setState({payment: AE_Dark, stripColor: 'card-item-bg ae'}) : this.setState({payment: AE_Light, stripColor: 'card-item-bg ae'})
				} else {
					(this.props.theme === 'dark') ? this.setState({payment: Other_Dark}) : this.setState({payment: Other_Light})
				}
				break;
			case (this.props.cardNumber[0] === '4'):
				(this.props.theme === 'dark') ? this.setState({payment: VISA_Dark, stripColor: 'card-item-bg visa'}) : this.setState({payment: VISA_Light, stripColor: 'card-item-bg visa'});
				break;
			case (this.props.cardNumber[0] === '5'):
				if (this.props.cardNumber[1] === '9') {
					(this.props.theme === 'dark') ? this.setState({payment: Other_Dark}) : this.setState({payment: Other_Light})
				} else {
					(this.props.theme === 'dark') ? this.setState({payment: MC_Dark, stripColor: 'card-item-bg mc'}) : this.setState({payment: MC_Light, stripColor: 'card-item-bg mc'})
				}
				break;
			case (this.props.cardNumber[0] === '6'):
				if (this.props.cardNumber[1] === '0') {
					(this.props.theme === 'dark') ? this.setState({payment: Discover_Dark, stripColor: 'card-item-bg dsc'}) : this.setState({payment: Discover_Light, stripColor: 'card-item-bg dsc'})
				} else if (this.props.cardNumber[1] === '2') {
					this.setState({payment: UnionPay, stripColor: 'card-item-bg up'})
				} else if (this.props.cardNumber[1] === '3' || this.props.cardNumber[1] === '7') {
					(this.props.theme === 'dark') ? this.setState({payment: MC_Dark, stripColor: 'card-item-bg mc'}) : this.setState({payment: MC_Light, stripColor: 'card-item-bg mc'})
				} else {
					(this.props.theme === 'dark') ? this.setState({payment: Other_Dark}) : this.setState({payment: Other_Light})
				}
				break;
			default:
				(this.props.theme === 'dark') ? this.setState({payment: Other_Dark}) : this.setState({payment: Other_Light})
		}
	}

	onDelete = () => {
		this.props.deleteCard(this.props.id)
	};

	isShowCardItemToEdit = () => {
		let cardData = {
			isShowType: 'card',
			sideBarContent: {
				id: this.props. id,
				val1: this.props.cardNumber,
				val2: this.props.cardCVV,
				val3: this.props.cardPas,
				val4: this.props.cardName.split(' ')[0],
				val41: this.props.cardName.split(' ')[1],
				val5: this.props.cardDate,
			}
		};
		this.props.sidebarOpenToEdit(cardData)
	}

	render() {
		return (
			<div className=' mt-5 col-auto'>
				<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
					<div className='card-item shadows' onClick={this.handleClick}>
						<div className={'strip-bottom ' + this.state.stripColor}></div>
						<div className={'strip-top ' + this.state.stripColor}></div>
						<div className='card-item--content-front'>
							<div className='row ml-0 mr-0'>
								<div className='card-item-title text--16-regular'>Pass manager</div>
								<img className='card-item-logo' src={LightLogo} alt=""/>
							</div>
							<div className='card-item-chip'/>
							<div className="card-item-number">
								<div>****</div>
								<div>****</div>
								<div>****</div>
								<div>{this.props.cardNumber.split(' ')[3]}</div>
							</div>
							<div className='card-item-add-info text--14-regular'>Exp. End: {this.props.cardDate.split('/')[0].slice(0, 1).padEnd(2, '*')}/{this.props.cardDate.split('/')[1].slice(0, 1).padEnd(2, '*')}</div>
							<div className='card-item-add-info text--14-regular'>{this.props.cardName.split(' ')[0].slice(0, 1).padEnd(this.props.cardName.split(' ')[0].length, '*')} {this.props.cardName.split(' ')[1].slice(0, 1).padEnd(this.props.cardName.split(' ')[1].length, '*')}</div>
							<img className='card-item-payment' src={this.state.payment}/>
						</div>

					</div>

					<div className='card-item back shadows' onClick={this.handleClick}>
						<div className='card-item-magnet-line'/>
						<div className='card-item--content'>
							<div className="card-item-number">
								<div>{this.props.cardNumber.split(' ')[0]}</div>
								<div>{this.props.cardNumber.split(' ')[1]}</div>
								<div>{this.props.cardNumber.split(' ')[2]}</div>
								<div>{this.props.cardNumber.split(' ')[3]}</div>
							</div>
							<div className='row ml-0 mr-0'>
								<div className='card-item-add-info text--14-regular'>CVV: {this.props.cardCVV}</div>
								<div className='card-item-add-info text--14-regular offset-1'>PAS: {this.props.cardPas}</div>
							</div>
							<div className='row ml-0 mr-0'>
								<div className='card-item-add-info text--14-regular'>{this.props.cardName}</div>
								<div className='card-item-add-info text--14-regular'>{this.props.cardDate}</div>

								<img onClick={this.isShowCardItemToEdit} className='card-item-edit-button' src={Edit} alt=""/>
								<img onClick={this.onDelete} className='card-item-delete-button' src={Delete} alt=""/>
							</div>
						</div>
					</div>
				</ReactCardFlip>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	theme: state.auth.user.theme,
});

export default connect(mapStateToProps, {deleteCard, sidebarOpenToEdit})(CardItem)
