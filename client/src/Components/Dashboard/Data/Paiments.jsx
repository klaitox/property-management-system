import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Paiments() {

    const [data, setData] = useState([])
    const API_GET = "http://localhost:3001/api/admin/paiments"

    const token = localStorage.getItem("token")

    useEffect(() => {
        try {
            axios.get(API_GET, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => {
                console.log(res.data);
                setData(res.data)
            })
        } catch (error) {
            console.log(error);
        }
    }, [])


    // function to remove paiments : 
    const removePaiment = (id) => {
        axios.delete(`http://localhost:3001/api/admin/paiment/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            let result = data.filter((paiment) => paiment._id !== id)
            setData(result)
            console.log(res.data.message);
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
            <div className='flex  py-3   justify-between '>
                <h1 className='text-white font-xl font-bold ml-2 mt-4  d-flex'>ADD Paiment</h1>
                <Link to="/AddPaiments">
                    <button className='bg-[#FAC213] text-black rounded-md px-11 py-2'>Add</button>
                </Link>
            </div>
            <div className="overflow-hidden  overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                                Date
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                                Montant
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                                CIN
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                                Numéro D'appartement
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((paiment => (
                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-white dark:text-white">
                                    {paiment.Date.slice(0, 10)}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-white dark:text-gray-200">
                                    {paiment.Montant} <span className='font-bold'>DH</span>
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-white dark:text-gray-200">
                                    {paiment.CIN?.CIN}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-white dark:text-gray-200">
                                    {paiment.Appartement_number?.Appartement_number}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-white dark:text-gray-200">

                                    <button onClick={() => { removePaiment(paiment._id);showToastMessage() }} className="group relative inline-block text-sm font-medium text-[#FAC213] focus:outline-none focus:ring active:text-[#FAC213]">
                                        <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FAC213] transition-transform group-hover:translate-y-0 group-hover:translate-x-0" />
                                        <span className="relative block border border-current text-black bg-white px-8 py-3">
                                            Delete
                                        </span>
                                    </button>
                                </td>
                                <Link to={`/generatePdf/${paiment._id}`}>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">

                                        <button className="group relative inline-block text-sm font-medium text-[#FAC213] focus:outline-none focus:ring active:text-[#DC0000]">
                                            <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FAC213] transition-transform group-hover:translate-y-0 group-hover:translate-x-0" />
                                            <span className="relative block border border-current bg-[#FAC213] text-black px-8 py-3">
                                                VIEW TO PRINT
                                            </span>
                                        </button>
                                    </td>
                                </Link>
                            </tr>
                        )))}
                    </tbody>
                </table>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Paiments