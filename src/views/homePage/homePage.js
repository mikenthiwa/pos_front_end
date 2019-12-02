import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchProducts,
    newProduct,
    fetchSingleProduct,
    delProduct,
    updateProduct
} from '../../redux/actions/productActions'
import NavBar from "../../components/navBar/navBar";
import Card from '../../components/Card/card';
import ProductDetails from '../../components/Card/ProductDetails';
import ProductForm from '../../components/Form/form';
import ModalType from "../../components/modal/modalType";
import 'react-toastify/dist/ReactToastify.css';
import './homePage.scss';

import { sokoSocket } from "../../services";

let socket;
class App extends Component {
    state = {
        isModalVisible: false,
        productForm: {
            ProductName: ''
        },
        error: "",
        products: [],
        modalType: "",
        productId: "",
    };

    componentDidMount() {
        socket = sokoSocket();
        const { fetchProducts } = this.props;
        fetchProducts(socket);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { productData: {isModalVisible, data}} = nextProps;
        this.setState({ isModalVisible, products: data});
    }

    onShowModal = (actionType, productId) => {
        this.setState({
            isModalVisible: true,
            modalType: actionType,
            productId: productId,
        })
    };
    closeModal = () => this.setState({
        isModalVisible: false,
        error: '',
    });
    onChange = (event) => {
        const { target: { name, value }} = event;
        this.setState(prevState => ({
            ...prevState,
            productForm: {
                ...prevState.productForm, [name]: value
            },
            error: '',
        }));
    };

    onSubmit = () => {
        const { newProduct, updateProduct }  = this.props;
        const {productForm: { ProductName }, modalType, productId} = this.state;
        if(!ProductName){
            this.setState({error: "required"})
        }else {
            if(modalType === 'addProduct') {
                newProduct(this.state.productForm, socket);
            }else {
               updateProduct(this.state.productForm, productId, socket)
            }
        }
    };


    render() {
        const { productData, fetchSingleProduct, history, delProduct } = this.props;
        const { isModalVisible, error, modalType } = this.state;

        return (
            <div className="App container-fluid">
                <NavBar />
                <div className="homeContainer">
                    <div className="productsContainer col-8">
                        <div className="productsHeader row">
                            <div className='col-10 productTypesContainer'>
                                <div className="types">
                                    <span className='items'>Groceries</span>
                                </div>
                            </div>
                            <div className='col-2 buttonContainer'>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm btn-block "
                                    onClick={() => this.onShowModal('addProduct')}
                                >
                                    Add Product
                                </button>
                            </div>
                        </div>
                        <div className="productCont row">
                            <Card
                                productData={productData}
                                fetchSingleProduct={fetchSingleProduct}
                                delProduct={delProduct}
                                history={history}
                                onShowModal={this.onShowModal}
                            />
                        </div>
                    </div>
                    <div className="transactionContainer col-4">
                        <div className="row">
                            <ProductDetails
                                productData={productData}
                                fetchSingleProduct={fetchSingleProduct}
                            />
                        </div>
                    </div>
                </div>
                <ModalType
                    modalType={modalType}
                    isModalVisible={isModalVisible}
                    closeModal={this.closeModal}
                    onSubmit={this.onSubmit}
                >
                    <ProductForm onChange={this.onChange} inputError={error} />
                </ModalType>
            </div>
        );
  }
}

const mapStateToProps = state => ({
    productData: state.productReducer,
});

const mapDispatchToProps = () => ({
    fetchProducts,
    newProduct,
    fetchSingleProduct,
    delProduct,
    updateProduct,
});

export default connect(mapStateToProps, mapDispatchToProps())(App);
