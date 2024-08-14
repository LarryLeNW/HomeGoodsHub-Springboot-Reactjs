import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

function UserLayout() {
    return (
        <div className="w-full flex flex-col items-center">
            <Header />
            <Navigation />
            <div className="w-full flex flex-col  min-h-[80vh]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default UserLayout;
