import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    fetchProducts,
    newProduct,
    fetchSingleProduct,
    delProduct,
    updateProduct,
    addProductSuccess,
    addProductConflict,
} from '../../redux/actions/productActions';
import {NavigationBar} from "../../components/navBar/navBar";
import { Navbar, Nav, Button } from "react-bootstrap";
import Card from '../../components/Card';
import ProductDetails from '../../components/Card/ProductDetails';
import ProductForm from '../../components/Form/form';
import ModalType from "../../components/modal/modalType";
import 'react-toastify/dist/ReactToastify.css';
import CustomCard from '../../components/Card/card';
import './homePage.scss';

import { sokoSocket } from "../../services";
import {toast} from "react-toastify";


let socket;
class App extends Component {
    constructor(props) {
        super(props);
        socket = sokoSocket();
        socket.on('productAdded', data => {
            const { addProductSuccess } = this.props;
            addProductSuccess(data);
        });
        socket.on('productAddedSuccess', (data) => toast.success(data) )
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
        ProductName: "",
    };

    componentDidMount() {
        const { fetchProducts } = this.props;
        fetchProducts(socket);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { productData: {isModalVisible, data, ProductName}} = nextProps;
        this.setState({ isModalVisible, products: data});
        this.setState(prevState => ({
           ...prevState,
           isModalVisible,
           products: data,
           productForm: {...prevState.productForm, ProductName: ''},
           ProductName: ProductName,
        }))
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
            productData: { data },
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

    renderSkeletonCard = (isLoading) => {
        const cards = [];
        for (let i=0; i <= 9; i++) {
            cards.push(<CustomCard isLoading={isLoading} key={i}/>)
        }
        return cards.map(card => card)
    };

    renderProductDetail = () => {
        const { productData } = this.props;
        const { ProductName } = this.state;
        return (
            <div className='row'>
                <ProductDetails
                    productData={productData}
                    fetchSingleProduct={fetchSingleProduct}
                    ProductName={ProductName}
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
    closeModal = () => this.setState(prevState => ({
        ...prevState,
        isModalVisible: false,
        error: '',
        productForm: {...prevState.productForm, ProductName: ''}
    }));
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
        const { newProduct, updateProduct, productData: {data: products} }  = this.props;
        const {productForm: { ProductName }, modalType, productId, productForm} = this.state;
        const newProductName = ProductName.trim();

        if(!newProductName){
            this.setState(prevState => ({
                ...prevState,
                error: "required"
            }))
        }
        else {
            const myData = products.some(data => {
                const { ProductName: productName } = data;
                return newProductName === productName;
            });
            if(myData) {
                addProductConflict("Product already exists");
                return toast.error("Product already exists")
            }
            const regExp = new RegExp('^[a-zA-Z]{3,18}$[0-9]?', 'i');
            if(!regExp.test(newProductName)){
                return this.setState(prevState => ({
                    ...prevState,
                    error: "Please provide a valid product name"
                }))
            }
            if(modalType === 'addProduct') {
                newProduct({...productForm, ProductName: _.upperFirst(ProductName)}, socket);
            }else {
                updateProduct({...productForm, ProductName: _.upperFirst(ProductName)}, productId, socket)
            }
        }
    };

    render() {
        const { isModalVisible, error, modalType } = this.state;
        const { productData : { isLoading }} = this.props;
            return (
            <div className="App container-fluid">
                <NavigationBar />
                <div className="homeContainer">
                    <div className="productsContainer col-8">
                        {this.renderProductHeader()}
                        <div className='productCont row'>
                            {isLoading ? this.renderSkeletonCard(isLoading): this.renderProducts()}
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
