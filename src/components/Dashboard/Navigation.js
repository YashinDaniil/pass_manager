import React, { useEffect } from 'react';

import '../../styles/navigation.scss'

import PassIcon from '../../img/PassIcon.svg'
import NoteIcon from '../../img/NoteIcon.svg'
import LocationIcon from '../../img/LocationIcon.svg'
import CardIcon from '../../img/CardIcon.svg'
import SettingsIcon from '../../img/SettingsIcon.svg'
import {changeNav} from "../../redux/actions/navigation";
import {connect} from "react-redux";

const Navigation = (props) => {
	useEffect(() => {
        [...document.querySelectorAll('.navigation-item')].map(x => x.classList.remove('active'));
			document.querySelectorAll('.navigation-item')[props.navigation].classList.add('active');
  });
	return (
		<div className='navigation-block shadows'>
			<div onClick={props.changeNav.bind(this, 0)} className='navigation-item first'><img className='navigation-item-img' src={PassIcon} alt=""/></div>
			<div className='navigation-item'><img className='navigation-item-img' src={NoteIcon} alt=""/></div>
			<div className='navigation-item'><img className='navigation-item-img' src={LocationIcon} alt=""/></div>
			<div onClick={props.changeNav.bind(this, 3)} className='navigation-item'><img className='navigation-item-img' src={CardIcon} alt=""/></div>
			<div className='navigation-item last'><img className='navigation-item-img' src={SettingsIcon} alt=""/></div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	navigation: state.navigation.navState
});

export default connect(mapStateToProps, {changeNav})(Navigation)
