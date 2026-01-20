import React from "react";
import '../App.css'
import UserContext from './context/UserContext'
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const { setUser } = useContext(UserContext);


    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("");
    const [msgError, setMsgError] = useState(false)
    const [error, setError] = useState(false)

    const navigate = useNavigate();

    const HandleEmail = (e) => {
        return setEmail(e.target.value)
    }

    const HandlePassword = (e) => {
        return setPassword(e.target.value)
    }

    const URL = "http://localhost:3001/api/admin/login"

    const loginHandler = async (e) => {
        e.preventDefault()
        const user = {
            Email,
            Password
        }
        try {
            const result = await axios.post(URL, user)
            const token = (result.data.token)
            localStorage.setItem('token', token)
            console.log(result.data.token);
            setUser(result.data.admin)
            navigate('/Dashboard')
        } catch (error) {
            setError(true)
            setMsgError(error.response.data.message)
        }
    }


    return (

        <div className="bg-[#3C4048]">

            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg bottom">
                    <h1 className="text-center text-4xl m-5 font-bold text-back sm:text-3xl text-white">
                        Welcome Admin
                    </h1>
                    <p className="mx-auto mt-4 max-w-md text-center text-[#FAC213]">
                        Application de syndicat pour gérer les paiement pour chaque appartement
                    </p>
                    <form action className="mt-6 mb-7 space-y-4 rounded-lg p-8 shadow-2xl bg-[#FFFF]">
                        <p className="text-lg title font-bold text-[#FAC213]">Sign in to your account</p>
                        {error && <div role="alert" class="border border-gray-100 p-4 shadow-xl">
                            <div class="flex items-start gap-4">
                                <span class="text-red-600">
                                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.9999 6.44V9.77M12.0199 2C8.3399 2 5.3599 4.98 5.3599 8.66V10.76C5.3599 11.44 5.0799 12.46 4.7299 13.04L3.4599 15.16C2.6799 16.47 3.2199 17.93 4.6599 18.41C9.44118 20 14.6086 20 19.3899 18.41C19.7054 18.3048 19.9932 18.13 20.2321 17.8986C20.471 17.6671 20.6548 17.385 20.77 17.073C20.8852 16.761 20.9288 16.4271 20.8976 16.096C20.8665 15.7649 20.7613 15.445 20.5899 15.16L19.3199 13.04C18.9699 12.46 18.6899 11.43 18.6899 10.76V8.66C18.6799 5 15.6799 2 12.0199 2Z" stroke="#FF0000" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" />
                                        <path d="M15.3299 18.8201C15.3299 20.6501 13.8299 22.1501 11.9999 22.1501C11.0899 22.1501 10.2499 21.7701 9.64992 21.1701C9.04992 20.5701 8.66992 19.7301 8.66992 18.8201" stroke="#FF0000" strokeWidth="1.5" strokeMiterlimit={10} />
                                    </svg>
                                </span>

                                <div class="flex-1">
                                    <strong class="block font-medium text-[#FF0000]">{msgError}</strong>

                                </div>

                                <button class="text-gray-500 transition hover:text-gray-600">
                                    <span class="sr-only">Dismiss popup</span>
                                </button>
                            </div>
                        </div>

                        }
                        <div>
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <div className="relative mt-1">
                                <input type="email" value={Email} onChange={HandleEmail} id="email" className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm" placeholder="Enter email" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <div className="relative mt-1">
                                <input type="password" value={Password} onChange={HandlePassword} id="password" className="w-full rounded-lg border-gray-500 p-4 pr-12 text-sm shadow-sm" placeholder="Enter password" />
                            </div>
                        </div>

                        <button type="submit" onClick={loginHandler} className="block w-full rounded-lg bg-[#FAC213] px-5 py-3 text-sm font-medium text-black">
                            Sign in
                        </button>
                    </form>
                </div>
            </div>


        </div>
    )
}
export default Login


