import React from 'react';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import './cartPage.css';

export default class CartPageItemImageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            galleryIndex: 0,
        };
    }

    decrementGalleryIndex() {
        let index = this.state.galleryIndex;
        index -= 1;
        if (index === -1) {
            index = this.props.data.length - 1;
        }
        this.setState(() => ({ galleryIndex: index }));
    }

    incrementGalleryIndex() {
        let index = this.state.galleryIndex;
        index += 1;
        if (index === this.props.data.length) {
            index = 0;
        }
        this.setState(() => ({ galleryIndex: index }));
    }

    render() {
        let data = this.props.data
        return (
            <div className="item-image-container">
                {data?.length > 1 ? (
                    <div className="item-image-button-container">
                        <button
                            className="item-image-button"
                            type="button"
                            onClick={() => this.decrementGalleryIndex()}
                        >
                            <BiChevronLeft />
                        </button>
                        <button
                            className="item-image-button button2"
                            type="button"
                            onClick={() => this.incrementGalleryIndex()}
                        >
                            <BiChevronRight />
                        </button>
                    </div>
                ) : null}
                <img className="item-image" src={data[this?.state?.galleryIndex]} alt="img" />
            </div>
        );
    }
}
