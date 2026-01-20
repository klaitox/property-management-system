import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Appartements() {


    const showToastMessage = () => {
        toast.success('Deleted Succefully !', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    

    const [Appartement , setAppartement] = useState([]);
    const API_URL = "http://localhost:3001/api/admin/appartements"


    const token = localStorage.getItem("token");
    // GET ALL APPARTEMENT : 
        useEffect(() => {
        try {
            axios.get(API_URL , {
                headers: {Authorization : `Bearer ${token}`}
            }).then((data) => {
                setAppartement(data.data)
            }).catch((err) => {
                console.log(err.response.data.message);
            })
        } catch (error) {
            console.log(error.response.data.message);
        }
    },[])

    // function TO REMOVE SINGLE appartement : 
    
        const removeAppartementById = (id) => {
        axios.delete(`http://localhost:3001/api/admin/appartement/${id}`, {
            headers: {Authorization: `Bearer ${token}`},
        }).then((response) => {
            let data = Appartement.filter((app) => app._id !== id)
            setAppartement(data);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <div className='flex py-3 justify-between '>
                <h1 className='text-white font-xl font-bold ml-2 mt-4  d-flex'>ADD Appartement</h1>
                <Link to="/AddAppartement">
                    <button className='bg-[#FAC213] rounded-md text-black px-11 py-2'>Add</button>
                </Link>
            </div>
            <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y   text-sm dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                                Name Residence
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                                Appartement Number
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {Appartement.map((appart) => (
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-white dark:text-white">
                                {appart.Name_Residence}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-white dark:text-gray-200">
                                {appart.Appartement_number}
                            </td>
                            <Link to={`/UpdateAppartement/${appart._id}`}>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                    <button  className="group relative inline-block text-sm font-medium text-[#FAC213] focus:outline-none focus:ring active:text-indigo-500">
                                        <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FAC213] transition-transform group-hover:translate-y-0 group-hover:translate-x-0" />
                                        <span className="relative block border border-current bg-white text-black px-8 py-3">
                                            Update
                                        </span>
                                    </button>
                                </td>
                            </Link>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                <button onClick={() => {removeAppartementById(appart._id) ;showToastMessage()}} className="group relative inline-block text-sm font-medium text-[#FAC213] focus:outline-none focus:ring active:text-[#FAC213]">
                                    <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FAC213] transition-transform group-hover:translate-y-0 group-hover:translate-x-0" />
                                    <span  className="relative block border border-current bg-white  text-black px-8 py-3">
                                        Delete
                                    </span>
                                </button>
                            </td>
                        </tr>
                         ))}
                    </tbody>
                    <ToastContainer />
                </table>
            </div>
        </div>
    )
}

export default Appartements