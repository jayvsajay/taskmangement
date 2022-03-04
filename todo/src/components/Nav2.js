import React from "react";
import { Nav,Navbar,Container } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
export default function Nav2(){
    const navigate=useNavigate()
    const logout=()=>{
        localStorage.clear()
            navigate('/login')
    }
    return(
        <>
            <Navbar bg="dark" expand="lg">
  <Container>
    <Navbar.Brand className="text-white">Task Mangement</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav>
      <Nav.Link className="text-white"  href='/dashboard'>Dashboard</Nav.Link>
      <Nav.Link className="text-white" href='/task'>Add Task</Nav.Link>
        <Nav.Link  className="text-white"onClick={logout}>Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    )
}