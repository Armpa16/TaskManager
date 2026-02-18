import React from 'react'
import { MdEditNote } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";



const Task = ({data,deleteTask}) => {
    // const [tasks, setTasks] = useState([])

    // const deleteT = async (id) => {
    //     try {
    //         await axios.delete(`http://127.0.0.1:5000/tasks/${id}`)
    //         setTasks(tasks.filter(data => data.id !== id))
    //         console.log("DELETE ID:", id)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

  return (
    <div className='m-10'>
        <div className='flex justify-between items-center '>
            <h1 className='text-2xl font-medium'>รายการงาน</h1>
            <div className='flex gap-5 justify-center items-center text-2xl'>
                <span>เพิ่มงานใหม่</span>
                <IoIosAddCircle className='text-green-500 text-5xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'/>
            </div>

        </div>
        <div className='flex flex-wrap justify-center mt-5'>
            {
                data.map((item)=>{
                    return(
                        <div key={item.id} className="w-100 h-63 bg-white shadow-xl p-4 m-3 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                            <div className='flex justify-between items-center'>
                                <h1 className='text-xl font-medium '>{item.title}</h1>
                                <div className='w-10 h-10 text-black text-2xl bg-amber-300 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center'>
                                    <MdEditNote/>
                                </div>
                            </div>
                            <div className='p-3 bg-gray-100 rounded-xl h-30 mt-3'>
                                <p>{item.content}</p>
                            </div>
                            <div className='flex justify-between items-center mt-3'>
                                <button className='w-20 h-10 text-white font-medium bg-green-500 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'>Done</button>
                                <div className='w-10 h-10 text-white text-xl bg-red-500 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center'>
                                    <IoMdTrash onClick={()=>deleteTask(item.id)}/>   
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Task