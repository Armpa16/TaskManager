import React, { useState } from 'react'
import { MdEditNote } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { MdCheckCircle } from "react-icons/md";



const Task = ({data, filter, addTask, editTask, markTaskDone, deleteTask}) => {
    const [showForm, setShowForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editContent, setEditContent] = useState('')

    const handleAddTask = async (e) => {
        e.preventDefault()
        if (title.trim() && content.trim()) {
            await addTask(title, content)
            setTitle('')
            setContent('')
            setShowForm(false)
        } else {
            alert('กรุณากรอกชื่องานและรายละเอียด')
        }
    }

    const openEditForm = (item) => {
        setEditingId(item.id)
        setEditTitle(item.title)
        setEditContent(item.content)
        setShowEditForm(true)
    }

    const handleEditTask = async (e) => {
        e.preventDefault()
        if (editTitle.trim() && editContent.trim()) {
            await editTask(editingId, editTitle, editContent)
            setEditingId(null)
            setEditTitle('')
            setEditContent('')
            setShowEditForm(false)
        } else {
            alert('กรุณากรอกชื่องานและรายละเอียด')
        }
    }

    // Filter tasks based on filter selection
    const filteredData = data.filter((task) => {
        if (filter === 'done') return task.status === 'success'
        if (filter === 'pending') return task.status !== 'success'
        return true // 'all'
    })

  return (
    <div className='m-10'>
        <div className='flex justify-between items-center '>
            <h1 className='text-2xl font-medium'>รายการงาน</h1>
            <div 
                className='flex gap-5 justify-center items-center text-2xl'
                onClick={() => setShowForm(!showForm)}
            >
                <span>เพิ่มงานใหม่</span>
                <IoIosAddCircle className='text-green-500 text-5xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'/>
            </div>
        </div>

        {showForm && (
            <div className='fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 '>
                <div className='bg-white rounded-lg shadow-xl p-6 w-96'>
                    <h2 className='text-2xl font-medium mb-4'>เพิ่มงานใหม่</h2>
                    <form onSubmit={handleAddTask}>
                        <input
                            type='text'
                            placeholder='ชื่องาน'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-blue-500'
                        />
                        <textarea
                            placeholder='รายละเอียดงาน'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded-lg mb-3 h-32 focus:outline-none focus:border-blue-500'
                        />
                        <div className='flex gap-3'>
                            <button
                                type='submit'
                                className='flex-1 bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-green-600 transition-all'
                            >
                                บันทึก
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    setShowForm(false)
                                    setTitle('')
                                    setContent('')
                                }}
                                className='flex-1 bg-gray-400 text-white font-medium py-2 rounded-lg hover:bg-gray-600 transition-all'
                            >
                                ยกเลิก
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {showEditForm && (
            <div className='fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 '>
                <div className='bg-white rounded-lg shadow-xl p-6 w-96'>
                    <h2 className='text-2xl font-medium mb-4'>แก้ไขงาน</h2>
                    <form onSubmit={handleEditTask}>
                        <input
                            type='text'
                            placeholder='ชื่องาน'
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-blue-500'
                        />
                        <textarea
                            placeholder='รายละเอียดงาน'
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded-lg mb-3 h-32 focus:outline-none focus:border-blue-500'
                        />
                        <div className='flex gap-3'>
                            <button
                                type='submit'
                                className='flex-1 bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-all'
                            >
                                อัพเดต
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    setShowEditForm(false)
                                    setEditingId(null)
                                    setEditTitle('')
                                    setEditContent('')
                                }}
                                className='flex-1 bg-gray-400 text-white font-medium py-2 rounded-lg hover:bg-gray-500 transition-all'
                            >
                                ยกเลิก
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        <div className='flex flex-wrap justify-center mt-5'>
            {
                filteredData.map((item)=>{
                    return(
                        <div key={item.id} className={`w-100 h-63 shadow-xl p-4 m-3 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out ${item.status === 'success' ? 'bg-green-100 border-2 border-green-500' : 'bg-white'}`}>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-xl font-medium'>{item.title}</h1>
                                {item.status !== 'success' && (
                                    <div 
                                        onClick={() => openEditForm(item)}
                                        className='w-10 h-10 text-black text-2xl bg-amber-300 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center'>
                                        <MdEditNote/>
                                    </div>
                                )}
                            </div>
                            <div className={`p-3 rounded-xl h-30 mt-3 ${item.status === 'success' ? 'bg-green-50' : 'bg-gray-100'}`}>
                                <p>{item.content}</p>
                            </div>
                            <div className='flex justify-between items-center mt-3'>
                                {item.status === 'success' ? (
                                    <div className='flex-1 h-10 flex items-center justify-center text-white font-medium bg-green-500 rounded-lg'>
                                        <MdCheckCircle className='text-xl mr-2'/>
                                        Done
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => markTaskDone(item.id)}
                                        className='w-20 h-10 text-white font-medium bg-green-500 rounded-lg cursor-pointer hover:bg-green-600 hover:scale-105 transition-all duration-300 ease-in-out'
                                    >
                                        Done
                                    </button>
                                )}
                                {item.status !== 'success' && (
                                    <div className='w-10 h-10 text-white text-xl bg-red-500 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center'>
                                        <IoMdTrash onClick={()=>deleteTask(item.id)}/>   
                                    </div>
                                )}
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