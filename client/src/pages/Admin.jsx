import Sidebar from '../components/admin/sidebar';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';

const Admin = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <AdminHeader />
        <div className="ml-[300px] px-[10px] mt-[50px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
