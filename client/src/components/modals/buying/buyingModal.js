import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap'
import { connect } from 'react-redux' //To connect react and redux
import { addBuying } from '../../../actions/buyingActions' //Import the action to add the item
import PropTypes from 'prop-types'

//Toastr Part
import { toastr } from 'react-redux-toastr' //Toastr for validation notifications
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css' //CSS for toastr

class BuyingModal extends Component {
    //Define the states
    state = {
        modal: false, //Determine the state of the modal
        name: '', //The state of the name of inputs
        kodi: '',
        cmimBlerje: 0,
        prodhuesi: '',
        shitesi: '',
        sasia: 0,
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
        const newBuying = {
            name: this.state.name,
            kodi: this.state.kodi,
            cmimBlerje: this.state.cmimBlerje,
            prodhuesi: this.state.prodhuesi,
            shitesi: this.state.shitesi,
            sasia: this.state.sasia,
        }

        //Add Item via addItem Action
        this.props.addBuying(newBuying)

        if (this.state.name === '') {
            toastr.error('Shtim', 'Emri nuk mund te jete bosh')
            return
        } else if (this.state.kodi === '') {
            toastr.error('Shtim', 'Kodi nuk mund te jete bosh')
            return
        } else if (this.state.cmimBlerje === 0) {
            toastr.error('Shtim', 'Cmimi blerjes nuk mund te jete bosh')
            return
        } else if (this.state.prodhuesi === '') {
            toastr.error('Shtim', 'Prodhuesi nuk mund te jete bosh')
            return
        } else if (this.state.shitesi === '') {
            toastr.error('Shtim', 'Shitesi nuk mund te jete bosh')
            return
        } else if (this.state.sasia === 0) {
            toastr.error('Shtim', 'Sasia nuk mund te jete bosh')
            return
        } else {
            toastr.success('Shtim', 'Blerja u shtua me sukses')

            //Close the modal
            this.toggle()
        }
    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? (
                    <Button style={{ marginBottom: '2rem' }} onClick={this.toggle.bind(this)} outline color="success">
                        Shto Blerje
                    </Button>
                ) : (
                    <h4 className="mb-3 ml-4">Logohu qe te shtosh blerje</h4>
                )}

                <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true}>
                    <ModalHeader toggle={this.toggle} className="bg-light">
                        Shto te blerjet
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Emri</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Emri..."
                                    onChange={this.onChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="kodi">Kodi</Label>
                                <Input
                                    type="text"
                                    name="kodi"
                                    id="kodi"
                                    placeholder="Kodi..."
                                    onChange={this.onChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="cmimBlerje">Cmimi Blerjes</Label>
                                <Input
                                    type="number"
                                    name="cmimBlerje"
                                    id="cmimBlerje"
                                    placeholder="Cmimi..."
                                    onChange={this.onChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="shitesi">Shitesi</Label>
                                <Input
                                    type="text"
                                    name="shitesi"
                                    id="shitesi"
                                    placeholder="Shitesi"
                                    onChange={this.onChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="prodhuesi">Prodhuesi</Label>
                                <Input
                                    type="text"
                                    name="prodhuesi"
                                    id="prodhuesi"
                                    placeholder="Prodhuesi"
                                    onChange={this.onChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="sasia">Sasia</Label>
                                <Input
                                    type="number"
                                    name="sasia"
                                    id="sasia"
                                    placeholder="Sasia..."
                                    onChange={this.onChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Button color="info" style={{ marginTop: '2rem' }} block outline>
                                    Shto Shitje
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
    buying: state.buying,
    isAuthenticated: state.auth.isAuthenticated,
})

//Connect takes as parameters the action and our mapping function
export default connect(mapStateToProps, { addBuying })(BuyingModal) //Because we are using connect
