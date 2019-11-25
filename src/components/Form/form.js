import React from 'react'
import './form.scss';

class ProductForm extends React.Component{

    render() {
        const { onChange, inputError } = this.props;

        return (
            <div className="form-group">
                <label>Product Name</label>
                <form>
                    <small className={inputError ? 'errorMessage': 'errCont'}>{`*${inputError}`}</small>
                    <input type="text"
                           className="form-control"
                           placeholder="name"
                           onChange={onChange}
                           name="ProductName"
                           required
                    />
                </form>
            </div>
        );
    }
}

export default ProductForm
