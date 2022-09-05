// import { TextField } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import { Component } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Navigate } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

export class CreateNotification extends Component {

    state = {
        application: '',
        description: '',
        show: false,
        // redirect: false,
        notificationId: ''
    };
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {

        // console.log(event)
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(this.state)
    }

    createNotification = () => {
        console.log(this.state)
        const notification = {
            application: this.state.application,
            description: this.state.description,
        }
        fetch('http://localhost:8082/api/deploy/info', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notification)
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
            console.log(data);
            this.setState({ notificationId: data.id })
        });
        //     .then((response) => {
        //         if (response.status == 204) {
        //             console.log('succesful');
        //             console.log()
        //             this.setState({ application: '', description: '', redirect: true })
        //         }

        //         else {
        //             throw new Error('Invalid credentials');
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

    cancel = () => {
        this.setState({notificationId: true})
    }

    hideAlert = () => {
        console.log('closing alert')
        this.setState({ application: '', description: '', show: false });
    }

    handleChange = () => { }

    render() {

        return (
            <div>

                {this.state.notificationId ? 
                    <Navigate 
                    // <Redirect
                    to='/notifications'
                    state= {
                            this.state.notificationId
                        } /> : null}
                <h4 style={{ marginLeft: '15%', marginTop: 50 }}>Create Notification</h4>
                <p style={{ marginLeft: '15%' }}>Creating a notification will trigger an email with the information to all the employees subscribed to the application.</p>
                <div className="split left">
                    <div style={{ marginLeft: '30%', width: '50%' }}>

                        <FormControl fullWidth>
                            <InputLabel id='application-label'>Application</InputLabel>
                            <Select
                                style={{ marginBottom: '10%' }}
                                labelId='application-label'
                                id="application"
                                value={this.state.application}
                                label='Application'
                                onChange={this.handleInputChange}
                                name='application'
                            >
                                <MenuItem value={'Github'}>Github</MenuItem>
                                <MenuItem value={'Sourcetree'}>Sourcetree</MenuItem>
                                <MenuItem value={'VSCode'}>VSCode</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            style={{ marginBottom: '10%' }}
                            id='description'
                            label='Description'
                            fullWidth
                            onChange={this.handleInputChange}
                            name='description'
                        />
                        <TextField
                            style={{ marginBottom: '10%' }}
                            id="standard-helperText"
                            label="Affects"
                            //   defaultValue="Default Value"
                            // helperText="Some important text"
                            // variant="standard"
                            fullWidth
                        />
                    </div>
                </div>
                <div className="split right">
                    <div style={{ marginLeft: '10%', width: '50%' }}>
                        <TextField
                            style={{ marginBottom: '10%' }}
                            id="standard-helperText"
                            label="Application"
                            fullWidth
                        />
                        <TextField
                            style={{ marginBottom: '10%' }}
                            id="standard-helperText"
                            label="Description"
                            fullWidth
                        />
                        <TextField
                            style={{ marginBottom: '10%' }}
                            id="standard-helperText"
                            label="Affects"
                            fullWidth
                        />
                    </div>
                </div>
                <div className='save-cancel-bar'>
                    <Button style={{
                        borderRadius: 35,
                        // backgroundColor: "#21b6ae",
                        backgroundColor: "#063a75",
                        marginRight: 10,
                        borderColor: 'white'
                    }} 
                    onClick={this.cancel}
                    >Cancel</Button>
                    <Button style={{
                        borderRadius: 35,
                        backgroundColor: 'white',
                        marginRight: 10,
                    }}
                        variant="contained" 
                        onClick={this.createNotification}
                        >Create</Button>

                </div>
                {/* <div
                    // className="split left"
                    className="create"
                >
                    <div className="centered">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleInputChange} />
                            </Form.Group>
                            <Button variant="outline-dark" type="button" onClick={this.handleClick}>
                                Submit
                            </Button>
                        </Form>
                        <Alert show={this.state.show} variant="success" onClose={this.hideAlert} dismissible>
                            <p> Deploy Info saved successfully </p>
                        </Alert>
                    </div>
                </div> */}
            </div>
        )
    }
}