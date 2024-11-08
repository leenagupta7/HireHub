import React, { useState, useRef } from 'react';
import { IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DetailAboutProject = () => {
    const [description, setDescription] = useState(''); // Textarea value
    const [file,setFile]=useState(null);// File upload state
    const [isNextClicked, setIsNextClicked] = useState(false); // To track if Next is clicked
    const [skills, setSkills] = useState([]); // Array to store skills
    const [newSkill, setNewSkill] = useState(''); // Input for new skill
    const navigate =  useNavigate();
    // Function to handle textarea changes
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    // Function to handle file upload
    const handleUpdateProfileClick = (e) => {
        e.preventDefault();
        fileInput.current.click();
      };

    // Handle adding skills to the skills array
    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill(''); // Clear the input after adding
        }
    };

    // Handle "Next" button click
    const handleNextClick = () => {
        if (description.trim() && file) {
            setIsNextClicked(true);
        }
    };
    const handleChange = (e) => {
        const { name, files } = e.target;
        if (name === 'file' && files && files.length > 0) {
            setFile(files[0]);
        }
      };
    // Handle the "Submit" button click
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!file) {
          console.error('File is required');
          return;
        }
        
        const formData = new FormData();
        formData.append('description', description);
        formData.append('skills', skills);
        formData.append('file', file); // Append the file to the formData
        
        console.log('FormData being sent:', formData);
        const id= localStorage.getItem('Id')
        try {
          const response = await axios.post(`http://localhost:4000/api/users/postProject/${id}`, formData, {
            // headers: {
            //   'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
            //   'Content-Type': 'multipart/form-data',
            // },
          });
          navigate('/');
          console.log('Response:', response.data);
        } catch (err) {
          console.error('Error:', err.response ? err.response.data : err.message);
        }
      };
      
      
    

    return (
        <div className="min-h-screen flex items-center justify-center py-10 bg-black">
            <div className="bg-gray-900 p-10 rounded-xl shadow-xl w-full max-w-6xl flex flex-col md:flex-row">
                {/* Left Section (Text content) */}
                <div className="w-full md:w-1/2 flex flex-col items-start justify-center space-y-6 md:pr-10">
                    <main className="space-y-4">
                        <h1 className="text-4xl font-bold text-gray-300">
                            Tell us what you need <span className="text-orange-500">done</span>.
                        </h1>
                        <p className="text-xl text-gray-400">
                            We'll guide you to create the perfect brief. The more detail, the better.
                        </p>

                        {/* Textarea input */}
                        <textarea
                            placeholder="Enter a few bullet points or a full description"
                            className="w-full h-24 p-4 mt-4 border-2 border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none"
                            value={description}
                            onChange={handleDescriptionChange}
                        />

                        {/* File Upload Icon with text */}
                        {!isNextClicked && (<div className="flex items-center space-x-2 mt-4">
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={handleChange}
                                />
                            <label htmlFor="file-upload" className="flex items-center cursor-pointer">
                                <IconButton component="span" color="primary">
                                    <AttachFileIcon fontSize="small" />
                                </IconButton>
                                <span className="text-gray-400 text-sm ml-2">Attach your file here</span>
                            </label>
                        </div>)}

                        {/* Next Button */}
                        {!isNextClicked && (<button
                            onClick={handleNextClick}
                            disabled={!description.trim() || !file}
                            className={`${!description.trim() || !file
                                    ? 'bg-orange-500 cursor-not-allowed'
                                    : 'bg-orange-500 hover:bg-orange-600'
                                } p-2 text-white font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 w-28 mt-4`}
                        >
                            Next <ArrowForwardIcon />
                        </button>)}
                    </main>

                    {/* Show the bullet points if Next is clicked */}
                    {!isNextClicked && (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-gray-300 mt-6">
                                Enter a few bullet points or a full description.
                            </h3>
                            <p className="text-lg text-gray-400">
                                Freelancer connects over 77 million professionals globally.
                            </p>
                            <ul className="text-left list-disc pl-6 text-lg text-gray-500 space-y-2">
                                <li>From ₹100 tasks to ₹100 million projects, we've got you covered.</li>
                                <li>Connect with skilled freelancers in seconds.</li>
                                <li>Only pay freelancers once you are happy with their work.</li>
                            </ul>
                        </div>
                    )}

                    {/* Skill Section (Only visible after clicking "Next") */}
                    {isNextClicked && (
                        <div className="mt-6 space-y-4">
                            <h3 className="text-xl font-semibold text-gray-300">What skills are required?</h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full flex items-center space-x-2"
                                    >
                                        <span>{skill}</span>
                                        <button
                                            onClick={() => setSkills(skills.filter((s) => s !== skill))}
                                            className="text-black font-bold"
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center space-x-4 mt-4">
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    placeholder="Add a skill"
                                    className="p-2 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={addSkill}
                                    className="bg-orange-500 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    {isNextClicked && (
                        <button
                            onClick={handleSubmit}
                            className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 transform hover:scale-105"
                        >
                            Submit
                        </button>
                    )}

                </div>

                {/* Right Section (Image of a bird) */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
                    <img
                        src="https://www.f-cdn.com/assets/main/en/assets/job-post/redesign/bird.jpg" // Replace this with the actual image path
                        alt="Bird"
                        className="max-w-xs md:max-w-lg h-auto rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailAboutProject;
