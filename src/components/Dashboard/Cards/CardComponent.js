import React from 'react'
import CardItem from './CardItem'
import '../../../styles/cardComponent.scss'
import {connect} from "react-redux";
import {getCards} from "../../../redux/actions/cards";

class CardComponent extends React.Component {
	componentDidMount() {
		this.props.getCards()
	}

	render() {
		let cardList = '';
		if (this.props.searchType === 'card' && this.props.searchSortData !== '') {
			cardList = this.props.cardList
				.filter(cardItem => cardItem.number.indexOf(this.props.searchSortData) > 0)
				.map((cardItem) =>
					<CardItem
						id={cardItem.id}
						cardNumber={cardItem.number}
						cardCVV={cardItem.cvv}
						cardPas={cardItem.password}
						cardName={cardItem.name}
						cardDate={cardItem.date}
					/>
				);

		} else {
			cardList = this.props.cardList.map((item) =>
					<CardItem
						id={item.id}
						cardNumber={item.number}
						cardCVV={item.cvv}
						cardPas={item.password}
						cardName={item.name}
						cardDate={item.date}
					/>
				)
		}

		return (
			<div className='row ml-0 mr-0 justify-content-center'>
				{cardList}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	cardList: state.cards.cardList,
	searchType: state.search.searchType,
	searchSortData: state.search.searchSortData,
});

export default connect(mapStateToProps, {getCards})(CardComponent)