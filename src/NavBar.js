import { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import { Redirect } from 'react-router-dom';

class NavBar extends Component {

    state = {
        redirect: false
    }

    redirect = () => {
        this.setState({ redirect: true })
    }

    render() {
        return (
            <Navbar expand="lg" bg="dark" variant="dark">
                <div className="margin-left">
                    <Navbar.Brand href="/">DeployApp</Navbar.Brand>
                </div>
                <Container>
                    {/* <Nav variant="pills" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/home">Active</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="disabled" disabled>
                                Disabled
                            </Nav.Link>
                        </Nav.Item>
                    </Nav> */}
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} exact to="/">
                        Subscriptions
                        </Nav.Link>
                        <Nav.Link as={NavLink} exact to="/notifications">
                        Notifications
                        </Nav.Link>
                        {/* <Nav.Link href="/">Subscriptions</Nav.Link>
                        <Nav.Link href="notification">Notify</Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>
        )

    }
}


export default NavBar