import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import CustomCard from './card';
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
    renderIcons = (actionType, iconType, color, className) => (
        <div onClick={actionType}>
            <FontAwesomeIcon
                icon={iconType}
                color={color}
                className={className}
            />
        </div>
    );



    renderCard = () => {
        const { productData: { data } } = this.props;
        if(data) {
            return data.map(field => {
                const { ProductId, ProductName } = field;
                return (
                    <CustomCard
                        key={ProductId}
                        getSingleProduct={() => this.getSingleProduct(ProductId)}
                    >
                        <div className='iconCont'>
                            {this.renderIcons(
                                event => this.openModal(event, ProductId),
                                faEdit, 'blue', 'faEdit')
                            }
                            {this.renderIcons(
                                event => this.removeProduct(event, ProductId),
                                faTrash, 'blue')
                            }
                        </div>
                        <div className='prodName'>{ ProductName }</div>
                    </CustomCard>
                )
            })
        }
    };

    render() {
        return (
            <Fragment>
            {this.renderCard()}
            </Fragment>
        );
    }
}

export default Card;
