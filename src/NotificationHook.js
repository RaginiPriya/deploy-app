import React, { useState, useEffect } from 'react';
import { Button } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import { Navigate } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Alert } from "@mui/material";
import { useLocation } from 'react-router-dom';

export function NotificationHook() {
    const [loading, setLoading] = useState(true)
    const [notifications, setNotifications] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const  location  = useLocation()
    const [notificationId, setNotificationId] = useState(location ? location.state : '')
    
    console.log(location)

    useEffect(() => {
        console.log('componentDidMount')
        fetch('http://localhost:8082/api/deploy/info')
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                setNotifications(data)
                setLoading(false)
            });
    }, []);


    return (

        <div style={{ width: '100%', marginTop: 30, height: '100%' }}>
            {redirect ? 
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
                }} 
                onClick={() => setRedirect(true)}
                >Create Notification</Button>
            </div>
            {
                notifications.length > 0 ?
                    (
                        <Paper elevation={0} style={{ minHeight: '80vh' }}>
                            <TableContainer>
                                <Table sx={{ marginLeft: '15%', width: '75%', border: 'thin solid #D3D3D3', tableLayout: 'fixed' }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: '#f2f2f2' }}>
                                            <TableCell style={{ fontWeight: 'bold',  width: '15%' }}>NOTIFICATION ID</TableCell>
                                            <TableCell style={{ fontWeight: 'bold',  width: '35%' }}>APPLICATION</TableCell>
                                            <TableCell style={{ fontWeight: 'bold',  width: '50%' }}>DESCRIPTION</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            notifications
                                                .map((row) => (
                                                    <TableRow
                                                        sx={{ cursor: 'pointer' }}
                                                        key={row.application}
                                                        onClick={() => this.openDrawer(row)}
                                                    >
                                                        <TableCell component="th" scope="row" style={{ width: '15%' }}>
                                                            {row.notificationId}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row" style={{ width: '35%' }}>
                                                            {row.application}
                                                        </TableCell>
                                                        <TableCell style={{ width: '50%' }}>
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
                        !loading ? <div className="App-header">
                            <h4 style={{ marginBottom: 20 }}>No Notifications Found</h4>
                            <Button style={{
                                borderRadius: 35, backgroundColor: "#063a75", color: 'white', textTransform: 'none'
                            }} variant="contained" onClick={() => setRedirect(true)}>Create Notification</Button>
                        </div>
                        : null
                    )
                    
            }
            {
                notificationId ? <Alert className='alert' onClose={() => setNotificationId('')} variant="filled">Notification created successfully</Alert> : null
            }

            
        </div>
    )
}

