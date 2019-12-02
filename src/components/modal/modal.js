import React, { Component } from 'react';
import {Modal, ModalBody, ModalFooter} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import './modal.scss';


class ProductModal extends Component{

    render() {
        const { isModalVisible, closeModal, onSubmit }  = this.props;
        return (
            <Modal show={ isModalVisible } onHide={closeModal} size='sm'>
                <ModalHeader closeButton className='modalHeader'>
                    <div>New Product</div>
                </ModalHeader>
                <ModalBody className='modalBody'>{this.props.children}</ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-success btn-sm" onClick={onSubmit}>
                        Add Product
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm " onClick={closeModal}>
                        Cancel
                    </button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ProductModal;
