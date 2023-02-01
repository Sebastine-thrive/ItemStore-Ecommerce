import React, { Component } from "react";
import "./nav.css";

export default class CurrencyDropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem('state')) ||
        {
            displayedCurrency: '$'
        }
    }

    render() {
        const { displayedCurrency } = this.state;
        const { color, fontSize, updateState } = this.props;


        const setCurrency = (e) => {

            if (displayedCurrency === "$") {
                updateState({
                    ...this.props.state, postPounds: false, postDollar: true, postYen: false
                })
            }

            if (e.target.value === '¥') {
                updateState({ ...this.props.state, postPounds: false, postDollar: false, postYen: true, displayedCurrency: '¥' });

            } else if (e.target.value === '£') {
                updateState({
                    ...this.props.state,
                    postPounds: true, postDollar: false, postYen: false, displayedCurrency: '£'
                })

            }
            else if (e.target.value === '$') {
                updateState({ ...this.props.state, postPounds: false, postDollar: true, postYen: false, displayedCurrency: '$' })
            }
        }

        return (
            <div className='dropdown' >
                <select
                    className='dropdown-select'
                    name='currency'
                    id='selectedCurrency'
                    style={{ color, fontSize }}
                    onChange={(e) => setCurrency(e)}
                >
                    <option  id='hidden-option'>
                        {displayedCurrency}
                    </option>

                    <option value='$' > $ </option>

                    <option value='£' > £ </option>

                    <option value='¥' > ¥ </option>
                </select>
            </div >
        );
    }
}