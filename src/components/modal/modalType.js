import React from 'react';
import SokoModal from "./modal";

class ModalType extends React.Component {

    renderModal = () => {
        const { modalType, isModalVisible, closeModal, onSubmit } = this.props;
        if(modalType) {
            return (
                <SokoModal
                    isModalVisible={isModalVisible}
                    modalType={modalType}
                    closeModal={closeModal}
                    label={modalType === 'addProduct' ? 'Add Product': 'Update Product'}
                    onSubmit={onSubmit}
                >
                    {this.props.children}
                </SokoModal>)
        }
    };

    render() {
        return (
            <div>
                { this.renderModal() }
            </div>
        );
    }
}

export default ModalType
