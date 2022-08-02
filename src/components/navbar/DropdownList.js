import React, { Component } from "react";
import "./NavbarStyles.css";

export default class DropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('state')) ||
        {
            displayedCurrency: '$'
        }
    }


    render() {
        const { displayedCurrency } = this.state;
        const { color, fontSize } = this.props;
        const { updateState } = this.props;
      

        const setCurrency = (e) => {

            if (e.target.value === '¥') {
                updateState({ postPounds: false, postDollar: false, postYen: true, displayedCurrency: '¥' });

            } else if (e.target.value === '£') {
                updateState({
                    postPounds: true, postDollar: false, postYen: false, displayedCurrency: '£'
                })

            }
            else if (e.target.value === '$') {
                updateState({ postPounds: false, postDollar: true, postYen: false, displayedCurrency: '$' })
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
                    <option role="placeholder" id='hidden-option' >
                      {displayedCurrency}
                    </option>

                    <option value='$' > $ USD</option>

                    <option value='£' > £ GBP</option>

                    <option value='¥' > ¥ JPY</option>

                </select>
            </div >
        );
    }
}