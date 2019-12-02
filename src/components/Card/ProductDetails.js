import React from 'react';
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
        const { productData: { product: {ProductName} }} = this.props;
        return (
            <div className="productCardCont">
                <div className="productImage" />
                <div className="productDetails">
                    {this.renderProductDetails(
                        'Product Name',
                        ProductName
                    )}
                    {this.renderProductDetails('Quantity')}
                    {this.renderProductDetails('Price')}
                </div>
            </div>
        );
    }
}

export default ProductDetails;
