import { Component } from "react";
import {  NavLink } from "react-router-dom";
import NavButton from "./NavButton";
import DropdownList from "./DropdownList";
import { connect } from 'react-redux';

import { FiShoppingCart } from 'react-icons/fi';
import { BsFillBagCheckFill } from "react-icons/bs";
import { AiOutlineMenu } from 'react-icons/ai';

import "./nav.css";



const mapStateToProps = (state) => {
    return {
        quantity: state.totalQuantity,
        itemsList:state.itemsList
    }
}

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCartOpen: false,
        }
     
    }
    render() {
        let totalQuantity = this.props.quantity;

        const { updateState } = this.props;
        let state = this.props.state;
        let menu = state.menu;
                
        let categoryNameArray = this.props.categoryNameArray;


        return (
            <div className="nav" >

                <div className='nav-subgroup1'>
                    <div className='nav-links'>

                        {categoryNameArray?.map((item, index) => {
                            return (
                                <NavLink
                                    to={`/${item.name}`}
                                    key={index}
                                    // onClick={() => updateState({...this.props.state, menu: item.name})}
                                    exact="true"
                                > {item.name} </NavLink>
                            )
                        })}
                    </div>

                    <div
                        className='outline-links'
                        onClick={() => updateState({ ...this.props.state, sideMenu:true})}
                    
                    >
                        <NavButton
                            color='#6082B6'
                            fontSize='1.5rem'
                            border='none'
                            backgroundColor='transparent'
                            icon={<AiOutlineMenu />}
                            cursor='pointer'
                            // onClick={() => updateState({ ...this.props.state, sideMenu:true })}

                        // customFunc={() => setActiveMenu(true) }
                        />
                    </div>
                </div>

                <div className="nav-subgroup">
                    <NavButton
                        color='#03C03C'
                        fontSize='1.8rem'
                        border='none'
                        backgroundColor='transparent'
                        icon={<BsFillBagCheckFill />}
                        cursor='pointer'

                    />
                </div>

                <div className="nav-subgroup ">
                    <div className="dropdown-body">
                        <DropdownList
                            color='#6082B6'
                            fontSize='1.3rem'
                            updateState={updateState}
                            state={state}
                        />

                    </div>

                    <div className="cart-features">
                        <NavButton
                            color='#6082B6'
                            fontSize='1.1rem'
                            border='none'
                            backgroundColor='transparent'
                            id='cart'
                            icon={<FiShoppingCart />}
                        />

                        {totalQuantity >= 1 ? (
                            <button
                                className='badge-button'
                                onClick={() => updateState({...this.props.state, cartModalOpen: true})}
                            >
                                {totalQuantity}
                            </button>

                         ) : null}

                    </div>

                </div>

            </div>
        )
    }
}

export default connect(mapStateToProps)(Navbar);
