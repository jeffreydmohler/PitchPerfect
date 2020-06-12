import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from "react-router-dom"
import baseball from "../baseball.png"

// import AppContext from './context'


function Header(props) {
    // const context = React.useContext(AppContext)

    return (
        <bs.Navbar className="pl-4" expand="lg" variant="light" bg="secondary">
            <br></br>
            <img alt="baseball" src={baseball} width="50" /> &nbsp; &nbsp;
            <Link to="/">
                <bs.Navbar.Brand> 
                    Baseball Predictor
                </bs.Navbar.Brand>
            </Link> | &nbsp;&nbsp;&nbsp;
            <Link to="/report">
                <bs.Navbar.Brand>
                    Report
                </bs.Navbar.Brand>
            </Link> 
            <bs.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <bs.Navbar.Collapse id="basic-navbar-nav">
                <bs.Nav className="mr-auto">
                    {/* <Link to="/report" className="nav-link">Report</Link> */}
                    {/* <Link to="/add" className="nav-link">Add a Crossfit Record </Link>  */}
                </bs.Nav>
                <bs.Nav>
                    <bs.Nav className="mr-auto pr-4">
                        <Link to="/cart" className="nav-link">
                        </Link>
                    </bs.Nav>
                    <bs.NavDropdown title="Welcome, User" alignRight>
                        <bs.NavDropdown.Item>My Account</bs.NavDropdown.Item>
                        <bs.NavDropdown.Divider />
                        <bs.NavDropdown.Item href="#action/3.4">Logout</bs.NavDropdown.Item>
                    </bs.NavDropdown>
                </bs.Nav>
            </bs.Navbar.Collapse>
            <br/><br/><br/>
        </bs.Navbar>
    )
}
export default Header