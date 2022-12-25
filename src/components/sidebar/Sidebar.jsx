import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';

import './sidebar.css';


export class Sidebar extends Component {
  

    render() {

        let categoryNameArray = this.props.categoryNameArray;
        const { updateState } = this.props;
        
        this.closeSideMenu = () => {
            updateState({ ...this.props.state, sideMenu: false })
        }

        return (
            <div className='sidebar-body'>
                <div className='cancel-button'>
                    <button >
                        <MdOutlineCancel
                            color='red'
                            onClick={this.closeSideMenu}
                        />
                    </button>

                </div>
                <div className='side-links'>
                    <div className='link' onClick={this.closeSideMenu}
                    >
                        {categoryNameArray?.map((piece, index) => {
                            return (
                                <div className='each-link' key={index} 
                                >
                                    <NavLink
                                        to={`/${piece.name}`}
                                        exact="true"
                                    > {piece.name} </NavLink>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar