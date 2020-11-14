import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap'
//import Select from "react-select";
import { connect } from 'react-redux' //To connect react and redux
import { addEmployee } from '../../../actions/employeeActions' //Import the action to add the item
import PropTypes from 'prop-types'

//Toastr Part
import { toastr } from 'react-redux-toastr' //Toastr for validation notifications
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css' //CSS for toastr

class EmployeeModal extends Component {
    //Define the states
    state = {
        modal: false, //Determine the state of the modal
        name: '',
        surname: '',
        numerSigurime: '',
        pozicioni: '',
        adresa: '',
        paga: 0,
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }

    componentWillMount() {
        //Runs when the component mounts
        //Here we run actions
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
        const newEmployee = {
            name: this.state.name,
            surname: this.state.surname,
            numerSigurime: this.state.numerSigurime,
            pozicioni: this.state.pozicioni,
            adresa: this.state.adresa,
            paga: this.state.paga,
        }

        //Add Employee via addEmployee Action
        this.props.addEmployee(newEmployee)

        if (this.state.name === '') {
            toastr.error('Shtim', 'Emri nuk mund te jete bosh')
            return
        } else if (this.state.surname === '') {
            toastr.error('Shtim', 'Mbiemri nuk mund te jete bosh')
            return
        } else if (this.state.numerSigurime === '') {
            toastr.error('Shtim', 'Numri sigurimeve nuk mund te jete bosh')
            return
        } else if (this.state.pozicioni === '') {
            toastr.error('Shtim', 'Pozicioni nuk mund te jete bosh')
            return
        } else if (this.state.adresa === '') {
            toastr.error('Shtim', 'Adresa nuk mund te jete bosh')
            return
        } else if (this.state.paga === 0) {
            toastr.error('Shtim', 'Paga nuk mund te jete bosh')
            return
        } else if (this.state.paga <= 0) {
            toastr.error('Shtim', 'Paga nuk mund te jete me e vogel ose e barabarte me 0 ')
            return
        } else {
            toastr.success('Shtim', 'Punonjesi u shtua me sukses')

            //Close the modal
            this.toggle()
        }
    }

    //Handle select input option
    handleChange = (category) => {
        this.setState({ category: category.value })
        //console.log(`Option selected:`, category.value);
    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? (
                    <Button style={{ marginBottom: '2rem' }} onClick={this.toggle.bind(this)} outline color="success">
                        Shto Punetor
                    </Button>
                ) : (
                    <h4 className="mb-3 ml-4">Logohu qe te shtosh punetor</h4>
                )}

                <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true}>
                    <ModalHeader toggle={this.toggle} className="bg-light">
                        Shto punetor
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Emri</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Emri..."
                                    onChange={this.onChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="surname">Mbiemri</Label>
                                <Input
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    placeholder="Mbiemri..."
                                    onChange={this.onChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="numerSigurime">Numri Sigurimeve</Label>
                                <Input
                                    type="text"
                                    name="numerSigurime"
                                    id="numerSigurime"
                                    placeholder="Numri sigurimeve..."
                                    onChange={this.onChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="pozicioni">Pozicioni</Label>
                                <Input
                                    type="text"
                                    name="pozicioni"
                                    id="pozicioni"
                                    placeholder="Pozicioni..."
                                    onChange={this.onChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="adresa">Adresa</Label>
                                <Input
                                    type="text"
                                    name="adresa"
                                    id="adresa"
                                    placeholder="Adresa..."
                                    onChange={this.onChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="paga">Paga</Label>
                                <Input
                                    type="number"
                                    name="paga"
                                    id="paga"
                                    placeholder="Paga..."
                                    onChange={this.onChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Button color="info" style={{ marginTop: '2rem' }} block outline>
                                    Shto Punetor
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
//Allow to take the employees state and maps it into a component property
const mapStateToProps = (state) => ({
    employee: state.employee,
    isAuthenticated: state.auth.isAuthenticated,
})

//Connect takes as parameters the action and our mapping function
export default connect(mapStateToProps, { addEmployee })(EmployeeModal) //Because we are using connect
