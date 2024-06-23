import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthSignup = () => {
    const navigate = useNavigate();

    const [postInput, setPostInput] = useState({
        name: "",
        email: "",
        password: "",
        relation: "", // New field for relation
        childName: "", // New field for child's name
    });

    // Function to handle form submission
    const handleSubmit = () => {
        // Implement form submission logic here
        //serach child id 
    };

    return (
        <div className="h-screen flex justify-center items-center bg-blue-100">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <div>
                    <div className="px-10">
                        <div className="text-2xl font-bold flex justify-center"> Sign Up for Classroom! </div>
                    </div>

                    <div className="pt-5">
                        <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) =>
                            setPostInput({
                                ...postInput,
                                name: e.target.value,
                            })}/>

                        <LabelledInput label="Email" placeholder="Enter your email" onChange={(e) =>
                            setPostInput({
                                ...postInput,
                                email: e.target.value,
                            })}/>

                        <LabelledInput label="Password" placeholder="Enter your password" onChange={(e) =>
                            setPostInput({
                                ...postInput,
                                password: e.target.value,
                            })}/>

                        {/* Dropdown menu for selecting relation */}
                        <div>
                            <label className="block mb-2 text-sm text-black font-semibold pt-4">Relation</label>
                            <select onChange={(e) =>
                                setPostInput({
                                    ...postInput,
                                    relation: e.target.value,
                                })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option value="">Select Relation</option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                            </select>
                        </div>

                        <LabelledInput label="Child Name" placeholder="Enter your child's name" onChange={(e) =>
                            setPostInput({
                                ...postInput,
                                childName: e.target.value,
                            })}/>

                        <button onClick={handleSubmit} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 
                            focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                            dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            Sign Up
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
