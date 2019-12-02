import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    fetchProducts,
    newProduct,
    fetchSingleProduct,
    delProduct,
    updateProduct,
    addProductSuccess,
    addProductConflict,
} from '../../redux/actions/productActions'
import {NavigationBar} from "../../components/navBar/navBar";
import { Navbar, Nav, Button } from "react-bootstrap";
import Card from '../../components/Card';
import ProductDetails from '../../components/Card/ProductDetails';
import ProductForm from '../../components/Form/form';
import ModalType from "../../components/modal/modalType";
import 'react-toastify/dist/ReactToastify.css';
import './homePage.scss';

import { sokoSocket } from "../../services";
import {toast} from "react-toastify";


let socket;
class App extends Component {
    constructor(props) {
        super(props);
        socket = sokoSocket();
        socket.on('productAdded', data => {
            const { conflictMessage } = data;
            const { addProductSuccess, addProductConflict } = this.props;
            if(!conflictMessage) {
                addProductSuccess(data);
                toast.success('Product Added Successfully');
            } else{
                const conflictError = "Product already exists";
                addProductConflict(conflictError);
                toast.error("Product already exists")
            }
        })
    }

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
        const { fetchProducts } = this.props;
        fetchProducts(socket);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { productData: {isModalVisible, data}} = nextProps;
        this.setState({ isModalVisible, products: data});
    }


    renderProductHeader = () => (
        <Navbar className='productTypesContainer' expand="lg" bg="light">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="typesContainer" id="basic-navbar-nav">
                <Nav className="mr-auto types">
                    <Nav.Link className='items'>Groceries</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            {this.renderButtonContainer()}
        </Navbar>
    );

    renderProducts = () => {
        const {
            productData: { data, isLoading },
            productData,
            fetchSingleProduct,
            delProduct,
            history
        } = this.props;

        if(data.length > 0) {
            return (
                    <Card
                        productData={productData}
                        fetchSingleProduct={fetchSingleProduct}
                        delProduct={delProduct}
                        history={history}
                        onShowModal={this.onShowModal}
                    />
            )
        }
        return <div className='emptyList'>Please add new products</div>
    };

    renderProductDetail = () => {
        const { productData} = this.props;
            return (
                <div className='row'>
                    <ProductDetails
                        productData={productData}
                        fetchSingleProduct={fetchSingleProduct}
                    />
                </div>
            )
    };

    renderButtonContainer = () => {
        return (
                <Button
                    type="button"
                    className="addButton"
                    variant="primary"
                    size="sm"
                    onClick={() => this.onShowModal('addProduct')}
                >
                    Add Product
                </Button>
        )
    };

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
        const { isModalVisible, error, modalType } = this.state;
        const { productData : {isLoading}} = this.props;
            return (
            <div className="App container-fluid">
                <NavigationBar />
                <div className="homeContainer">
                    <div className="productsContainer col-8">
                            {this.renderProductHeader()}
                        <div className={ `${isLoading ? 'productContLoading row': 'productCont row'}` }>
                            {isLoading ? <div className='loader' /> : this.renderProducts()}
                        </div>
                    </div>
                    <div className="transactionContainer col-4">
                        {this.renderProductDetail()}
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
    addProductSuccess,
    addProductConflict
});

export default connect(mapStateToProps, mapDispatchToProps())(App);
