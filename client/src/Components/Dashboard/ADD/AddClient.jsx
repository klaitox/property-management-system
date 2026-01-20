import React from 'react'
import { useState ,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function AddClient() {

    const navigate = useNavigate()
    const [Name, setName] = useState("");
    const [CIN, setCin] = useState("");
    const [Phone_number, setPhone_number] = useState("");
    const [error , setError] = useState(false)
    const [msg , setMsgError] = useState("")


    const handleName = (e) => {
      return setName(e.target.value)
    }

    const handleCIN = (e) => {
      return setCin(e.target.value)
    }

    const handePhoneNumer = (e) => {
      return setPhone_number(e.target.value)
    }

    const API =  "http://localhost:3001/api/admin/client"

    const token = localStorage.getItem("token")

    const submiHandler = async (e) => {
      e.preventDefault()
      const client = {
        Name,
        CIN,
        Phone_number
      }
      try {
        await axios.post(API, client , {
          headers : {Authorization : `Bearer ${token}`}
        }).then((res) => {
          console.log(res);
          navigate('/Clients')
        })
      } catch (error) {
        console.log(error.response.data.message);
        setError(true)
        setMsgError(error.response.data.message)
      }
    }


    return (
        <>
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
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
    {msg}
  </p>
</div>
  }
      <div>
        <label htmlFor="NameOwner" className="text-sm font-medium text-white">Name Owner :</label>
        <div className="relative mt-1">
          <input onChange={handleName} type="text"  className="w-full rounded-lg text-black border-gray-200 p-4 pr-12 text-sm shadow-sm" placeholder="Enter Name Of Owner" />
        </div>
      </div>
      <div>
        <label htmlFor="Cin" className="text-sm text-white font-medium">CIN : </label>
        <div className="relative mt-1">
          <input onChange={handleCIN} type="text"  className="w-full rounded-lg text-black border-gray-200 p-4 pr-12 text-sm shadow-sm" placeholder="Enter Number CIN" />
        </div>
      </div>
      <div>
        <label htmlFor="PhoneNumber" className="text-sm text-white font-medium">Phone Number : </label>
        <div className="relative mt-1">
          <input onChange={handePhoneNumer} type="text"  className="w-full rounded-lg text-black border-gray-200 p-4 pr-12 text-sm shadow-sm" placeholder="Enter Phone Numero" />
        </div>
      </div>
      <button onClick={submiHandler} type="submit" className="block w-full rounded-lg bg-[#FAC213] px-5 py-3 text-sm font-medium text-black">
        ADD CLIENT
      </button>
    </form>
  </div>
</div>

        </>
    )
}

export default AddClient