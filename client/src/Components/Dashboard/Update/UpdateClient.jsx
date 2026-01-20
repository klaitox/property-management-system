import {useState , useEffect} from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import axios from 'axios';


function UpdateClient() {

  const [data , setData] = useState({})
  const [Name , setName_Owner] = useState("")
  const [CIN , setCIN] = useState("")
  const [Phone_number, setPhone_Number] = useState("")

  const token = localStorage.getItem("token")

  const {id} = useParams();

  const navigate = useNavigate();

  const API = `http://localhost:3001/api/admin/client/${id}`;

  const getData = async () => {
    try {
      const data = await axios.get(API , {
        headers: {Authorization: `Bearer ${token}`}, })
        setData(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData(id.client_id);
  } ,[id.client_id])

  const handleNameOwner = (e) => {
    return setName_Owner(e.target.value)
  }
  const handleCIN = (e) => {
    return setCIN(e.target.value)
  }

  const handlePhoneNumber = (e) => {
    return setPhone_Number(e.target.value)
  }

  const API_UPDATE = `http://localhost:3001/api/admin/client/${id}`

  const submitHandler = async (e) => {
    e.preventDefault();
    const clientUpdateData = {
      Name,
      CIN,
      Phone_number
    }
    try {
      await axios.put(API_UPDATE, clientUpdateData , {
        headers: {Authorization: `Bearer ${token}`}
      }).then((res) => {
        console.log(res.data.message);
        navigate('/Clients')
      })
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">

          <form action className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
            <div>
              <label htmlFor="NameOwner" className="text-sm font-medium text-black">Name Owner :</label>
              <div className="relative mt-1">
                <input onChange={handleNameOwner}  placeholder={data.Name} type="text" className="w-full rounded-lg text-black border-gray-200 p-4 pr-12 text-sm shadow-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="Cin" className="text-sm text-black font-medium">CIN : </label>
              <div className="relative mt-1">
                <input onChange={handleCIN} placeholder={data.CIN} type="text" className="w-full rounded-lg text-black border-gray-200 p-4 pr-12 text-sm shadow-sm"/>
              </div>
            </div>
            <div>
              <label htmlFor="PhoneNumber" className="text-sm text-black font-medium">Phone Number : </label>
              <div className="relative mt-1">
                <input onChange={handlePhoneNumber}  placeholder={data.Phone_number} type="text" className="w-full rounded-lg text-black border-gray-200 p-4 pr-12 text-sm shadow-sm" />
              </div>
            </div>
            <button onClick={submitHandler} type="submit" className="block w-full rounded-lg bg-[#FF6E31] px-5 py-3 text-sm font-medium text-white">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateClient