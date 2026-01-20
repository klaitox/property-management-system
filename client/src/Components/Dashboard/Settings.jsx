import React, { useContext } from 'react'
import UserContext from '../context/UserContext'




function Settings() {

    const { user } = useContext(UserContext)

    console.log(user);
    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4  py-11 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl text-white">Settings</h1>
                </div>
                <form className="mx-auto mt-8 mb-0 max-w-md space-y-4">
                    <div >
                        <label htmlFor="texte" className="text-sm font-medium text-white">First Name</label>
                        <div className="relative">
                            <input type="text" className="w-full text-sm rounded-lg border-gray-500 p-4 pr-12 text-black shadow-sm" placeholder={user.First_Name} />
                        </div>
                    </div>

                    <div >
                        <label htmlFor="texte" className="text-sm font-medium text-white">Second Name</label>
                        <div className="relative">
                            <input type="texte" className="w-full text-sm  rounded-lg border-gray-500 p-4 pr-12 text-black shadow-sm" placeholder={user.Second_Name}  />
                        </div>
                    </div>

                    <div >
                        <label htmlFor="texte" className="text-sm font-medium text-white">Phone Number</label>
                        <div className="relative">
                            <input type="texte" className="w-full text-sm  rounded-lg border-gray-500 p-4 pr-12 text-black shadow-sm" placeholder={user.Phone_Number}  />
                        </div>
                    </div>

                    <div >
                        <label htmlFor="texte" className="text-sm font-medium text-white">Email</label>
                        <div className="relative">
                            <input type="texte" className="w-full text-sm  rounded-lg border-gray-500 p-4 pr-12 text-black shadow-sm" placeholder={user.Email}  />
                        </div>
                    </div>

                   
                    <div className="flex items-center justify-between">

                        <button type="submit" className=" inline-block mt-7 rounded-lg bg-[#FAC213] px-5 py-3 text-sm font-medium text-black">
                            UPDATE INFORMATIONS
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Settings