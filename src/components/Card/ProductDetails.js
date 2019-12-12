import React from 'react';
import _ from 'lodash';
import './productDetails.scss';


class ProductDetails extends React.Component {

    renderProductDetails = (typeTitle, productName) => {
        return (
            <div className='title'>
                <div className='typeTitle'>{typeTitle}:</div>
                <div className='productName'>{productName}</div>
            </div>
        )
    };
    render() {
        const { productData: { product }} = this.props;
        return (
            <div className="productCardCont">
                <div className="productImage" />
                <div className="productDetails">
                    {this.renderProductDetails(
                        'Product Name',
                        _.isEmpty(product) ? '' : product.ProductName,
                    )}

                </div>
            </div>
        );
    }
}

export default ProductDetails;
