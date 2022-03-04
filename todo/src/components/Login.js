import React,{useState} from 'react'
import { Container,Form,Row,Col,Button ,Image} from 'react-bootstrap'
import {loginUser} from '../config/MyService';
import { useNavigate } from 'react-router';
import login1 from '../login.gif';
import Nav1 from './Nav1';
import Cookies from 'js-cookie'
import '../App.css'
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export default function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login= ()=>{
        if(email === '' ||  password === ''){
            alert("Please fill all the fields before Login");
        }
        else{  
        let data = {email:email, password:password};
        loginUser(data)
        .then(res=>{
            if(res.data.err){
                alert(res.data.err)
               
            }
           else{
                alert(res.data.msg)
                localStorage.setItem("_token",res.data.token);
                Cookies.set("_token",res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                sessionStorage.setItem("user", JSON.stringify(res.data.user));
                navigate('/dashboard');
                window.location.reload();
            }
        })
            
    }}
    const styles={
        well:{
            textAlign:'justify',
            marginLeft:"10%",
            marginRight:"20%"
        }
    }
return(
    <div className='login'>
        <Nav1/>
        <Row>
                <Col md={6} sm={3}>
         <Container  className='mt-5 '>
             <Image src={login1} width="80%" height="80%"/>
         </Container>
         </Col>
         <Col md={6} sm={3} className='mt-5'>
        <h2  style={styles.well}>Login to Task Mangement</h2>
            <Form  style={styles.well} className='mt-5'>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control  type="text" placeholder="Enter Email Id" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    {email!=='' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    {password!=='' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                    </Col>
                </Form.Group>
                <Button variant="primary" onClick={login}>Login</Button>
                </Form>
                </Col>
                </Row>
    </div>
)
}