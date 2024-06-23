import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AdmissionForm = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([{ name: '', relationship: '', mobile: '' }]);
  const [releasePersons, setReleasePersons] = useState([{ name: '', relationship: '', mobile: '' }]);
  const navigate = useNavigate();

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  const closeSlider = () => {
    setIsSliderOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: '', relationship: '', mobile: '' }]);
  };

  const addReleasePerson = () => {
    setReleasePersons([...releasePersons, { name: '', relationship: '', mobile: '' }]);
  };

  const handleEmergencyContactChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...emergencyContacts];
    list[index][name] = value;
    setEmergencyContacts(list);
  };

  const handleReleasePersonChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...releasePersons];
    list[index][name] = value;
    setReleasePersons(list);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Menu Logo */}
      <button
        className={`fixed left-5 top-6 m-4 p-2 bg-gray-900 text-white rounded-full focus:outline-none z-10 ${isSliderOpen ? 'hidden' : ''}`}
        onClick={toggleSlider}
      >
        <span className="text-xl">| | |</span>
      </button>

      {/* Slider */}
      <div className={`fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out transform ${isSliderOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-4">
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
          {/* Slider buttons */}
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => navigate('/admin/dashboard')}>Home</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => navigate('/admin/admin-registration')}>Admin Registration</button>
          <button className="py-2 px-4 mb-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md" onClick={() => navigate('/admin/school-registration')}>School Registration</button>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-grow overflow-y-auto p-8 transition-all duration-300 ease-in-out ${isSliderOpen ? 'ml-64' : 'ml-0'}`} onClick={closeSlider}>
        <Navbar />
        <div className="mt-8 w-full px-4">
          <h1 className="text-4xl font-semibold mb-6 text-center">Admission Form</h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            {/* Child Details */}
            <div className="border-b border-gray-300 mb-6 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Child Details</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col">
                  <label htmlFor="childFirstName">First Name</label>
                  <input type="text" id="childFirstName" name="childFirstName" className={inputField} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="childLastName">Last Name</label>
                  <input type="text" id="childLastName" name="childLastName" className={inputField} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="childDOB">Date of Birth</label>
                  <input type="date" id="childDOB" name="childDOB" className={inputField} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="pob">Place of Birth</label>
                  <input type="text" id="pob" name="pob" className={inputField} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="childNationality">Nationality</label>
                  <input type="text" id="childNationality" name="childNationality" className={inputField} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="childGender">Gender</label>
                  <select id="childGender" name="childGender" className={inputField}>
                    <option value="other">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="bloodGroup">Blood Group</label>
                  <input type="text" id="bloodGroup" name="bloodGroup" className={inputField} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="age">Age</label>
                  <input type="number" id="age" name="age" className={inputField} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="preschoolAttended">Preschool Attended Earlier</label>
                  <input type="text" id="preschoolAttended" name="preschoolAttended" className={inputField} />
                </div>
              </div>
            </div>

            {/* Parents Details */}
            <div className="border-b border-gray-300 mb-6 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Parent Details</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col">
                  <h2 className='pb-5 font-semibold'>Mother</h2>
                  <label htmlFor="motherFirstName">Name</label>
                  <input type="text" id="motherFirstName" name="motherFirstName" className={inputField} />
                  <label htmlFor="motherPhone">Phone Number</label>
                  <input type="tel" id="motherPhone" name="motherPhone" className={inputField} />
                  <label htmlFor="motherAddress">Address</label>
                  <input type="text" id="motherAddress" name="motherAddress" className={inputField} />
                  <label htmlFor="motherEmail">Email</label>
                  <input type="email" id="motherEmail" name="motherEmail" className={inputField} />
                  <label htmlFor="motherProfession">Profession</label>
                  <input type="text" id="motherProfession" name="motherProfession" className={inputField} />
                </div>
                <div className="flex flex-col">
                  <h2 className='pb-5 font-semibold'>Father</h2>
                  <label htmlFor="fatherFirstName">Name</label>
                  <input type="text" id="fatherFirstName" name="fatherFirstName" className={inputField} />
                  <label htmlFor="fatherPhone">Phone Number</label>
                  <input type="tel" id="fatherPhone" name="fatherPhone" className={inputField} />
                  <label htmlFor="fatherAddress">Address</label>
                  <input type="text" id="fatherAddress" name="fatherAddress" className={inputField} />
                  <label htmlFor="fatherEmail">Email</label>
                  <input type="email" id="fatherEmail" name="fatherEmail" className={inputField} />
                  <label htmlFor="fatherProfession">Profession</label>
                  <input type="text" id="fatherProfession" name="fatherProfession" className={inputField} />
                </div>
              </div>
            </div>

             {/* Release and Emergency Contact Person Details */}
             <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Release from School Person</h2>
                {releasePersons.map((releasePerson, index) => (
                  <div key={index} className='pb-5'>
                    <input
                      type="text"
                      name="name"
                      value={releasePerson.name}
                      placeholder="Name"
                      onChange={(e) => handleReleasePersonChange(index, e)}
                      className={inputField}
                    />
                    <input
                      type="text"
                      name="relationship"
                      value={releasePerson.relationship}
                      placeholder="Relationship with Child"
                      onChange={(e) => handleReleasePersonChange(index, e)}
                      className={inputField}
                    />
                    <input
                      type="tel"
                      name="mobile"
                      value={releasePerson.mobile}
                      placeholder="Mobile Number"
                      onChange={(e) => handleReleasePersonChange(index, e)}
                      className={inputField}
                    />
                  </div>
                ))}
                <button type="button" onClick={addReleasePerson} className={btnPrimary}>+ Add Release Person</button>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Emergency Contact Person</h2>
                {emergencyContacts.map((emergencyContact, index) => (
                  <div key={index} className='pb-5'>
                    <input
                      type="text"
                      name="name"
                      value={emergencyContact.name}
                      placeholder="Name"
                      onChange={(e) => handleEmergencyContactChange(index, e)}
                      className={inputField}
                    />
                    <input
                      type="text"
                      name="relationship"
                      value={emergencyContact.relationship}
                      placeholder="Relationship with Child"
                      onChange={(e) => handleEmergencyContactChange(index, e)}
                      className={inputField}
                    />
                    <input
                      type="tel"
                      name="mobile"
                      value={emergencyContact.mobile}
                      placeholder="Mobile Number"
                      onChange={(e) => handleEmergencyContactChange(index, e)}
                      className={inputField}
                    />
                  </div>
                ))}
                <button type="button" onClick={addEmergencyContact} className={btnPrimary}>+ Add Emergency Contact Person</button>
              </div>
            </div>
                
            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button type="submit" className={btnPrimary}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
                
// You can add some custom styling classes for the form fields and buttons here
const inputField = `border rounded-md px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500`;
                
const btnPrimary = `bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 `;
                
export default AdmissionForm;
