import React from "react";
import { Nav,Navbar,Container } from "react-bootstrap";
export default function Nav1(){
    return(
        <>
            <Navbar bg="dark" expand="lg">
  <Container>
    <Navbar.Brand className=' text-white'>Task Mangement</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" className=' bg-white'/>
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav>
      <Nav.Link className=' text-white' href="/">Home</Nav.Link>
        <Nav.Link className=' text-white'href="/Signup">Sign up</Nav.Link>
        <Nav.Link  className=' text-white' href="/login">Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    )
}