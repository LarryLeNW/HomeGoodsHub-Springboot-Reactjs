import Footer from "Layout/Common/Footer";
import Navigation from "Layout/Common/Navigation";
import UserHeader from "Layout/Common/UserHeader";
import { Outlet } from "react-router-dom";

function UserLayout() {
    return (
        <div>
            <Navigation />
            <UserHeader />
            <Outlet />
            <Footer />
        </div>
    );
}

export default UserLayout;
