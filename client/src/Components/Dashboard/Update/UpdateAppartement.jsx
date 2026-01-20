import React, { useState , useEffect} from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import axios from 'axios';

function UpdateAppartement() {


    const [data , setData ] = useState({})
    const [Name_Residence , setNameResidence] = useState("")
    const [Appartement_number, setAppartementNumber] = useState("")

    const token = localStorage.getItem("token")

    const {id} = useParams();

    const navigate = useNavigate();

    const API = `http://localhost:3001/api/admin/appartement/${id}`
    
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
        getData(id.appart_id);
    } ,[id.appart_id])


    const handleNameResidence = (e) => {
        return setNameResidence(e.target.value)
    }
    const handleAppartementNumber = (e) => {
        return setAppartementNumber(e.target.value)
    }

    const API_UPDATE = `http://localhost:3001/api/admin/appartement/${id}`

    const submitHandler = async (e) => {
        e.preventDefault();
        const appartementUpdateData = {
            Name_Residence,
            Appartement_number
        }
        try {
            await axios.put(API_UPDATE, appartementUpdateData, {
                headers : {Authorization: `Bearer ${token}`}
            }).then((res) => {
                console.log(res);
                navigate('/Appartements')
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
                            <label htmlFor="NameResidence" className="text-sm font-medium text-black">Name Résidence :</label>
                            <div className="relative mt-1">
                                <input onChange={handleNameResidence} type="text" className="w-full rounded-lg border-gray-200 text-black p-4 pr-12 text-sm shadow-sm" placeholder={data.Name_Residence} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="NumberAppartement" className="text-sm text-black font-medium">Numero Appartement : </label>
                            <div className="relative mt-1">
                                <input onChange={handleAppartementNumber} type="text" className="w-full rounded-lg text-black border-gray-200 p-4 pr-12 text-sm shadow-sm" placeholder={data.Appartement_number} />
                            </div>
                        </div>
                        <button onClick={submitHandler} type="submit" className="block w-full rounded-lg bg-[#FF6E31] px-5 py-3 text-sm font-medium text-white">
                            UPDATE APPARTEMENT DETAILS
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateAppartement