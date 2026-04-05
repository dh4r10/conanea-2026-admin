import { Route, Routes } from 'react-router-dom';

import PrivateRoutes from './utils/PrivateRoutes';

import { useAuthInit } from '@/hooks/useAuthInit';

import Login from './pages/security/Login';
import ChangePassword from './pages/security/ChangePassword';
import AdminHome from './pages/panel/AdminHome';

import ScheduleControl from './pages/panel/Days';
import useScrollToTop from './hooks/useScrollToTop';
import ActivityType from './pages/panel/ActivityType';
import Speaker from './pages/panel/Speaker';
import Activity from './pages/panel/Activity';
import PreSale from './pages/panel/PreSale';

import QuotaType from './pages/panel/QuotaType';

import './App.css';

function App() {
  useScrollToTop();
  useAuthInit();

  return (
    <div className='min-h-screen m-0 p-0'>
      <Routes>
        <Route path={'/login'} element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<AdminHome />} />
          <Route path='/activity' element={<Activity />} />
          <Route path='/activity-type' element={<ActivityType />} />
          <Route path='/day' element={<ScheduleControl />} />
          <Route path='/speaker' element={<Speaker />} />
          <Route path='/quota-type' element={<QuotaType />} />
          <Route path='/pre-sale' element={<PreSale />} />

          <Route path='/change-password' element={<ChangePassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
