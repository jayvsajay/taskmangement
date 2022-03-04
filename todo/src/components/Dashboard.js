import React ,{useState,useEffect}from "react";
import { Container ,Row,Col,Card,Button,Table, Dropdown,DropdownButton} from "react-bootstrap";
import {  gettask, gettask1 } from "../config/MyService";
import moment from "moment";
import Nav2 from "./Nav2";
import '../App.css'
export default function Dashboard(){
    const [email,setEmail]=useState('')
    const [todo,setTodo]=useState([])
    const [total,setTotal]=useState(0)
    const [pending,setPending]=useState(0)
    const [done,setDone]=useState(0)
    const [arr,setArr]=useState([])
    useEffect(()=>{
        let data=JSON.parse(localStorage.getItem('user'))
        setEmail(data.firstname)
        let email=data.email;
        console.log(email)
        gettask1(email)
        .then(res=>{
            console.log(res.data.todo1)
            let to=res.data.todo1.length;
            setTotal(to)
            let pend=res.data.todo1;
            let data1=pend.filter(items=>items.stage!==3)
             let pending_total=data1.length;
             setPending(pending_total)
             let data2=pend.filter(items=>items.stage===3);
             let done_total=data2.length;
             setDone(done_total)
        })
        gettask(email)
        .then(res=>{
            setTodo(res.data.todo)
           
            setArr(res.data.todo)
        })
    },[])
    const styles={
        well:{
            width:"200px",
            height:"200px"
        }
    }
    return(
    <div className="dashbackground">
    <Nav2/>
    <h2> Welcome : {email}</h2>
    
    
    <Container className="mt-5">
            <Row > 
                <Col md={3} sm={6} className="m-4 p-4">
                <Card  style={styles.well}>
                <Card.Body>
                    <Card.Title>Total Number of Tasks</Card.Title>
                    <Card.Text>
                    
                    </Card.Text>
                    <Button variant="primary">{total}</Button>
                </Card.Body>
                </Card>
                </Col>
                <Col md={3} sm={6} className="m-4 p-4">
                <Card style={styles.well}>
                <Card.Body>
                    <Card.Title>Total Number of Tasks Pending</Card.Title>
                    <Card.Text>
                    
                    </Card.Text>
                    <Button variant="primary">{pending}</Button>
                </Card.Body>
                </Card>
                </Col>
                <Col md={3} sm='6' className="m-4 p-4">
                <Card style={styles.well}>
                <Card.Body>
                    <Card.Title>Total Number of Tasks completed</Card.Title>
                    <Card.Text>
                    
                    </Card.Text>
                    <Button variant="primary">{done}</Button>
                </Card.Body>
                </Card>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
         
                <DropdownButton  size='lg'
                            title='Proirty'
                            >
                            <Dropdown.Item  onClick={()=>setTodo(arr.filter(itm=>itm.priority=='High'))} >High</Dropdown.Item>
                            <Dropdown.Item  onClick={()=>setTodo(arr.filter(itm=>itm.priority=="Medium"))} >Medium</Dropdown.Item>
                            <Dropdown.Item  onClick={()=>setTodo(arr.filter(itm=>itm.priority=='Low'))} >Low</Dropdown.Item>
                                   
                            </DropdownButton></Col></Row>
            <Table responsive striped bordered hover className="mt-5">
                <thead>
                    <tr>
                    <th>Sl no</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Created at</th>
                    </tr>
                </thead>
                <tbody>
                    {todo.map((itm,index)=>
                                     <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{itm.title}</td>
                                    <td>{itm.description}</td>
                                    <td>{itm.priority}</td>
                                    <td>{moment(itm.due_date).format('DD-MM-YYYY')}</td>
                                    <td>{moment(itm.date).format('DD-MM-YYYY')}</td>
                                    </tr>
                    )}
                
                </tbody>
                </Table>
    </Container>
    </div>
    )
}