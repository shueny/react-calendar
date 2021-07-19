import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';


import './Header.css'

const Index = (props) => {
    const { current, state, onChangeState, onChangeMonth, monthFormat } = props;
    const month = current.getMonth();
    const year = current.getFullYear()
    console.log(current)
    return (
        <div className='cal-calendar-header'>
            <div className="cal-calendar-header-container">
                <button onClick={ () => onChangeMonth(month - 1) }>
                    <FontAwesomeIcon icon={ faAngleLeft } /></button>
                <div className="cal-calendar-header-title-container item-clickable" onClick={ () => onChangeState(state === 'date' ? 'month' : 'year') }>
                    <span className='cal-calendar-header-title'>{ monthFormat[month] }</span>
                    <span className='cal-calendar-header-title'>{ year }</span>
                </div>
                <button onClick={ () => onChangeMonth(month + 1) }>
                    <FontAwesomeIcon icon={ faAngleRight } /></button>
            </div>
        </div>
    );
};

export default Index;
