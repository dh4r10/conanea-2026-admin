import { Route, Routes } from 'react-router-dom';

import PrivateRoutes from './utils/PrivateRoutes';

import { useAuthInit } from '@/hooks/useAuthInit';

import Footer from './components/Footer';
import Header from './components/Header';

import Home from './pages/congress/Home';
import Schedule from './pages/congress/Schedule';
import Registration from './pages/congress/Registration';
import Login from './pages/security/Login';
import AdminHome from './pages/panel/AdminHome';

import ScheduleControl from './pages/panel/Days';
import useScrollToTop from './hooks/useScrollToTop';
import Organizers from './pages/congress/Organizers';
import ActivityType from './pages/panel/ActivityType';
import Speaker from './pages/panel/Speaker';

import './App.css';
import Activity from './pages/panel/Activity';

function App() {
  useScrollToTop();
  useAuthInit();

  return (
    <div className='min-h-screen m-0 p-0'>
      <Routes>
        <Route
          path={'/'}
          element={<Home header={<Header />} footer={<Footer />} />}
        />
        <Route
          path={'/cronograma'}
          element={<Schedule header={<Header />} footer={<Footer />} />}
        />
        <Route
          path={'/participantes/inscripcion'}
          element={<Registration header={<Header />} footer={<Footer />} />}
        />
        <Route
          path={'/organizadores'}
          element={<Organizers header={<Header />} footer={<Footer />} />}
        />

        <Route path={'/admin/login'} element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/admin' element={<AdminHome />} />
          <Route path='/admin/activity' element={<Activity />} />
          <Route path='/admin/activity-type' element={<ActivityType />} />
          <Route path='/admin/days' element={<ScheduleControl />} />
          <Route path='/admin/speaker' element={<Speaker />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
