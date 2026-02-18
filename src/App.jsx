import React, { useEffect, useState } from 'react'
import Header from './component/Header'
import Task from './component/Task'
import axios from 'axios';

const url = "http://127.0.0.1:5000/tasks"

const App = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('all')  // all, done, pending
  

  const fetchTasks = async () => {
  const res = await axios.get(url)
  setData(res.data)
}

  const addTask = async (title, content) => {
  try {
    await axios.post(url, { title, content })
    await fetchTasks()  // รอให้โหลดข้อมูลใหม่หลังเพิ่ม
  } catch (err) {
    console.log(err)
  }
}

  const editTask = async (id, title, content) => {
  try {
    await axios.put(`${url}/${id}`, { title, content })
    await fetchTasks()  // รอให้โหลดข้อมูลใหม่หลังแก้ไข
  } catch (err) {
    console.log(err)
  }
}

  const deleteTask = async (id) => {
  try {
    await axios.delete(`${url}/${id}`)
    await fetchTasks()  // รอให้โหลดข้อมูลใหม่หลังลบ
  } catch (err) {
    console.log(err)
  }
}

  const markTaskDone = async (id) => {
  try {
    await axios.put(`${url}/${id}`, { status: 'success' })
    await fetchTasks()  // รอให้โหลดข้อมูลใหม่หลังทำเครื่องหมาย
  } catch (err) {
    console.log(err)
  }
}

  useEffect(()=>{
    axios.get(url)
    .then((response)=>{
      console.log(response.data);
      setData(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  return (
    <div>
      <Header filter={filter} setFilter={setFilter}/>
      <Task data={data} filter={filter} addTask={addTask} editTask={editTask} markTaskDone={markTaskDone} deleteTask={deleteTask}/>
    </div>
  )
}

export default App
