import React from 'react'
import { Link } from 'react-router-dom'
import { useState , useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Client() {


    const [client, setClients] = useState([])
    const API_URL = "http://localhost:3001/api/admin/client"

    const token = localStorage.getItem("token")

    //get ALL clients : 
    useEffect(() => {
      try {
        axios.get(API_URL , {
          headers: {Authorization : `Bearer ${token}`}        
        }).then((data) => {
          setClients(data.data)
        })
      } catch (error) {
        console.log(error);
      }
    }, []);



    // function TO remove SINGLE Client 

    const removeClientById = (id) => {
        const API_DELETE = `http://localhost:3001/api/admin/client/${id}`
        axios.delete(API_DELETE , {
            headers: {Authorization: `Bearer ${token}`},
        }).then((res) => {
            let data = client.filter((cl) => cl._id !== id)
            setClients(data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const showToastMessage = () => {
        toast.success('Deleted Succefully !', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };


  return (
    <div>
         <div className='flex py-3  justify-between '>
            <h1 className='text-white font-xl font-bold ml-2 mt-4  d-flex'>ADD Owner</h1>
            <Link to="/AddClients">
            <button className='bg-[#FAC213] rounded-md text-black px-11 py-2'>Add</button>
            </Link>
            </div>
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y  divide-gray-200 text-sm dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                    Name Owner
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                    CIN
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                    Phone Number
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                    </th> <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                    </th>

                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {client.map((cl) => 
                <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-white dark:text-white">
                        {cl.Name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2  text-white dark:text-gray-200">
                    {cl.CIN}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-white dark:text-gray-200">
                    {cl.Phone_number}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        <Link to={`/UpdateClient/${cl._id}`}>
                                <button className="group relative inline-block text-sm font-medium text-[#FAC213] focus:outline-none focus:ring active:text-indigo-500">
                                    <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FAC213] transition-transform group-hover:translate-y-0 group-hover:translate-x-0" />
                                    <span className="relative block border border-current text-black bg-white px-8 py-3">
                                        Update
                                    </span>
                                </button>
                        </Link>
                            </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        
                                <button onClick={() => {removeClientById(cl._id);showToastMessage()}} className="group relative inline-block text-sm font-medium text-[#FAC213] focus:outline-none focus:ring active:text-[#FAC213]">
                                    <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FAC213] transition-transform group-hover:translate-y-0 group-hover:translate-x-0" />
                                    <span className="relative block border border-current text-black bg-white px-8 py-3">
                                        Delete
                                    </span>
                                </button>
                     </td>
                </tr>   
                )}
            </tbody>
        </table>
        <ToastContainer />
    </div>
</div>
  )
}

export default Client