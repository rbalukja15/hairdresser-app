import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap'
import { connect } from 'react-redux' //To connect react and redux
import { addClient } from '../../../actions/clientActions' //Import the action to add the item
import PropTypes from 'prop-types'

//Toastr Part
import { toastr } from 'react-redux-toastr' //Toastr for validation notifications
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css' //CSS for toastr

class ClientModal extends Component {
    //Define the states
    state = {
        modal: false, //Determine the state of the modal
        name: '', //The state of the name of inputs
        surname: '',
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }

    //Toggle the modal function
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        })
    }

    //Set the state of name when the input event is fired off
    onChange = (e) => {
        //We can add multiple input changes here
        this.setState({ [e.target.name]: e.target.value })
    }

    //Add the item
    onSubmit = (e) => {
        e.preventDefault() //To prevent the form from submitting naturally

        //Define the new item
        const newClient = {
            name: this.state.name,
            surname: this.state.surname,
        }

        //Add Item via addItem Action
        this.props.addClient(newClient)

        if (this.state.name === '') {
            toastr.error('Shtim', 'Emri nuk mund te jete bosh')
            return
        } else if (this.state.surname === '') {
            toastr.error('Shtim', 'Mbiemri nuk mund te jete bosh')
            return
        } else {
            toastr.success('Shtim', 'Klienti u shtua me sukses')

            //Close the modal
            this.toggle()
        }
    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? (
                    <Button className="success-btn mb-2" outline color="success" onClick={this.toggle.bind(this)}>
                        Shto Klient
                    </Button>
                ) : (
                    <h4 className="mb-3 ml-4">Ju lutem logohuni qe te shtoni kliente</h4>
                )}

                <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true}>
                    <ModalHeader toggle={this.toggle} className="bg-light">
                        Shto klient te ri
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="emri">Emer</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="emri"
                                    placeholder="Emer..."
                                    onChange={this.onChange}
                                    className="mb-2"
                                />
                                <Label for="surname">Mbiemer</Label>
                                <Input
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    placeholder="Mbiemer..."
                                    onChange={this.onChange}
                                    className="mb-2"
                                />
                                <Button className="info-btn mb-2" outline color="info" block>
                                    Shto
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

//Mapping function
//Allow to take the items state and maps it into a component property
const mapStateToProps = (state) => ({
    client: state.client,
    isAuthenticated: state.auth.isAuthenticated,
})

//Connect takes as parameters the action and our mapping function
export default connect(mapStateToProps, { addClient })(ClientModal) //Because we are using connect
