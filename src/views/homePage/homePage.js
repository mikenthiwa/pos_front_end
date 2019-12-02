import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, newProduct, fetchSingleProduct } from '../../redux/actions/productActions'
import NavBar from "../../components/navBar/navBar";
import Card from '../../components/Card/card';
import ProductModal from '../../components/modal/modal';
import ProductDetails from '../../components/Card/ProductDetails';
import ProductForm from '../../components/Form/form';
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
        products: []
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

    onShowModal = () => this.setState({ isModalVisible: true });
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
        const { newProduct }  = this.props;
        const {productForm: { ProductName }} = this.state;
        if(!ProductName){
            this.setState({error: "required"})
        }else {
            newProduct(this.state.productForm, socket);
        }
    };


    render() {
        const { productData, fetchSingleProduct, history } = this.props;
        const { isModalVisible, error } = this.state;

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
                                    onClick={this.onShowModal}
                                >
                                    Add Product
                                </button>
                            </div>
                        </div>
                        <div className="productCont row">
                            <Card
                                productData={productData}
                                fetchSingleProduct={fetchSingleProduct}
                                history={history}
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
                <ProductModal
                    isModalVisible={isModalVisible}
                    closeModal={this.closeModal}
                    onSubmit={this.onSubmit}
                >
                    <ProductForm onChange={this.onChange} inputError={error} />
                </ProductModal>
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
    fetchSingleProduct
});

export default connect(mapStateToProps, mapDispatchToProps())(App);
