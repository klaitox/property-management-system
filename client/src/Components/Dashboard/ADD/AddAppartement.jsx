import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddAppartement() {

  const navigate = useNavigate()
  const [Name_Residence, setNameResidence] = useState("");
  const [Appartement_number, setNumeroAppartement] = useState("");
  const [message, setMessage] = useState("");
  const [msgError , setMessageError] = useState("")
  const [error , setError] = useState(false);


  const handleName = (e) => {
    return setNameResidence(e.target.value)
  }

  const handleNumero = (e) => {
    return setNumeroAppartement(e.target.value)
  }

  const API_URL = 'http://localhost:3001/api/admin/appartement'

  const token = localStorage.getItem("token")


  const submitHandler = async (e) => {
    e.preventDefault();
    const appartement = {
      Name_Residence,
      Appartement_number
    }
    try {
       await axios.post(API_URL, appartement, {
          headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        console.log(res.data.message);
        setMessage(res.data.message)
        navigate('/Appartements')
      })
    } catch (error) {
      setMessageError(error.response?.data.message)
      setError(true)
    }
  }


  return (
    <>
      <div className="mx-auto max-w-screen-xl  px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <form action className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
            {error &&  <div role="alert" class="rounded border-l-4 border-[#FAC213] bg-[#3C4048] p-4">
  <div class="flex items-center gap-2 text-[#FAC213]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="h-5 w-5"
    >
      <path
        fill-rule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clip-rule="evenodd"
      />
    </svg>

    <strong class="block font-medium"> Something went wrong </strong>
  </div>

  <p class="mt-2 text-sm text-[#FAC213]">
    {msgError}
  </p>
</div>
  }
            <div>
              {/* input name résidence  */}
              <label htmlFor="email" className="text-sm font-medium text-white">Name Résidence :</label>
              <div className="relative mt-1">
                <input value={Name_Residence} onChange={handleName} type="input" className="w-full rounded-lg text-black border-gray-200 p-4 pr-12 text-sm shadow-sm" placeholder="Enter Name Of Résidence" />
              </div>
            </div>
            {/* input number appartement :  */}
            <div>
              <label htmlFor="password" className="text-sm text-white font-medium">Numero Appartement : </label>
              <div className="relative mt-1">
                <input value={Appartement_number} onChange={handleNumero} type="input" className="w-full rounded-lg text-black border-gray-200 p-4 pr-12 text-sm shadow-sm" placeholder="Enter Numero of Appartement" />
              </div>
            </div>
            {/* input submit form  */}
            <button onClick={submitHandler} type="submit" className="block w-full rounded-lg bg-[#FAC213] px-5 py-3 text-sm font-medium text-black">
              ADD APPARTEMENT
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  )
}

export default AddAppartement