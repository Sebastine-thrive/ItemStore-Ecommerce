import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import NavButton from "./NavButton";
import DropdownList from "./DropdownList";
import CartCard from "./CartCard";


// import { NavButton, DropdownList, CartCard, } from "./NavbarComponents";
import { FiShoppingCart } from 'react-icons/fi';
import { BsFillBagCheckFill } from "react-icons/bs";
import "./NavbarStyles.css";


class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCartOpen: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.generalClick = this.generalClick.bind(this);
        // this.remove = this.remove.bind(this);
    }

    handleClick() {
        var mainBody = document.getElementById('mainbody')
        mainBody.classList.toggle("dark-background");

        var inactive = document.querySelector('.dark-background')
        inactive.addEventListener('click', (event) => {
            event.preventDefault();
        });
    }

    generalClick() {
        this.handleClick();
        this.setState({ isCartOpen: true });
    }

    render() {

        const { isCartOpen } = this.state;
        const { updateState } = this.props;


        return (
            <div className="nav" >

                <div className='nav-subgroup'>
                    <nav className='nav-links'>
                        
                            <NavLink to="/" exact activeClassName="active" 
                             active > All </NavLink>
                    

                        
                            <NavLink to='/clothes' activeClassName="active"> Clothes </NavLink>
                        

                        
                            <NavLink to='/tech' activeClassName="active"> Tech </NavLink>
                        
                    </nav>
                </div>

                <div className="nav-subgroup">
                    <Link to='/product'>
                        <NavButton
                            color='#03C03C'
                            fontSize='1.8rem'
                            border='none'
                            backgroundColor='transparent'
                            icon={<BsFillBagCheckFill
                                cursor='pointer'

                            />}
                        />
                    </Link>
                </div>

                <div className="nav-subgroup ">
                    <div className="dropdown-body">
                        <DropdownList
                            color='#6082B6'
                            fontSize='1.3rem'
                            updateState={updateState}
                        />

                    </div>

                    <div className="cart-features">
                        <NavButton
                            color='#6082B6'
                            fontSize='1.2rem'
                            border='none'
                            backgroundColor='transparent'
                            id='cart'
                            icon={<FiShoppingCart />}
                        />
                        <button
                            className='dot-button'
                            onClick={this.generalClick}
                        >
                            {/* CN */}
                        </button>

                        {isCartOpen && <CartCard
                        />}

                    </div>

                </div>

            </div>
        )
    }
};
export default Navbar