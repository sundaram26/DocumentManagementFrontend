import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AuthLayout from './pages/Auth/Layout'
import AuthRegister from './components/Auth/Register'
import AuthLogin from './components/Auth/Login'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminDmsLayout from './pages/Admin/AdminDmsLayout'
import AdminRotaractLayout from './pages/Admin/AdminRotaractLayout'
import CheckAuth from './components/common/CheckAuth'
import VerifyEmail from './components/Auth/VerifyEmail'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/authSlice'
import DmsMemberLayout from './pages/dms-member/DmsMemberLayout'
import RotaractMemberLayout from './pages/rotaract-member/RotaractMemberLayout'
import DmsActivity from './pages/dms-member/DmsActivity'
import RotaractProjects from './pages/rotaract-member/RotaractProjects'
import RotaractDashboard from './pages/rotaract-member/RotaractDashboard'
import DmsDashboard from './pages/dms-member/DmsDashboard'
import AdminDashboard from './pages/Admin/AdminDashboard'
import Request from './pages/Admin/Request'
import DmsMeetings from './pages/dms-member/DmsMeetings'
import DmsMeetingForm from './pages/dms-member/DmsMeetingForm'
import RotaractMeetingForm from './pages/rotaract-member/RotaractMeetingForm'
import RotaractProjectForm from './pages/rotaract-member/RotaractProjectForm'
import RotaractMeetings from './pages/rotaract-member/RotaractMeetings'
import DmsActivityForm from './pages/dms-member/DmsActivityForm'
import ProjectDrafts from './pages/rotaract-member/ProjectDrafts'
import RotaractMeetingDraft from './pages/rotaract-member/RotaractMeetingDraft'
import ActivityDrafts from './pages/dms-member/ActivityDrafts'
import DmsMeetingDraft from './pages/dms-member/DmsMeetingDraft'
import RotaractMeetingsReports from './pages/Admin/RotaractMeetingsReports'
import DmsMeetingsReports from './pages/Admin/DmsMeetingReports'
import AdminRotaractProjects from './pages/Admin/AdminRotaractProjects'
import AdminDmsActivities from './pages/Admin/AdminDmsActivities'
import ResetPassword from './components/Auth/ResetPassword'
import RotaractMouForm from './pages/rotaract-member/RotaractMouForm'
import RotaractMou from './pages/rotaract-member/RotaractMou'
import AdminRotaractMou from './pages/Admin/AdminRotaractMou'


const App = () => {

  const { isAuthenticated, isRegistered, isVerified, isApproved, user } = useSelector((state) => state.auth)
  // console.log("is Registered: ",isRegistered)
  // console.log("is Verified: ", isVerified)
  // console.log("is Approved: ", isApproved)
  // console.log("is Authenticated: ", isAuthenticated)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticated && isRegistered && isVerified && isApproved) {
      dispatch(checkAuth());
    }
  }, [isAuthenticated, isRegistered, isVerified, isApproved, dispatch]);


  if (typeof global === 'undefined') {
    window.global = window;
  }


  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route 
          path='/auth' 
          element={
            <CheckAuth isAuthenticated={isAuthenticated} isRegistered={isRegistered} isVerified={isVerified} isApproved={isApproved} user={user}> 
              <AuthLayout /> 
            </CheckAuth>
          }
        >
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
          <Route path='verify-email' element={<VerifyEmail />} />
          <Route path='reset-password/:token' element={<ResetPassword />} />
        </Route>

        <Route 
          path='/admin' 
          element={
            <CheckAuth isAuthenticated={isAuthenticated} isRegistered={isRegistered} isVerified={isVerified} isApproved={isApproved} user={user}> 
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path='' element={<AdminDashboard />} />
          <Route path='requests' element={<Request />}>
            <Route path=':userId' element={<Request />} />
          </Route>
          <Route path='admin-dms' element={<AdminDmsLayout />} />
          <Route path='admin-dms/:userId/meetings' element={<DmsMeetingsReports />} />
          <Route path='admin-dms/:userId/activities' element={<AdminDmsActivities />} />
          <Route path='admin-rotaract' element={<AdminRotaractLayout />} />
          <Route path='admin-rotaract/:userId/meetings' element={<RotaractMeetingsReports />} />
          <Route path='admin-rotaract/:userId/projects' element={<AdminRotaractProjects />} />
          <Route path='admin-rotaract/:userId/mou' element={<AdminRotaractMou />} />
        </Route>
        
        <Route 
          path='/member/dms-member' 
          element={
            <CheckAuth isAuthenticated={isAuthenticated} isRegistered={isRegistered} isVerified={isVerified} isApproved={isApproved} user={user}> 
              <DmsMemberLayout />
            </CheckAuth>
          }
        >
          <Route path='' element={<DmsDashboard />} />
          <Route path='activities' element={<DmsActivity />} />
          <Route path='activities/drafts' element={<ActivityDrafts />} />
          <Route path='activities/activity-report' element={<DmsActivityForm />} />
          <Route path='meetings' element={<DmsMeetings />} />
          <Route path='meetings/drafts' element={<DmsMeetingDraft />} />
          <Route path='meetings/meeting-report' element={<DmsMeetingForm />} />
        </Route>
        <Route 
          path='/member/rotaract-member' 
          element={
            <CheckAuth isAuthenticated={isAuthenticated} isRegistered={isRegistered} isVerified={isVerified} isApproved={isApproved} user={user}> 
              <RotaractMemberLayout />
            </CheckAuth>
          }
        >
          <Route path='' element={<RotaractDashboard />} />
          <Route path='projects' element={<RotaractProjects />} />
          <Route path='projects/drafts' element={<ProjectDrafts />} />
          <Route path='projects/project-report' element={<RotaractProjectForm />} />
          
          <Route path='meetings' element={<RotaractMeetings />} />
          <Route path='meetings/drafts' element={<RotaractMeetingDraft />} />
          <Route path='meetings/meeting-report' element={<RotaractMeetingForm />} />
          
          <Route path='mou' element={<RotaractMou />} />
          <Route path='mou/mou-report' element={<RotaractMouForm />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App