import { useState , useEffect } from "react"
import axios from 'axios'

function Counts() {

    const [Client , setClientNumber] = useState([])
    const [Appartement , setAppartementNumber] = useState([])
    const [Paiment , setPaimentNumber] = useState([])

    const API_CLIENT = "http://localhost:3001/api/admin/clientCount"
    const API_APPAETEMENT = "http://localhost:3001/api/admin/appartementCount"
    const API_PAIMENT = "http://localhost:3001/api/admin/paimentCount"

    const token = localStorage.getItem("token")

    const CountClient = async () => {
        try {
            const data = await axios.get(API_CLIENT, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setClientNumber(data.data?.count)
        } catch (error) {
            console.log(error);
        }
    } 

    const CountAppartement = async () => {
        try {
            const data = await axios.get(API_APPAETEMENT, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setAppartementNumber(data.data?.count)
        } catch (error) {
            console.log(error);
        }
    } 

    const CountPaiment = async () => {
        try {
            const data = await axios.get(API_PAIMENT, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setPaimentNumber(data.data?.count)
        } catch (error) {
            console.log(error);
        }
    } 



    useEffect(() => {
        CountClient()
        CountAppartement()
        CountPaiment()
    }, [])

    return (
        <>
            <div className='lg:grid grid-cols-3 gap-4'>
                <div>
                    <div className="relative block rounded-sm border-t-4 border-[#FAC213] p-8 pb-24 shadow-xl">
                        <h3 className="text-4xl text-[#FAC213] font-bold">{Appartement}</h3>
                        <p className="mt-4 text-lg font-medium text-white">
                            APPARTEMENTS
                           
                        </p>
                    </div>
                </div>
                <div>
                    <div className="relative block rounded-sm border-t-4 border-[#FAC213] p-8 pb-24 shadow-xl">
                        <h3 className="text-4xl text-[#FAC213] font-bold">{Client}</h3>
                        <p className="mt-4 text-lg font-medium text-white">
                            CLIENTS
                        </p>
                    </div>
                </div>
                <div>
                    <div className="relative block rounded-sm border-t-4 border-[#FAC213] p-8 pb-24 shadow-xl">
                        <h3 className="text-4xl text-[#FAC213] font-bold">{Paiment}</h3>
                        <p className="mt-4 text-lg font-medium text-white">
                            PAIMENTS
                        </p>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Counts