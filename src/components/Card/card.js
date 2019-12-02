import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import {sokoSocket} from "../../services";
import './cardStyle.scss'

class Card extends Component {

    getSingleProduct = (productId) => {
        const { fetchSingleProduct } = this.props;
        fetchSingleProduct(productId);
    };
    removeProduct = (event, productId) => {
        event.stopPropagation();
        const socket = sokoSocket();
        const { delProduct } = this.props;
        delProduct(productId, socket);
    };
    openModal = (event, productId) => {
        event.stopPropagation();
        const { onShowModal } = this.props;
        onShowModal('updateProduct', productId)
    };

    renderCards = () => {
        const { productData: { data } } = this.props;
        if(data) {
            return data.map(field => {
                const { ProductId, ProductName } = field;
                return (
                    <div
                        className="cardContainer col-sm-2 mr-4 mb-2" key={ProductId}
                        onClick={() => this.getSingleProduct(ProductId)}
                    >
                        <div className='iconCont'>
                            <div
                                onClick={(event) => this.openModal(event, ProductId)}
                            >
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    color='blue'
                                    className='faEdit'
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    color='blue'
                                    onClick={(event) => this.removeProduct(event, ProductId)}
                                />
                            </div>
                        </div>
                        <div className='prodName'>{ ProductName }</div>
                    </div>
                )
            })
        }
    };
    render() {
        return (
            <Fragment>
            {this.renderCards()}
            </Fragment>
        );
    }
}

export default Card;
