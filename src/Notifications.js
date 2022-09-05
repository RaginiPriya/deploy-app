import { Button } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import { Component } from "react";
import { Navigate } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Alert } from "@mui/material";

class Notifications extends Component {

    state = {
        notifications: [],
        // notifications: [{
        //     application: 'Github App1',
        //     description: 'Routine deployment on Github App',
        //     createdAt: '13-08-2022 08:30',
        //     deploymentAt: '14-08-2022 13:50'
        // },{
        //     application: 'Github App2',
        //     description: 'Routine deployment on Github App',
        //     createdAt: '13-08-2022 08:30',
        //     deploymentAt: '14-08-2022 13:50'
        // },{
        //     application: 'Github App3',
        //     description: 'Routine deployment on Github App',
        //     createdAt: '13-08-2022 08:30',
        //     deploymentAt: '14-08-2022 13:50'
        // }],
        redirect: false,
        // notificationId: this.props.location.state.notificationId,
    }

    componentDidMount() {
        console.log('componentDidMount')
        fetch('http://localhost:8082/api/deploy/info')
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ notifications: data })
            });
    }

    createNotification = () => {
        this.setState({ redirect: true })
    }

    openDrawer = (row) => {
        console.log(row)
    }

    render() {

        return (

            <div style={{ width: '100%', marginTop: 30, height: '100%' }}>
                {this.state.redirect ? 
                <Navigate
                    // <Redirect 
                    to='/notification' /> : null}
                <div style={{ marginLeft: '15%', marginBottom: 30 }}>
                    <h4>Notifications</h4>
                    <p>Notify deployment changes through email to employees currently subscribed to the application.</p>
                </div>
                <div className="buttonRight right">
                    <Button style={{
                        borderRadius: 35, backgroundColor: "#063a75", color: 'white', textTransform: 'none'
                    }} onClick={this.createNotification}>Create Notification</Button>
                </div>
                {
                    this.state.notifications.length > 0 ?
                        (
                            <Paper elevation={0} style={{ minHeight: '80vh' }}>
                                <TableContainer>
                                    <Table sx={{ width: '70%', margin: 'auto', border: 'thin solid #D3D3D3', tableLayout: 'fixed' }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow style={{ backgroundColor: '#f2f2f2' }}>
                                                <TableCell style={{ fontWeight: 'bold', textAlign: 'center', width: '50%' }}>APPLICATION</TableCell>
                                                <TableCell style={{ fontWeight: 'bold', textAlign: 'center', width: '50%' }}>DESCRIPTION</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                this.state.notifications
                                                    .map((row) => (
                                                        <TableRow
                                                            sx={{ cursor: 'pointer' }}
                                                            key={row.application}
                                                            onClick={() => this.openDrawer(row)}
                                                        >
                                                            <TableCell component="th" scope="row" style={{ textAlign: 'center', width: '50%' }}>
                                                                {row.application}
                                                            </TableCell>
                                                            <TableCell style={{ textAlign: 'center', width: '50%' }}>
                                                                {row.description}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        )
                        : (
                            <div className="App-header">
                                <h4 style={{ marginBottom: 20 }}>No Notifications Found</h4>
                                <Button style={{
                                    borderRadius: 35, backgroundColor: "#063a75", color: 'white', textTransform: 'none'
                                }} variant="contained" onClick={this.createNotification}>Create Notification</Button>
                            </div>
                        )
                        
                }
                {
                    this.state.notificationId ? <Alert className='alert' onClose={() => { }}>Notification created successfully</Alert> : null
                }

                
            </div>
        )
    }
}

export default Notifications