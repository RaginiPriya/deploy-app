import { Component } from "react";
// import { Tab, Tabs } from "react-bootstrap";
// import ReactTable from "react-table";  
// import "react-table/react-table.css";  
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from "@mui/material";
import SearchBar from "material-ui-search-bar";
import { Button } from "@material-ui/core";
import { applications } from "./applications";

class Subscriptions extends Component {

    state = {
        page: 0,
        rowsPerPage: 10,
        searched: '',
        rows: applications,
        filteredRows: applications,
        // rows: ['Frozen yoghurt', 'Ice cream sandwich', 'Eclair', 'Cupcake', 'Ginger bread', 'Pizza', 'Puffs', 'Sandwich', 'Watermelon', 'Apricot',
        //     'Cherry', 'Blossom', 'Chocolate', 'Coke', 'Beacon', 'Turkey', 'Delight', 'Wafers'],
        // filteredRows: [],
        // filteredRows: ['Frozen yoghurt', 'Ice cream sandwich', 'Eclair', 'Cupcake', 'Ginger bread', 'Pizza', 'Puffs', 'Sandwich', 'Watermelon', 'Apricot',
        //     'Cherry', 'Blossom', 'Chocolate', 'Coke', 'Beacon', 'Turkey', 'Delight', 'Wafers'],
        // subscribedRows: ['Frozen yoghurt', 'Eclair']
        subscribedRows: [],
        unsubscribedRows: [],
        show: false
    }

    requestSearch = (searchedVal) => {
        console.log('requestSearch')
        const filteredRows = this.state.rows.filter((row) => {
            return row.toLowerCase().includes(searchedVal.toLowerCase());
        });
        this.setState({ filteredRows: filteredRows });
    }

    cancelSearch = () => {
        console.log('cancelSearch')
        this.setState({ searched: '' });
        this.requestSearch('');
    };

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
        this.setState({ page: 0 });
    }

    componentDidMount() {
        console.log('componentDidMount')
        fetch('http://localhost:8082/api/deploy/subscription')
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ subscribedRows: data })
            });
    }

    subscribe = (row) => {
        
        let subscribedRows = this.state.subscribedRows;
        let unsubscribedRows = this.state.unsubscribedRows;

        // it is not in subscribe
        if(subscribedRows.indexOf(row) === -1){
            subscribedRows.push(row);
            this.setState({ subscribedRows: subscribedRows })
            if(unsubscribedRows.indexOf(row) !== -1){
                unsubscribedRows.splice(unsubscribedRows.indexOf(row), 1);
                this.setState({ unsubscribedRows: unsubscribedRows })
            }
        }
        else{
            subscribedRows.splice(subscribedRows.indexOf(row), 1);
            this.setState({ subscribedRows: subscribedRows })
            unsubscribedRows.push(row);
            this.setState({ unsubscribedRows: unsubscribedRows })
        }
        console.log(this.state.subscribedRows)
        console.log(this.state.unsubscribedRows)
    }

    render() {

        // const columns = [
        //     { field: 'id', headerName: 'ID', width: 70 },
        //     { field: 'firstName', headerName: 'First name', width: 130 },
        //     { field: 'lastName', headerName: 'Last name', width: 130 },
        //     {
        //         field: 'age',
        //         headerName: 'Age',
        //         type: 'number',
        //         width: 90,
        //     },
        //     {
        //         field: 'fullName',
        //         headerName: 'Full name',
        //         description: 'This column has a value getter and is not sortable.',
        //         sortable: false,
        //         width: 160,
        //         valueGetter: (params) =>
        //             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        //     },
        // ];

        // function createData(
        //     name,
        //     calories,
        //     fat,
        //     carbs,
        //     protein,
        //   ) {
        //     return { name, calories, fat, carbs, protein };
        //   }

        //   const rows = [
        //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        //     createData('Eclair', 262, 16.0, 24, 6.0),
        //     createData('Cupcake', 305, 3.7, 67, 4.3),
        //     createData('Gingerbread', 356, 16.0, 49, 3.9),
        //   ];

        // const rows = [
        //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        // ];

        const emptyRows =
            this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - this.state.filteredRows.length) : 0;
        return (
            <div>
            <div style={{ width: '100%', marginTop: 30 }}>
                <div style={{ marginLeft: '15%', marginBottom: 20 }}>
                    <h4>Subscriptions</h4>
                    <p>Subscribe to applications to get notified when they undergo deployment changes.</p>
                </div>
                <Paper elevation={0}>
                    <SearchBar style={{ width: '20%', marginLeft: '15%', marginBottom: 20 }}
                        value={this.state.searched}
                        onChange={(searchVal) => this.requestSearch(searchVal)}
                        onCancelSearch={() => this.cancelSearch()}
                    />
                    <TableContainer>
                        <Table sx={{ width: '70%', margin: 'auto', border: 'thin solid #D3D3D3', tableLayout: 'fixed' }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#f2f2f2' }}>
                                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center', width: '50%' }}>APPLICATION</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center', width: '50%' }}>ACTION</TableCell>
                                    {/* <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    (this.state.rowsPerPage > 0
                                        ? this.state.filteredRows.slice((this.state.page) * this.state.rowsPerPage, (this.state.page) * this.state.rowsPerPage + this.state.rowsPerPage)
                                        : this.state.filteredRows
                                    )

                                        .map((row) => (
                                            <TableRow
                                                key={row}
                                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" style={{ textAlign: 'center', width: '50%' }}>
                                                    {row}
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'center', width: '50%' }}>
                                                    <Button onClick={() => this.subscribe(row)}
                                                    variant={this.state.subscribedRows.includes(row) ? "contained" : "outlined"}>
                                                        {this.state.subscribedRows.includes(row) ? "Unsubscribe" : "Subscribe"}
                                                    </Button>
                                                </TableCell>
                                                {/* <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell> */}
                                            </TableRow>
                                        ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    count={this.state.filteredRows.length}
                    rowsPerPage={this.state.rowsPerPage}
                    // rowsPerPage={5}
                    page={this.state.page}
                    // page={0}
                    SelectProps={{
                        inputProps: {
                            "aria-label": "rows per page"
                        }
                    }}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                    //ActionsComponent={TablePaginationActions}
                    //component={Box}
                    labelDisplayedRows={({ page }) => {
                        return `Page: ${page + 1}`;
                    }}
                    backIconButtonProps={{
                        color: "secondary"
                    }}
                    nextIconButtonProps={{ color: "secondary" }}
                    showFirstButton={true}
                    showLastButton={true}
                    // labelRowsPerPage={<span>Rows:</span>}
                    sx={{
                        //   ".MuiTablePagination-toolbar": {
                        //     backgroundColor: "rgba(100,100,100,0.5)"
                        //   },
                        ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
                            fontWeight: "bold",
                            marginLeft: '15%',
                            // color: "blue"
                        }
                    }}
                />
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
                        // onClick={this.createNotification}
                        >Save</Button>

                </div>
            </div>
            // <div style={{ height: 400, width: '80%', textAlign: 'center' }}>
            //     <DataGrid
            //         rows={rows}
            //         columns={columns}
            //         pageSize={5}
            //         rowsPerPageOptions={[5]}
            //     />
            // </div>
            //     <div className="margin-all">
            //         <ReactTable 
            //           data={data}  
            //           columns={columns}  
            //           defaultPageSize = {2}  
            //           pageSizeOptions = {[2,4, 6]}  
            //       />  
            //     {/* <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
            //         <Tab eventKey="home" title="Home">
            //             <h1>Subscribe</h1>
            //         </Tab>
            //         <Tab eventKey="profile" title="Profile">
            //             <h1>My Subscriptions</h1>
            //         </Tab>
            //         <Tab eventKey="contact" title="Contact" disabled>
            //             <h1>Home</h1>
            //         </Tab>
            // </Tabs> */}

            // </div>
        )
    }

}

export default Subscriptions;