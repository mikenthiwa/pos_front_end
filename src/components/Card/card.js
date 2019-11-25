import React, { Component, Fragment } from "react";
import './cardStyle.scss'

class Card extends Component {

    getSingleProduct = (productId) => {
        const { fetchSingleProduct, history } = this.props;
        const url = new URLSearchParams();
        fetchSingleProduct(productId);
        console.log(history)
        history.createHref(`/products/${productId}`)

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
                        { ProductName }
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
