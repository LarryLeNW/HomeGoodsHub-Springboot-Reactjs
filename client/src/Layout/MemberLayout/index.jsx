import { Navigate, Outlet } from "react-router-dom";
import MemberSideBar from "./Sidebar";
import withBaseComponent from "hocs";
import Navigation from "layout/UserLayout/Navigation";
import { useAuthStore } from "store/auth.store";
import paths from "constant/path";
import Header from "layout/UserLayout/Header";
function MemberLayout() {
    const { userInfo } = useAuthStore();

    if (userInfo.isLoading) {
        return;
    } else if (!userInfo?.data?.userId) {
        <Navigate to={paths.HOME} replace={true} />;
    }

    return (
        <div className="w-full flex flex-col items-center  ">
            <Header />
            <Navigation />
            <div className="w-full flex flex-col min-h-[80vh]  p-4">
                <div className="w-main flex h-full mx-auto border ">
                    <div className="w-[25%]  ">
                        <MemberSideBar />
                    </div>
                    <div className="w-[75%]  bg-gray-200 border min-h-screen">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withBaseComponent(MemberLayout);
