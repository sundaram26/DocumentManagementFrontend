import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../components/common/customQuill.css'
import { modules } from "../../components/common/quillModule.js"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { FaPlus } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
// import { pdfIcon, textIcon, docxIcon } from "../../assets/index.js";
import { createProjectDraft, deleteProjectDraft, projectReport } from '../../store/rotaractMemberSlice';



// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    projectName: '',
    facultyName: '',
    venue: '',
    projectMode: '',
    startDate: '',
    endDate: '',
    avenue1: '',
    avenue2: '',
    // isDraft: false,
    isAnInstallation: false,
    isFlagship: false,
    isJointProject: false,
    income: 0,
    expense: 0,
    profit: 0,
    loss: 0,
    chairPersons: [],
    rotarians: 0,
    alumnus: 0,
    interactors: 0,
    otherGuests: 0,
    otherClubMembers: 0,
    otherPis: 0,
    otherDistrictRotaractors: 0,
    totalMembers: 0,
    coverImageUrl: '',
    attendanceImageUrl: '',
    supportDocumentUrl: '',
    draftId: null,
    // submittedBy: user?._id,
};
  
const chairPersonOptions = [
    'Rtr. Arnold Jathanna',
    'Rtr. Krunal Masurekar',
    'Rtr. Bhavna Baphedia',
    'Rtr. Saishruti Pampana',
    'Rtr. Vaishnavi Gholap',
    'Rtr. Sumit Ghadge',
    'Rtr. Sakshi Mukherjee',
    'Rtr. Heeba Khan',
    'Rtr. Purva Bafna',
    'Rtr. Ramnarayan Sahu',
    'Rtr. Arjun Kubera',
    'Rtr. Tushar Shinde',
    'Rtr. Suhani Jain',
    'Rtr. Atifa Qureshi',
    'Rtr. Sumit Bank',
    'Rtr. Mithil Kadam',
    'Rtr. Dimpal Patil',
    'Rtr. Riva Jain',
    'Rtr. Saniya Shaikh',
    'Rtr. Isha Dubey',
    'Rtr. Shreya Nair',
    'Rtr. Anshu Gupta',
    'Rtr. Lavesh Sawant',
    'Rtr. Ketaki Deshmukh'
];

const RotaractProjectForm = () => {
    const [formData, setFormData] = useState(initialState);
    const [projectAim, setProjectAim] = useState("");
    const [projectGroundwork, setProjectGroundwork] = useState("");
    const [feedbackList, setFeedbackList] = useState([{ feedbackGivenBy: '', feedbackMessage: '' }]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [feedbackCount, setFeedbackCount] = useState(1);
    const [isDraft, setIsDraft] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { draftData } = location.state || {};

  // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let newValue = value;

        if (newValue === '' || (newValue === '0' || Number(newValue) > 0)) {
            setFormData((prevState) => ({
            ...prevState,
            [name]: newValue,
            }));
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleChairPersonSelect = (person) => {
        setFormData((prevState) => {
            const newChairPersons = prevState.chairPersons.includes(person)
                ? prevState.chairPersons.filter((p) => p !== person)
                : [...prevState.chairPersons, person];
            return { ...prevState, chairPersons: newChairPersons };
        });
    };

    const handleFeedbackChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFeedbackList = feedbackList.map((feedback, i) => 
            i === index ? { ...feedback, [name]: value } : feedback
        );
        setFeedbackList(updatedFeedbackList);
    };

    const handleAddFeedback = () => {
        if (feedbackCount < 4) {  // Limit to 3 additions
            setFeedbackList([...feedbackList, { feedbackGivenBy: '', feedbackMessage: '' }]);
            setFeedbackCount(feedbackCount + 1);  // Increment feedback count
        }
    };

    const handleDraft = async (e) => {
        const checked = e.target.checked;
        setIsDraft(checked);

        if(formData.projectName === '' && checked){
            toast.error("Project Name is not provided")
            return;
        }

        const formDataToSave = new FormData();

        Object.keys(formData).forEach(key => {
            if (key !== 'projectAim' && key !== 'projectGroundwork') {
                formDataToSave.append(key, formData[key]);
            }
        });

        // Append projectAim, projectGroundwork, and feedbackList
        formDataToSave.append('projectAim', projectAim);
        formDataToSave.append('projectGroundwork', projectGroundwork);
        formDataToSave.append('feedbackList', JSON.stringify(feedbackList || []));
        formDataToSave.append('isDraft', checked); 
        // console.log("form data to save isDraft: ", checked)
        // if (checked) {
        //     formDataToSave.append('draftId', formData.draftId); // Include draftId if updating
        // }
        
        // console.log("Draft data to save:");
        // formDataToSave.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        // });

        if(checked && draftData?.draftId){
            formDataToSave.append('draftId', draftData.draftId)
        }

        try {
            const actionResult = await dispatch(createProjectDraft(formDataToSave));
            const response = actionResult.payload;

            if(response?.success && response.statusCode === 201){
                if (checked) {
                    toast.success("Draft saved successfully!!! It will be automatically deleted in 7 days");
                    navigate('/member/rotaract-member/projects');
                } 
            }
            if (response?.success && response.statusCode === 200) { // Check for successful status code
                if (checked) {
                    toast.success("Draft updated successfully!!!");
                    navigate('/member/rotaract-member/projects');
                } 
            } 
            // console.log("response: ", response);
        } catch (error) {
            console.error("Failed to save or remove draft:", error);
        }
    };

    const handleDraftDelete = async (draftId) => {
        // console.log("draftId from delete: ", draftId)
        try {
            toast.success("Draft Project has been deleted successfully...")
            await dispatch(deleteProjectDraft(draftId));
        } catch (err) {
            toast.error("Failed to delete draft", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(isDraft){
            toast.message('You cannot submit the form while it is marked as a draft.')
            return 
        }

        if (!projectAim.trim() || !projectGroundwork.trim()) {
            toast.error('Required data is not filled!');
            return;
        }

        const getWordCount = (content) => content.trim().split(/\s+/).filter(word => word.length > 0).length;

        // Get word count for projectAim and projectGroundwork
        const projectAimWordCount = getWordCount(projectAim);
        const projectGroundworkWordCount = getWordCount(projectGroundwork);

        if (projectAimWordCount > 250) {
            toast.error('Project Aim exceeds the 250-word limit. Please shorten your text.');
            return;
        }

        if (projectGroundworkWordCount > 250) {
            toast.error('Project Groundwork exceeds the 250-word limit. Please shorten your text.');
            return;
        }
        // console.log("avenue 2: ", formData.avenue2)
        if (formData.avenue1 === '' || formData.chairPersons === '') {
            toast.error('Please select valid options from dropdown!!!');
            return;
        }
    
        // console.log("project aim: ", projectAim)
        // console.log("project groundwork: ", projectGroundwork)
    
        try {
            const formDataToSubmit = new FormData();
        
            // Append non-file fields
            Object.keys(formData).forEach(key => {
                if (key !== 'projectAim' && key !== 'projectGroundwork') {
                formDataToSubmit.append(key, formData[key]);
                }
            });
        
            // Append projectAim, projectGroundwork, and feedbackList
            formDataToSubmit.append('projectAim', projectAim);
            formDataToSubmit.append('projectGroundwork', projectGroundwork);
            formDataToSubmit.append('feedbackList', JSON.stringify(feedbackList));
            formDataToSubmit.append('isDraft', isDraft)
            //   formDataToSubmit.append('feedbackList', feedbackList);
            
            //   console.log("FormData to submit:");
            //   for (let [key, value] of formDataToSubmit.entries()) {
            //     console.log(`${key}: ${value}`);
            //   }

            const actionResult = await dispatch(projectReport(formDataToSubmit));
            const response = actionResult.payload;

            // console.log("response: ", response)
        
            if (response?.success) {
                navigate('/member/rotaract-member/projects');
                if(draftData?.draftId){
                    handleDraftDelete(draftData.draftId)
                }
                toast.success("The form has been successfully submitted");
            } else {
                toast.error(response?.message || "Submission failed!");
            }
        } catch (error) {
            // console.error("error: ",error)
            toast.error("An error occurred during submission.");
        }
    };
  
    useEffect(() => {
        const now = new Date().toISOString().slice(0, 16); 
        setFormData((prevState) => ({
        ...prevState,
        startDate: prevState.startDate || now,
        endDate: prevState.endDate || now,
        }));
    }, []);

    useEffect(() => {
        const profitValue = formData.income - formData.expense;
        setFormData((prevState) => ({
        ...prevState,
        profit: profitValue >= 0 ? profitValue : 0,
        loss: profitValue < 0 ? Math.abs(profitValue) : 0,
        }));
    }, [formData.income, formData.expense]);

    useEffect(() => {
        const totalMembers = Number(formData.rotarians) + Number(formData.alumnus) + Number(formData.interactors) + Number(formData.otherGuests) + Number(formData.otherClubMembers) + Number(formData.otherPis) + Number(formData.otherDistrictRotaractors)
        setFormData((prevState) => ({
        ...prevState,
        totalMembers
        }))
    }, [formData.rotarians, formData.alumnus, formData.interactors, formData.otherGuests, formData.otherClubMembers, formData.otherPis, formData.otherDistrictRotaractors])
  
    const handleAimChange = (value) => {
        setProjectAim(value);
    };
    
    const handleGroundworkChange = (value) => {
        setProjectGroundwork(value);

    };

    // console.log("draft data: ", draftData)

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return localDate.toISOString().slice(0, 16); // This will return "yyyy-MM-ddTHH:mm"
    };



    useEffect(() => {
        // Assuming draftData is the fetched draft object
        if (draftData) {
            setFormData({
                projectName: draftData.projectName,
                facultyName: draftData.facultyName,
                venue: draftData.venue,
                projectMode: draftData.projectMode || 'select', // Default to 'select' if not provided
                startDate: formatDateForInput(draftData.startDate), // Format for input
                endDate: formatDateForInput(draftData.endDate),
                avenue1: draftData.avenue1,
                avenue2: draftData.avenue2,
                isFlagship: draftData.isFlagship,
                isJointProject: draftData.isJointProject,
                isAnInstallation: draftData.isAnInstallation,
                income: draftData.income || 0,
                expense: draftData.expense || 0,
                profit: draftData.profit || 0,
                loss: draftData.loss || 0,
                rotarians: draftData.rotarians || 0,
                alumnus: draftData.alumnus || 0,
                interactors: draftData.interactors || 0,
                otherGuests: draftData.otherGuests || 0,
                otherClubMembers: draftData.otherClubMembers || 0,
                otherPis: draftData.otherPis || 0,
                otherDistrictRotaractors: draftData.otherDistrictRotaractors || 0,
                totalMembers: draftData.totalMembers || 0,
                chairPersons: draftData.chairPersons || [],
                coverImageUrl: draftData.coverImageUrl || '',
                attendanceImageUrl: draftData.attendanceImageUrl || '',
                supportDocumentUrl: draftData.supportDocumentUrl || '',
            });
            setProjectAim(draftData.projectAim);
            setProjectGroundwork(draftData.projectGroundwork);
            setFeedbackList(draftData.feedbackList || []);
        }
    }, [draftData]);

  return (
    <form className="p-8 m-8 bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden" onSubmit={handleSubmit}>

        <p className='font-bold mb-4 text-xl'>New Project Report</p>
        
        {/* Faculty, Venue, project mode,  Name */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {['Project Name', 'Faculty Name', 'Venue'].map((placeholder, index) => {
                const name = ['projectName', 'facultyName', 'venue']
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
                )
            })}
            <div className="relative">
            <label className="block">Project Mode<span className="text-red-500">*</span></label>
            <select name={'projectMode'} required defaultValue="select" onChange={handleChange} className='w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors'>
                <option value="select" disabled>Project Mode</option>
                <option value="online">ONLINE</option>
                <option value="on-ground">ON-GROUND</option>
            </select>
            </div>
        </div>

        {/* Start & End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {['Start Date', 'End Date'].map((label, index) => {
                const name= ['startDate', 'endDate']
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
                )
            })}
        </div>

        {/** Avenue-1, Avenue-2 */}      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {['Avenue 1'].map((label, index) => {
                const name= ['avenue1']
                return (
                    <div key={index} className="space-y-1">
                        <label className="block text-gray-700">{label}<span className="text-red-500">*</span></label>
                        <select 
                            name={name[index]} 
                            required
                            value={formData[name[index]] || 'select'}  
                            onChange={handleChange} 
                            className='w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors'
                        >
                            <option value="select" disabled>{label}</option>
                            <option value="Community Service">Community Service</option>
                            <option value="Club Service">Club Service</option>
                            <option value="Career Developement">Career Developement</option>
                            <option value="International Service">International Service</option>
                            <option value="Sports">Sports</option>
                            <option value="Digital Communication">Digital Communication</option>
                            <option value="Partner In Service">Partner In Service</option>
                            <option value="Training, Revival And Sustenance">Training, Revival And Sustenance</option>
                            <option value="Editorial">Editorial</option>
                            <option value="Public Relations">Public Relations</option>
                        </select>
                    </div>
                )
            })}
            {['Avenue 2'].map((label, index) => {
                const name= ['avenue2']
                return (
                    <div key={index} className="space-y-1">
                        <label className="block text-gray-700">{label}</label>
                        <select 
                            name={name[index]} 
                            value={formData[name[index]] || 'select'}
                            onChange={handleChange} 
                            className='w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors'
                        >
                            <option value="select">{label}</option>
                            <option value="Community Service">Community Service</option>
                            <option value="Club Service">Club Service</option>
                            <option value="Career Developement">Career Developement</option>
                            <option value="International Service">International Service</option>
                            <option value="Sports">Sports</option>
                            <option value="Digital Communication">Digital Communication</option>
                            <option value="Partner In Service">Partner In Service</option>
                            <option value="Sports">Training, Revival And Sustenance</option>
                            <option value="Editorial">Editorial</option>
                            <option value="Public Relations">Public Relations</option>
                        </select>
                    </div>
                )
            })}
        </div>

        {/**form type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className='flex gap-2'>
                <input 
                type="checkbox" 
                name="isDraft"
                checked={isDraft} 
                onChange={handleDraft}  
                />
                <label>Save report as Draft?</label>
            </div>
            {['Is this Project an Installation?', 'Is it a Flagship Project?', 'Is it a Joint Project?'].map((label, index) => {
                const name= ['isAnInstallation', 'isFlagship', 'isJointProject']
                return (
                    <div className='flex gap-2'>
                        <input 
                        type="checkbox" 
                        name={name[index]} 
                        checked={formData[name[index]]} 
                        onChange={handleChange}  
                        />
                        <label>{label}</label>
                    </div>
                )
            })}
        </div>
      
        {/** Project Aim */}
        <div className="quill-container space-y-4 mb-6 mt-8">
            <p className="text-2xl font-semibold">Project Aim<span className="text-red-500">*</span></p>
            {/* <RichTextEditor name={'meetingSummary'} content={content} setContent={setContent} /> */}
            {/* <Editor
            editorState={content}
            onEditorStateChange={setContent}
            /> */}
            <ReactQuill 
            value={projectAim} 
            onChange={handleAimChange} 
            modules={modules}
            required
            className="custom-quill border rounded-lg shadow-md"
            />
            <p className='text-gray-400 text-sm right-0 text-end'>{`${projectAim.trim().split(/\s+/).filter(word => word.length > 0).length}/250 words`}</p>
        </div>

        {/** Project Groundwork */}
        <div className="quill-container space-y-4 mb-6 mt-8">
            <p className="text-2xl font-semibold">Project Groundwork<span className="text-red-500">*</span></p>
            {/* <RichTextEditor name={'meetingSummary'} content={content} setContent={setContent} /> */}
            {/* <Editor
            editorState={content}
            onEditorStateChange={setContent}
            /> */}
            <ReactQuill 
            value={projectGroundwork} 
            onChange={handleGroundworkChange} 
            modules={modules}
            required
            className="custom-quill border rounded-lg shadow-md"
            />
            <p className='text-gray-400 text-sm right-0 text-end'>{`${projectGroundwork.trim().split(/\s+/).filter(word => word.length > 0).length}/250 words`}</p>
        </div>

        {/** Project Feedback */}
        <div className="space-y-4 mb-6">
            <p className="font-semibold text-2xl">Project Feedback</p>
            {feedbackList.map((feedback, index) => (
                <div key={index} className="grid md:flex gap-6">
                    <input 
                    type="text"
                    placeholder="Feedback Given By"
                    name="feedbackGivenBy"
                    value={feedback.feedbackGivenBy}
                    onChange={(e) => handleFeedbackChange(index, e)}
                    className="w-[50%] border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                    />
                    <input 
                    type="text"
                    placeholder="Feedback Message"
                    name="feedbackMessage"
                    value={feedback.feedbackMessage}
                    onChange={(e) => handleFeedbackChange(index, e)}
                    className="w-[150%] border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                    />
                </div>
            ))}
            <div className="flex justify-center mt-4">
                <button 
                  type="button" 
                  className="px-4 py-2 flex items-center gap-2 bg-white text-green-500 border-2 border-green-500 rounded-lg hover:bg-green-500 hover:text-white" 
                  onClick={handleAddFeedback}
                >
                    <FaPlus className='text-xl font-bold'/>Add More
                </button>
            </div>
        </div>

        {/* Project Finance */}
        <div className="space-y-4 mb-6">
            <p className="font-semibold text-2xl">Project Finance</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[ 'Income', 'expense'].map((label, index) => {
                    const name = ['income', 'expense']
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
                {['Profit', 'loss'].map((label, index) => {
                    const name = ['profit', 'loss']
                    return (
                        <div key={index} className="relative">
                            <label className="block text-gray-700">{label}<span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name={name[index]}
                                value={formData[name[index]]}
                                onChange={handleChange}
                                readOnly
                                placeholder="0"
                                className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                            />
                        </div>
                    )
                })}
            </div>
        </div>

        {/** Project Chair Person(s) */}      
        <div className="grid grid-cols-1 mb-6">
            <p className="font-semibold text-2xl mb-6">Project Chair Person(s)</p>
            <div className="relative">
            <div className="border-b p-2 cursor-pointer flex justify-between" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {formData.chairPersons.length === 0 ? "Chair Persons" : formData.chairPersons.join(", ")}
                {dropdownOpen ? <FaAngleUp /> : <FaAngleDown />}

            </div>
            {dropdownOpen && (
                <div className="bg-white border rounded-md shadow-md z-10">
                    {chairPersonOptions.map((person) => (
                        <div
                        key={person}
                        onClick={() => handleChairPersonSelect(person)}
                        className={`p-2 cursor-pointer ${formData.chairPersons.includes(person) ? "bg-blue-500" : ""}`}
                        >
                        {person}
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>

        {/* Members Information */}
        <div className="space-y-4 mb-6">
            <p className="font-semibold text-2xl">
            Members Information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Rotarians', 'Alumnus', 'Interactors', 'Other Guests', 'Other Club Members', 'Other PIS', 'Other District Rotaractors', 'Total'].map((label, index) =>{
                const name = ['rotarians', 'alumnus', 'interactors', 'otherGuests', 'otherClubMembers', 'otherPis', 'otherDistrictRotaractors', 'totalMembers']
                return (
                <div key={index} className="relative">
                <label className="block text-gray-700">{label}<span className="text-red-500">*</span></label>
                <input
                    type="number"
                    name={name[index]}
                    value={formData[name[index]] || ''}
                    onChange={handleChange}
                    required
                    placeholder="0"
                    min="0" 
                    step="1"
                    className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                    />
                </div>
            )})}
            {/* {['Total'].map((label, index) => {
                const name = ["totalMembers"]
                return (
                <div key={index} className="relative">
                    <label className="block text-gray-700">{label}</label>
                    <input
                    type="number"
                    name={name[index]}
                    value={formData[name[index]]}
                    onChange={handleChange}
                    readOnly
                    placeholder="0"
                    className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                    />
                </div>
            )})} */}
            </div>
        </div>

        {/* Support Documents */}
        <div className="space-y-4 mb-6">
            <p className="font-semibold text-2xl">Support Documents</p>

            {/* Cover Image URL Input */}
            <div className="relative">
                <label className="block text-gray-700">Cover Image URL<span className="text-red-500">*</span></label>
                <input
                    type="text"
                    name="coverImageUrl"
                    placeholder="Enter image URL"
                    required
                    value={formData.coverImageUrl}
                    onChange={(e) => handleChange(e, 'coverImageUrl')}
                    className="w-[50%] border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                />
            </div>

            {/* Attendance Image URL Input */}
            <div className="relative">
                <label className="block text-gray-700">Attendance Image URL<span className="text-red-500">*</span></label>
                <input
                    type="text"
                    name="attendanceImageUrl"
                    placeholder="Enter image URL"
                    required
                    value={formData.attendanceImageUrl}
                    onChange={(e) => handleChange(e, 'attendanceImageUrl')}
                    className="w-[50%] border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                />
            </div>

            {/* Support Document URL Input */}
            <div className="relative">
                <label className="block text-gray-700">Support Document URL (Image or Document)<span className="text-red-500">*</span></label>
                <input
                    type="text"
                    name="supportDocumentUrl"
                    placeholder="Enter document URL"
                    required
                    onChange={(e) => handleChange(e, 'supportDocumentUrl')}
                    value={formData.supportDocumentUrl}
                    className="w-[50%] border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                />          
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
            <Link to='/member/rotaract-member/projects'>
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

export default RotaractProjectForm;