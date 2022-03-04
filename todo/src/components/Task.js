import React,{useEffect, useState} from "react";
import {Table, Card,Button, Container, Row ,Col,Form} from "react-bootstrap";
import Nav2 from "./Nav2";
import moment from "moment";
import '../App.css'
import { addtask ,incrementstage,decrementstage,edittask,deletedata,getstage1,gettask,getstage2,getstage3, getstage, Updatestage} from "../config/MyService";
export default function Task(){
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); 
  let yyyy = today.getFullYear();
    const [priority,setPriorty]=useState('')
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [date,setDate]=useState(yyyy + '-' + mm + '-' + dd)
    const [due_date,setDuedate]=useState('')
    const [todo,setTodo]=useState([])
    const [ind,setId]=useState('')
    const [ischange,setChange]=useState(true)
    const [todo1,setTodo1]=useState([])
    const [ongoing,setOngoing]=useState([])
    const [done,setDone]=useState([])
    const [all,setAll]=useState([])
    useEffect(()=>{
      let data=JSON.parse(localStorage.getItem('user'))
      let email=data.email;
      gettask(email)
      .then(res=>{
        setAll(res.data.todo)
      })
      getstage(email)
      .then(res=>{
        setTodo(res.data.todo)
       
      })
      getstage1(email)
      .then(res=>{
        console.log(res.data.todo)
        setTodo1(res.data.todo)
      })
      getstage2(email)
      .then(res=>{
        console.log(res.data.todo)
        setOngoing(res.data.todo)
      })
      getstage3(email)
      .then(res=>{
        console.log(res.data.todo)
        setDone(res.data.todo)
      })
    },[])
     const onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    const onDragOver = (ev) => {
        ev.preventDefault();
    }

    const onDrop1 = (ev, cat) => {
      console.log("draged")
       let id = ev.dataTransfer.getData("id");
        let data={id:id,stage:cat};
        Updatestage(data)
        .then(res=>{
          if(res.data.err){
            alert(res.data.err)
          }
          else{
            alert(res.data.msg)
            window.location.reload();
          }
        })
    }

    const add_Task=()=>{
      let user=JSON.parse(localStorage.getItem('user'))
      let email=user.email;
      if(title==='' || description==='' || priority===''|| due_date===''){
        alert("Please fill all the fields")
      }
      else{
        let data={email:email,title:title,description:description,priority:priority,date:Date.now(),due_date:due_date,stage:0}
         addtask(data)
         .then(res=>{
          if(res.data.err){
            alert(res.data.err)
          }
          else{
             alert(res.data.msg)
            setTodo([...todo,data])
            setTitle('')
            setDescription('')
            setPriorty('')
            setDuedate('')
            window.location.reload();
          }
         })
    }}
    const edit=(itm)=>{
      setChange(false)
      setId(itm._id)
      setTitle(itm.title)
      setDescription(itm.description)
      setPriorty(itm.priority)
      setDate(itm.date)
      setDuedate(itm.due_date)
    }
    const Update_Task=()=>{
      let id=ind;
      let user=JSON.parse(localStorage.getItem('user'))
      let email=user.email;
      let data={email:email,title:title,description:description,priority:priority,due_date:due_date}
      edittask(id,data)
      .then(res=>{
          if(res.data.err){
              alert(res.data.err)
          }
          else{
              alert(res.data.msg)
              window.location.reload();
          }
       })
      setChange(true)
  }
    
    const deletetask=(id)=>{
      console.log(id)
      let user=JSON.parse(localStorage.getItem('user'))
      let email=user.email;
      deletedata(id,email)
      .then(res=>{
        if(res.data.err){
          alert(res.data.err)
      }
      else{
          alert(res.data.msg)
          window.location.reload();
      }
      })

    }

    const increment= (id) =>{
      let user=JSON.parse(localStorage.getItem('user'))
      let email=user.email;
      incrementstage(id,email)
      .then(res=>{
          if(res.data.err){
              alert(res.data.err);
          }
          else{
              alert(res.data.msg);
              window.location.reload();
          }
      })
  }
  const decrement = (id) =>{
    let user=JSON.parse(localStorage.getItem('user'))
    let email=user.email;
    decrementstage(id,email)
    .then(res=>{
        if(res.data.err){
            alert(res.data.err);
        }
        else{
            alert(res.data.msg);
            window.location.reload();
        }
    })
}

    return(
        <div className="dashbackground">
          <Nav2/>
            <Container className="mt-5">
                <h2>Todo Application</h2>
                <Form className="for"> 
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Col sm="10">
                  <Form.Control type="text"  placeholder="Enter title" value={title} name="title" onChange={(e)=>setTitle(e.target.value)}/>
                  {title!=='' && title.length < 4 && <span className="text-danger">Enter title 4 characters  correctly</span>}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Col sm="10">
                  <Form.Control type="text" placeholder="Enter Description" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                
                  {description!=='' && description.length < 8 && <span className="text-danger">Enter Description of  6 characters  correctly</span>}</Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formBasicSelect">
                  <Col sm='10'>
                    <Form.Control
                      as="select"
                      value={priority}
                      onChange={e => {
                        setPriorty(e.target.value);
                      }}
                    >
                      <option >Select priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </Form.Control>
                    {priority!=='' && priority.length<3&& <span className="text-danger">Select priority  correctly</span>}
                    </Col>
                  </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Col sm="10">
                        <Form.Control  defaultValue={date} readOnly name="date" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Col sm="10">
                        <Form.Control type="Date" name="due_date" value={due_date} onChange={(e)=>setDuedate(e.target.value)}/>
                      {due_date!==''&&!moment(due_date).isAfter(date) &&<span className="text-danger">Enter Due Date correctly</span>}
                      </Col>
                    </Form.Group>{ischange?
                    <Button onClick={add_Task}>Add Task</Button>:<Button onClick={Update_Task}>Update Task</Button>}

            </Form>
            </Container>
            <Container className='mt-5'> 
                <Card  onDragOver={(e)=>onDragOver(e)} onDrop={(e)=>onDrop1(e,0)}>
                    <Card.Title>BlockLog</Card.Title>
                <Card.Body>
                    <Table responsive>
                        <tbody >
        
                        {todo.map(itm=>
                        <tr key={itm.title} draggable onDragStart={(e)=>onDragStart(e,itm._id)}> <td><Button disabled><i class="fas fa-backward"></i></Button></td>
                        <td>{itm.title}</td>
                        <td>{itm.priority}</td>
                        <td><Button onClick={()=>edit(itm)}>Edit</Button></td>
                        <td><Button onClick={()=>deletetask(itm._id)}>Delete</Button></td>
                        <td><Button onClick={()=>increment(itm._id)}><i class="fas fa-forward"></i></Button></td>
                        </tr>)}
                        </tbody>
                    </Table>
                </Card.Body>
                </Card>
                <Card onDragOver={(e)=>onDragOver(e)} onDrop={(e)=>onDrop1(e,1)}>
                    <Card.Title>Todo</Card.Title>       
                <Card.Body>
                <Table responsive>
                        <tbody >
        
                        {todo1.map(itm=>
                        <tr key={itm.title} draggable onDragStart={(e)=>onDragStart(e,itm._id)}><td><Button onClick={()=>decrement(itm._id)}><i class="fas fa-backward"></i></Button></td>
                        <td>{itm.title}</td>
                        <td>{itm.priority}</td>
                        <td><Button onClick={()=>edit(itm)}>Edit</Button></td>
                        <td><Button onClick={()=>deletetask(itm._id)}>Delete</Button></td>
                        <td><Button onClick={()=>increment(itm._id)}><i class="fas fa-forward"></i></Button></td>
                        </tr>)}
                        </tbody>
                    </Table>
                </Card.Body>
                </Card>
              
                <Card onDragOver={(e)=>onDragOver(e)} onDrop={(e)=>onDrop1(e,2)}>
                    <Card.Title>Ongoing</Card.Title>
                <Card.Body>
                <Table responsive> 
                        <tbody  >
        
                        {ongoing.map(itm=>
                        <tr key={itm.title} draggable onDragStart={(e)=>onDragStart(e,itm._id)} ><td><Button onClick={()=>decrement(itm._id)}><i class="fas fa-backward"></i></Button></td>
                        <td>{itm.title}</td>
                        <td>{itm.priority}</td>
                        <td><Button onClick={()=>edit(itm)}>Edit</Button></td>
                        <td><Button onClick={()=>deletetask(itm._id)}>Delete</Button></td>
                        <td><Button onClick={()=>increment(itm._id)}><i class="fas fa-forward"></i></Button></td>
                        </tr>)}
                        </tbody>
                    </Table>
                </Card.Body>
                </Card>
               
                <Card  onDragOver={(e)=>onDragOver(e)} onDrop={(e)=>onDrop1(e,3)}>
                    <Card.Title>Done</Card.Title>
                <Card.Body>
                <Table responsive>
                        <tbody>
        
                        {done.map(itm=>
                        <tr key={itm.title} draggable onDragStart={(e)=>onDragStart(e,itm._id)}><td><Button onClick={()=>decrement(itm._id)}><i class="fas fa-backward"></i></Button></td>
                        <td>{itm.title}</td>
                        <td>{itm.priority}</td>
                        <td><Button onClick={()=>edit(itm)}>Edit</Button></td>
                        <td><Button onClick={()=>deletetask(itm._id)}>Delete</Button></td>
                        <td><Button disabled><i class="fas fa-forward"></i></Button></td>
                        </tr>)}
                        </tbody>
                    </Table>
                </Card.Body>
                </Card>
               
            </Container>
        </div>
    )
}