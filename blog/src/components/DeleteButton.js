import React from 'react';
import TiTrash from 'react-icons/lib/ti/trash';
import { Transition } from 'semantic-ui-react'
import Modal from 'react-modal';


class DeleteButton extends React.Component {

    state = {
        visible: true,
        modelIsOpen: false,
    }

    toggleVisibility = () => (
        this.setState({ visibile: !this.state.visible })
    )

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }


    render(){
        return (
            <div>
                <Transition animation='pulse' duration='100' visible={this.state.visible}>
                    <div className='' onClick={() => this.toggleVisibility()}>
                        <TiTrash size={40} onClick={() => this.openModal()}/>
                    </div>
                </Transition>
                <div className='container'>
                    <Modal
                      isOpen={this.state.modalIsOpen}
                      onRequestClose={this.closeModal}
                      contentLabel="Delete"
                    >
                     <div className='row delete-modal'>
                    <div className='col-md-6 col-sm-12 text-center'>
                        <button className='btn btn-primary btn-lg' onClick={this.closeModal}>Cancel</button>
                    </div>
                    <div className='col-md-6 col-sm-12 text-center'>
                        <button className='btn btn-danger btn-lg' onClick={() => this.props.deleteFunc(this.props.id)}>Delete</button>
                    </div>
                  </div>
                    </Modal>
                </div>

            </div>
        )
    }
}

export default DeleteButton;
