import { MAIN_URL } from "./Url";
import axios from 'axios';
let token=localStorage.getItem('_token');
export function registerUser(formdata){
    return axios.post(`${MAIN_URL}todo/register`,formdata,{
        headers:{'Content-Type': 'multipart/form-data'}
    })
}
export function loginUser(data){
    return axios.post(`${MAIN_URL}todo/login`,data)
}
export function addtask(data){
    return axios.post(`${MAIN_URL}todo/addtask`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function gettask(email){
    return axios.get(`${MAIN_URL}todo/gettask/${email}`)
}
export function gettask1(email){
    return axios.get(`${MAIN_URL}todo/gettask1/${email}`)
}
export function edittask(id,data){
    return axios.put(`${MAIN_URL}todo/edittask/${id}`,data,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function deletedata(id){
    return axios.delete(`${MAIN_URL}todo/deletetask/${id}`,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function incrementstage(id){
    return axios.put(`${MAIN_URL}todo/incrementstage/${id}`,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function decrementstage(id){
    return axios.put(`${MAIN_URL}todo/decrementstage/${id}`,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function Updatestage(data){
    return axios.put(`${MAIN_URL}todo/updatestage`,data);
}
export function getstage(email){
    return axios.get(`${MAIN_URL}todo/getstage/${email}`);
}
export function getstage1(email){
    return axios.get(`${MAIN_URL}todo/getstage1/${email}`);
}
export function getstage2(email){
    return axios.get(`${MAIN_URL}todo/getstage2/${email}`);
}
export function getstage3(email){
    return axios.get(`${MAIN_URL}todo/getstage3/${email}`);
}
