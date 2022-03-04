import React,{useState} from 'react'
import { Container,Form,Button,Row,Col,Image} from 'react-bootstrap'
import { registerUser} from '../config/MyService';
import { useNavigate } from 'react-router';
import Nav1 from './Nav1';
import '../App.css';
import signup from '../signup.jpg'
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export  default function Signup(){
        
        let [email,setEmail]=useState('');
        let [password,setPassword]=useState('');
        let [cpassword,setCpassword]=useState('');
        let [firstname,setFirstname]=useState('');
        let [lastname,setLastname]=useState('');
        let [logo,setLogo]=useState('')
        const navigate=useNavigate();
        const register=()=>{  
            if(email === '' || firstname === '' || lastname === '' || password === '' || cpassword === '' ){
                alert("Please fill all the fields before registering");
            }
            else{      
            let formdata = new FormData();
            formdata.append('myfile',logo);
            formdata.append('email',email);
            formdata.append('firstname',firstname);
            formdata.append('lastname',lastname);
            formdata.append('password',password);
            let data={email:email,password:password,firstname:firstname,lastname:lastname,logo:logo};
            console.log(data);
            console.log(formdata)
            registerUser(formdata)
            .then(res=>{
                if(res.data.err){
                    alert(res.data.err)
                    // console.log(res.data.err)
                }
                else{
                    alert(res.data.msg)
                    navigate('/login');
                }
            });
        }    }
        const styles={
            well:{
                textAlign:'justify',
                marginLeft:"10%",
                marginRight:"20%"
             
            }
        }
    return (
        <div className='regbackground'>
            <Nav1/>
            <Row>
                <Col md={6} sm={3}>
         <Container  className='mt-5 '>
             <Image src={signup} width="80%" height="80%"/>
         </Container>
         </Col>
         <Col md={6} sm={3}>
        <Container className="mt-3">
     
        <Form style={styles.well}method="post" encType="multipart/form-data" >
        <h2>Registration</h2>
        <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                FirstName
                </Form.Label>
                <Col sm="7">
                <Form.Control  type="text" placeholder="Enter First Name" name="firstname" onChange={(e)=>{setFirstname(e.target.value)}}/>
                {firstname!=='' && firstname.length < 4 && <span className="text-danger">Enter first name correctly</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                LastName
                </Form.Label>
                <Col sm="7">
                <Form.Control  type="text" placeholder="Enter Last Name" name="mobile" onChange={(e)=>{setLastname(e.target.value)}}/>
                {lastname!=='' && lastname.length < 2 && <span className="text-danger">Enter last name correctly</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                Email
                </Form.Label>
                <Col sm="7">
                <Form.Control  type="text" placeholder="Enter Emailid" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                {email!=='' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                </Col>
            
            
            </Form.Group>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm="3">
                Password
                </Form.Label>
                <Col sm="7">
                <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                {password!=='' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm="3">
                Confirm Password
                </Form.Label>
                <Col sm="7">
                <Form.Control type="password" placeholder="Confirm Password" name="cpassword" onChange={(e)=>{setCpassword(e.target.value)}} />
                {cpassword!=='' && cpassword !== password && <span className="text-danger">Passwords doesn't match</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 mr-5">
                    <Form.Label column sm="3">
                    Logo
                    </Form.Label>
                    <Col sm="7">
                    <Form.Control  type="file" placeholder="Select file" name="myfile" id="myfile" onChange={(e)=>{setLogo(e.target.files[0])}} />
                    </Col>
                </Form.Group>
            <Button variant="primary" onClick={register} >Register</Button>
        
            </Form>
                
               
                    
        </Container>
        </Col>
        </Row>
        </div>
    )
}