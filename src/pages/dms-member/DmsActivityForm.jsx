import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../components/common/customQuill.css'
import { modules } from "../../components/common/quillModule.js"
import { toast } from 'react-toastify'; 
import { FaPlus } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
// import { pdfIcon, textIcon, docxIcon } from "../../assets/index.js";
import { createActivityDraft, deleteActivityDraft, activityReport } from '../../store/dmsMemberSlice';
import { Link } from 'react-router-dom';


// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    activityName: '',
    facultyName: '',
    venue: '',
    activityMode: '',
    startDate: '',
    endDate: '',
    // isDraft: false,
    isJointActivity: false,
    jointActivityPartner: '',
    expense: 0,
    chairPersons: '',
    coverImageUrl: '',
    attendanceImageUrl: '',
    supportDocumentUrl: '',
    draftId: null,
    // submittedBy: user?._id,
};

const chairPersonOptions = [
  'Mr. Anil S. Tiwari',
  'Dr. Anand Dharmadhikari',
  'Dr. Madhu Shukrey',
  'Dr. Rinky Rajwani',
  'Mr. Suraj Agarwala',
  'Dr. Chandra Iyer',
  'Mr. Ganesh Kumawat',
  'Ms. Akanksha Thakur',
  'Ms. Saroj Iyengar',
  'Dr. Sadhana Kapote',
  'Mr. Arnold Jathanna',
  'Ms. Navya Premdarsh',
  'Ms. Glodit Raphel',
  'Ms. Revati Hunswadkar',
  'Dr. Priya Pandharpatte',
  'Ms. Avani Nebhani',
  'Dr. Abhijeet Rawal',
  'Mr. Samarth Nebhani',
  'Ms. Nishmita Rana',
  'Ms. Komal Tiwari',
  'Dr. Amrita Harjani',
  'Ms. Dia Jotwani'
]

const DmsActivityForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [activityAim, setActivityAim] = useState("");
  const [activityGroundwork, setActivityGroundwork] = useState("");
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

    if(formData.activityName === '' && checked){
        toast.error("Activity Name is not provided")
        return;
    }

    const formDataToSave = new FormData();

    Object.keys(formData).forEach(key => {
        if (key !== 'activityAim' && key !== 'activityGroundwork') {
            formDataToSave.append(key, formData[key]);
        }
    });

    // Append activityAim, activityGroundwork, and feedbackList
    formDataToSave.append('activityAim', activityAim);
    formDataToSave.append('activityGroundwork', activityGroundwork);
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
        const actionResult = await dispatch(createActivityDraft(formDataToSave));
        const response = actionResult.payload;

        if(response?.success && response.statusCode === 201){
            if (checked) {
                toast.success("Draft saved successfully!!! It will be automatically deleted in 7 days");
                navigate('/member/dms-member/activities');
            } 
        }
        if (response?.success && response.statusCode === 200) { // Check for successful status code
            if (checked) {
                toast.success("Draft updated successfully!!!");
                navigate('/member/dms-member/activities');
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
        toast.success("Draft Activity has been deleted successfully...")
        await dispatch(deleteActivityDraft(draftId));
    } catch (err) {
        toast.error("Failed to delete draft", err);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if(isDraft){
      toast.message('You cannot submit the form while it is marked as a draft.')
      return 
    }

    if (!activityAim.trim() || !activityGroundwork.trim()) {
        toast.error('Required data is not filled!');
        return;
    }

    const getWordCount = (content) => content.trim().split(/\s+/).filter(word => word.length > 0).length;

    // Get word count for activityAim and activityGroundwork
    const activityAimWordCount = getWordCount(activityAim);
    const activityGroundworkWordCount = getWordCount(activityGroundwork);

    if (activityAimWordCount > 500) {
        toast.error('Activity Aim exceeds the 500-word limit. Please shorten your text.');
        return;
    }

    if (activityGroundworkWordCount > 500) {
        toast.error('Activity Groundwork exceeds the 500-word limit. Please shorten your text.');
        return;
    }

    if ( formData.chairPersons === '') {
        toast.error('Please select valid options from dropdown!!!');
        return;
    }

    if(formData.isJointActivity){
        if(formData.jointActivityPartner === ""){
            toast.error("Activity Partner is required!!!")
        }
    }
  
    // console.log("activity aim: ", activityAim)
    // console.log("activity groundwork: ", activityGroundwork)
  
    try {
      const formDataToSubmit = new FormData();
  
      // Append non-file fields
      Object.keys(formData).forEach(key => {
        if (key !== 'activityAim' && key !== 'activityGroundwork') {
          formDataToSubmit.append(key, formData[key]);
        }
      });
  
      // Append activityAim, activityGroundwork, and feedbackList
      formDataToSubmit.append('activityAim', activityAim);
      formDataToSubmit.append('activityGroundwork', activityGroundwork);
      formDataToSubmit.append('feedbackList', JSON.stringify(feedbackList));
      formDataToSubmit.append('isDraft', isDraft)
      //   formDataToSubmit.append('feedbackList', feedbackList);
    
      // console.log("FormData to submit:");
      // for (let [key, value] of formDataToSubmit.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      const actionResult = await dispatch(activityReport(formDataToSubmit));
      const response = actionResult.payload;

    //   console.log("response: ", response)
  
      if (response?.success) {
        navigate('/member/dms-member/activities');
        if(draftData?.draftId){
            handleDraftDelete(draftData.draftId)
        }
        toast.success("The form has been successfully submitted");
      } else {
        toast.error(response?.message || "Submission failed!");
      }
    } catch (error) {
      toast.error("An error occurred during submission.");
    } finally {
        setLoading(false);
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

  
  const handleAimChange = (value) => {
    setActivityAim(value);
  };
  
  const handleGroundworkChange = (value) => {
    setActivityGroundwork(value);
  };

//   console.log("draft data: ", draftData)

  const formatDateForInput = (dateString) => {
      const date = new Date(dateString);
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return localDate.toISOString().slice(0, 16); // This will return "yyyy-MM-ddTHH:mm"
  };

  useEffect(() => {
    // Assuming draftData is the fetched draft object
    if (draftData) {
        setFormData({
            activityName: draftData.activityName,
            facultyName: draftData.facultyName,
            venue: draftData.venue,
            activityMode: draftData.activityMode || 'select', // Default to 'select' if not provided
            startDate: formatDateForInput(draftData.startDate), // Format for input
            endDate: formatDateForInput(draftData.endDate),
            isJointActivity: draftData.isJointActivity,
            jointActivityPartner: draftData.jointActivityPartner,
            expense: draftData.expense || 0,
            chairPersons: draftData.chairPersons || [],
            coverImageUrl: draftData.coverImageUrl || '',
            attendanceImageUrl: draftData.attendanceImageUrl || '',
            supportDocumentUrl: draftData.supportDocumentUrl || '',
        });
        setActivityAim(draftData.activityAim);
        setActivityGroundwork(draftData.activityGroundwork);
        setFeedbackList(draftData.feedbackList || []);
    }
  }, [draftData]);

  return (
    <form className="p-8 m-8 bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden" onSubmit={handleSubmit}>

        <p className='font-bold mb-4 text-xl'>New Activity Report</p>
        
        {/* Faculty, Venue, activity mode,  Name */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {['Activity Name', 'Faculty Name', 'Venue'].map((placeholder, index) => {
                const name = ['activityName', 'facultyName', 'venue']
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
            <label className="block">Activity Mode<span className="text-red-500">*</span></label>
            <select name={'activityMode'} required defaultValue="select" onChange={handleChange} className='w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors'>
                <option value="select" disabled>Activity Mode</option>
                <option value="online">ONLINE</option>
                <option value="on-ground">ON-GROUND</option>
                <option value="both">BOTH</option>
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
            {['Is it a Joint Activity?'].map((label, index) => {
                const name= ['isJointActivity']
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
        {formData.isJointActivity && (
            <div className="mt-4">
                <label>Activity Partner:<span className="text-red-500">*</span></label>
                <input 
                    type="text" 
                    name="jointActivityPartner" 
                    value={formData.jointActivityPartner || ''} 
                    onChange={(e) => 
                        setFormData((prev) => ({
                            ...prev,
                            jointActivityPartner: e.target.value,
                        }))
                    } 
                    className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                />
            </div>
        )}
      
        {/** Activity Aim */}
        <div className="quill-container space-y-4 mb-6 mt-8">
            <p className="text-2xl font-semibold">Activity Aim<span className="text-red-500">*</span></p>
            {/* <RichTextEditor name={'meetingSummary'} content={content} setContent={setContent} /> */}
            {/* <Editor
            editorState={content}
            onEditorStateChange={setContent}
            /> */}
            <ReactQuill 
            value={activityAim} 
            onChange={handleAimChange} 
            modules={modules}
            required
            className="custom-quill border rounded-lg shadow-md"
            />
            <p className='text-gray-400 text-sm right-0 text-end'>{`${activityAim.trim().split(/\s+/).filter(word => word.length > 0).length}/500 words`}</p>
        </div>

        {/** Activity Groundwork */}
        <div className="quill-container space-y-4 mb-6 mt-8">
            <p className="text-2xl font-semibold">Activity Groundwork<span className="text-red-500">*</span></p>
            {/* <RichTextEditor name={'meetingSummary'} content={content} setContent={setContent} /> */}
            {/* <Editor
            editorState={content}
            onEditorStateChange={setContent}
            /> */}
            <ReactQuill 
            value={activityGroundwork} 
            onChange={handleGroundworkChange} 
            modules={modules}
            required
            className="custom-quill border rounded-lg shadow-md"
            />
            <p className='text-gray-400 text-sm right-0 text-end'>{`${activityAim.trim().split(/\s+/).filter(word => word.length > 0).length}/500 words`}</p>
        </div>

        {/** Activity Feedback */}
        <div className="space-y-4 mb-6">
            <p className="font-semibold text-2xl">Activity Feedback</p>
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

        {/* Activity Finance */}
        <div className="space-y-4 mb-6">
            <p className="font-semibold text-2xl">Activity Finance</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {['expense'].map((label, index) => {
                    const name = ['expense']
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
        </div>

        {/** Activity Chair Person(s) */}      
        <div className="grid grid-cols-1 mb-6">
            <p className="font-semibold text-2xl mb-6">Activity Chair Person(s)</p>
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


        {/* Support Documents */}
        <div className="w-full flex">
            <div className="space-y-4 mb-6 w-[50%]">
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
                        className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
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
                        className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
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
                        className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-green-500 transition-colors"
                    />          
                </div>
            </div>
            <div className="w-[50%] flex justify-center items-center">
            {formData.coverImageUrl && (
                <img
                    src={formData.coverImageUrl}
                    alt="Cover Image"
                    className="max-w-full max-h-80 object-cover rounded-lg"
                />
            )}
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
            <Link to='/member/dms-member/activities'>
                <button
                type="button"
                className="px-4 py-2 bg-white text-gray-500 border-2 border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white"
                >
                    Cancel
                </button>
            </Link>
            <button
            type="submit"
            disabled={loading}
            className={`bg-green-500 text-white py-2 px-4 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            >
            {loading ? (
                <div className="flex items-center justify-center">
                    <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        ></circle>
                        <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C6.48 0 2 4.48 2 10s4.48 10 10 10v-4a8 8 0 01-8-8z"
                        ></path>
                    </svg>
                    Loading...
                    </div>
                ) : (
                    "Submit"
                )}
            </button>
        </div>
    </form>
  );
};

export default DmsActivityForm;
