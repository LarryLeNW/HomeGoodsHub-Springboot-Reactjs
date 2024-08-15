import { ROLE } from "constant/roleUser";
import { Navigate, Outlet } from "react-router-dom";
import AdminSideBar from "./Sidebar";
import withBaseComponent from "hocs";
import { useAuthStore } from "store/auth.store";
import paths from "constant/path";

function AdminLayout() {
    const { userInfo } = useAuthStore();

    if (userInfo.isLoading) {
        return;
    } else if (userInfo.data?.role.name != ROLE.ADMIN) {
        return <Navigate to={paths.HOME} replace={true} />;
    }

    return (
        <div className="w-full flex bg-zinc-900 min-h-screen relative text-white overflow-auto">
            <div className="w-[20%] flex-none fixed top-0 bottom-0 ">
                <AdminSideBar />
            </div>
            <div className="w-[20%] bg-red-600"></div>
            <div className="w-[80%] ">
                <Outlet />
            </div>
        </div>
    );
}

export default withBaseComponent(AdminLayout);
