import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddPaiments() {

  // get All CIN client to map for it in select option :
  const [CIIN, setCIN] = useState([])
  const [NumberAppartement , setNumberAppartement] = useState([])
  const [Date, setDate] = useState("")
  const [Montant , setMontant] = useState("")
  const [Appartement_number , setAppartementNumber] = useState("")
  const [CIN , setCin] = useState("")
  const [succes , setSucces] = useState("")
  const [error, setError] = useState("")

  const API_CLIENT = "http://localhost:3001/api/admin/client"
  const API_APPARTEMENT = "http://localhost:3001/api/admin/appartements"
  const API_ADD = "http://localhost:3001/api/admin/paiment"

  const token = localStorage.getItem("token")

  const navigate = useNavigate()

  // function GET DATA CLIENT TO RETRIVE CIN :
  function getCIN() {
    try {
      axios.get(API_CLIENT, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((data) => {
        setCIN(data.data)
      })
    } catch (error) {
      console.log(error);
    }
  }
  // function GET DATA APPARTEMENT TO RETRIVE NUMERO APPARTEMENT :
  function getNumberAppartement(){
    try {
      axios.get(API_APPARTEMENT, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((data) => {
        setNumberAppartement(data.data)
      })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCIN()
    getNumberAppartement()
  }, [])

  // handle inputs : 

  const handleDate = (e) => {
    return setDate(e.target.value)
  }
  const handleMontant = (e) => {
    return setMontant(e.target.value)
  }
  const handleAppartementNumber = (e) => {
    return setAppartementNumber(e.target.value)
  }
  const hanleCin = (e) => {
    return setCin(e.target.value)
  }
  
  // handle Submit : 
  const submitHandle = async (e) => {
    e.preventDefault();
    const Paiment = {
      Date,
      Montant,
      Appartement_number,
      CIN
    }
    try {
      await axios.post(API_ADD, Paiment , {
        headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        console.log(res.data.message);
        setSucces(res.data.message);
        navigate('/Paiments')
      })
    } catch (error) {
      console.log(error.response.data.message)
      setError(error.response.data.message)
    }
  }



  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">

          <form action className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">



            {/* code date picker */}
            <div>
              <label htmlFor="date" className="text-sm text-white font-medium">Enter Date Payment : </label>
              <div className="relative mt-1">
                <input onChange={handleDate} type="date" className="w-full rounded-lg text-black border-gray-200 p-4 pr-12 text-sm shadow-sm" placeholder="Enter Montant Appartement" />
              </div>
            </div>
            {/* end date picker  */}
            <div>
              <label htmlFor="texte" className="text-sm text-white font-medium">Enter Montant : </label>
              <div className="relative mt-1">
                <input onChange={handleMontant} type="texte" className="w-full rounded-lg text-black border-gray-200 p-4 pr-12 text-sm shadow-sm" placeholder="Enter Montant Appartement" />
              </div>
            </div>

            <div className="inline-block relative w-64">
              <label htmlFor="password" className="text-sm text-white font-medium  ">Choose Appartement Number : </label>
              <select onChange={handleAppartementNumber} className="block  text-black appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
             <option selected disabled>Appartement Number</option>
              {NumberAppartement.map((number) => (
                  <option value={number.Appartement_number}>
                    {number.Appartement_number}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>

            <div className="inline-block relative w-64">
              <label htmlFor="password" className="text-sm text-white font-medium">CIN Owner : </label>
              <select onChange={hanleCin} className="block  text-black appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option selected disabled>CIN owner</option>
                {CIIN.map((cin) => (
                  <option value={cin.CIN}>
                    {cin.CIN}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>

            <button onClick={submitHandle} type="submit" className="block w-full rounded-lg bg-[#FAC213] px-5 py-3 text-sm font-medium text-black">
              ADD PAIMENT
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddPaiments