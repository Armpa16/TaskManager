import React, { useEffect, useState } from 'react'
import Header from './component/Header'
import Task from './component/Task'
import axios from 'axios';

const url = "http://127.0.0.1:5000/tasks"

const App = () => {
  const [data, setData] = useState([])

  const fetchTasks = async () => {
  const res = await axios.get(url)
  setData(res.data)
}

  const deleteTask = async (id) => {
  try {
    await axios.delete(`${url}/${id}`)
    fetchTasks()  // โหลดข้อมูลใหม่หลังลบ
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
      <Header/>
      <Task data={data} deleteTask={deleteTask}/>
    </div>
  )
}

export default App
