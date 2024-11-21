import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../components/common/customQuill.css'
import { modules } from "../../components/common/quillModule.js"
import { toast } from 'react-toastify'; 
import { createMouReport } from '../../store/rotaractMemberSlice/index.js';


// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  sponsorName: '',
  sponsorAmount: '',
  dateOfSigning: '',
};

const RotaractMouForm = () => {
    const [formData, setFormData] = useState(initialState);
    const [deliverablesOfferedBySponsor, setDeliverablesOfferedBySponsor] = useState("");
    const [deliverablesOfferedByClub, setDeliverablesOfferedByClub] = useState("");
    const [mouPdfUpload, setMouPdfUpload] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    // Handle input changes
    const handleChange = (e) => {
        const { name, value} = e.target;

        if (name === 'sponsorAmount' && value < 0) {
            return; 
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.sponsorAmount < 0){
            toast.error("Amount can't be negative")
            return;
        }
        
        if (!deliverablesOfferedByClub.trim()) {
            toast.error('Required data is not filled!');
            return;
        }

        if (!deliverablesOfferedBySponsor.trim()) {
            toast.error('Required data is not filled!');
            return;
        }

        const wordCountDeliverableByClub = deliverablesOfferedByClub.trim().split(/\s+/).filter(word => word.length > 0).length;
        const wordCountDeliverableBySponsor = deliverablesOfferedBySponsor.trim().split(/\s+/).filter(word => word.length > 0).length;
        

        if(wordCountDeliverableBySponsor > 1000 ) {
            toast.error('Deliverables Offered By Sponsor exceeds the 1000-word limit. Please shorten your text.');
            return;
        }

        if(wordCountDeliverableByClub > 1000 ) {
            toast.error('Deliverables Offered By Club exceeds the 1000-word limit. Please shorten your text.');
            return;
        }

        if (mouPdfUpload) {
            const validTypes = ['application/pdf'];
            const maxSize = 25 * 1024 * 1024; // 25 MB
            
            // Check file type
            if (!validTypes.includes(mouPdfUpload.type)) {
                toast.error('Please upload a valid PDF file.');
                return;
            }
    
            // Check file size
            if (mouPdfUpload.size > maxSize) {
                toast.error('File size exceeds the 25 MB limit.');
                return;
            }
        }
        
    
        try {
            const formDataToSubmit = new FormData();
        
            Object.keys(formData).forEach(key => {
                if (key !== 'deliverablesOfferedByClub' && key !== 'deliverablesOfferedBySponsor') {
                    formDataToSubmit.append(key, formData[key]);
                }
            });
            
            formDataToSubmit.append('deliverablesOfferedByClub', deliverablesOfferedByClub);
            formDataToSubmit.append('deliverablesOfferedBySponsor', deliverablesOfferedBySponsor);

            if (mouPdfUpload) {
                formDataToSubmit.append('mouPdfUpload', mouPdfUpload);
            }
        
            const actionResult = await dispatch(createMouReport(formDataToSubmit));
            const response = actionResult.payload;
        
            if (response?.success) {
                navigate('/member/rotaract-member/mou');
                toast.success("The form has been successfully submitted")
            } else {
                toast.error(response?.message || "Submission failed!");
            }
        } catch (error) {
            toast.error("An error occurred during submission.");
        }
    };

    useEffect(() => {
        const now = new Date().toISOString().slice(0, 16); 
        setFormData((prevState) => ({
            ...prevState,
            dateOfSigning: prevState.dateOfSigning || now,
        }));
    }, []);

    const handleDeliverablesOfferedByClubChange = (value) => {
        setDeliverablesOfferedByClub(value);
    };

    const handleDeliverablesOfferedBySponsorChange = (value) => {
        setDeliverablesOfferedBySponsor(value);
    };

    const handleMouPdfUploadChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMouPdfUpload(file);
        }
    };

  return (
    <form className="p-8 m-8 bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden" onSubmit={handleSubmit}>
        {/* Name of the sponsor */}
        <p className='font-bold mb-4 text-xl'>New MoU Report</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-6">
            {['Name of the Sponsor'].map((placeholder, index) => {
            const name = ['sponsorName']
            return (
                <div key={index} className="relative">
                    <label className="block text-gray-700">
                        {placeholder}<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name={name[index]}
                        value={formData[name[index]]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required
                        className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                    />
                </div>
            )})}

            {/** Sponsor Amount */}
            {[ 'Sponsor Amount'].map((label, index) => {
                const name = ['sponsorAmount']
                return (
                    <div key={index} className="relative">
                        <label className="block text-gray-700">{label}<span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            name={name[index]}
                            value={formData[name[index]] || ''}
                            onChange={handleChange}
                            placeholder="0"
                            required
                            min="0" 
                            step="1"
                            className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                        />
                    </div>
                )
            })}
        </div>
        

        {/** Deliverables Offered By Sponsor */}
        <div className="quill-container space-y-4 mb-6 mt-8">
            <p className="text-2xl font-semibold">Deliverables Offered By Sponsor<span className="text-red-500">*</span></p>
            <ReactQuill 
            value={deliverablesOfferedBySponsor} 
            onChange={handleDeliverablesOfferedBySponsorChange} 
            modules={modules}
            className="custom-quill border rounded-lg shadow-md"
            />
            <p className='text-gray-400 text-sm right-0 text-end'>{`${deliverablesOfferedBySponsor.trim().split(/\s+/).filter(word => word.length > 0).length}/1000 words`}</p>
        </div>

        <div className="quill-container space-y-4 mb-6 mt-8">
            <p className="text-2xl font-semibold">Deliverables Offered By Club<span className="text-red-500">*</span></p>
            <ReactQuill 
            value={deliverablesOfferedByClub} 
            onChange={handleDeliverablesOfferedByClubChange} 
            modules={modules}
            className="custom-quill border rounded-lg shadow-md"
            />
            <p className='text-gray-400 text-sm right-0 text-end'>{`${deliverablesOfferedByClub.trim().split(/\s+/).filter(word => word.length > 0).length}/1000 words`}</p>
        </div>

        {/* Signing Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {['Date Of Signing in Sponsor'].map((label, index) => {
            const name= ['dateOfSigning']
            return (
            <div key={index} className="space-y-1">
                <label className="block text-gray-700">{label}<span className="text-red-500">*</span></label>
                <input
                type="datetime-local"
                name={name[index]}
                value={formData[name[index]]}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                />
            </div>
            )})}
        </div>

        {/* PDF upload */}
        <div className="space-y-4 mb-6">
            <p className="font-semibold text-2xl">PDF Upload (Maximum file size: 25MB)</p>
            <div className='w-[50%]'>
                <input 
                    type="file" 
                    name="mouPdfUpload" 
                    value={formData.mouPdfUpload}
                    onChange={handleMouPdfUploadChange}
                />
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
            <Link to='/member/rotaract-member/mou'>
            <button
                type="button"
                className="px-4 py-2 bg-white text-gray-500 border-2 border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white"
            >
                Cancel
            </button>
            </Link>
            <button
            type="submit"
            className="px-4 py-2 bg-white text-green-500 border-2 border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
            >
                Submit
            </button>
        </div>
    </form>
  );
};

export default RotaractMouForm;
