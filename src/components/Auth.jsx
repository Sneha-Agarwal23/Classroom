import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { BACKEND_URL } from "../config";

export const Auth = ({ type }) => {
    const navigate = useNavigate();

    const [postInput, setPostInput] = useState({
        email: "",
        password: "",
    });

    return (
        <div className="h-screen flex justify-center items-center bg-green-100">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-bold"> Login to Classroom! </div>
                    </div>

                    <div className="pt-8">
                        <LabelledInput label="Email" placeholder="Enter your email" onChange={(e) =>
                            setPostInput({
                                ...postInput,
                                email: e.target.value,
                            })}></LabelledInput>

                        <LabelledInput label="Password" placeholder="Enter your password" onChange={(e) =>
                            setPostInput({
                                ...postInput,
                                password: e.target.value,
                            })}></LabelledInput>

                        <button  type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 
                            focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                            dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LabelledInput({ label, placeholder, onChange }) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}
