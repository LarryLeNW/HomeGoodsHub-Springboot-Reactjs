import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div>
            <header>Header admin</header>
            <Outlet></Outlet>
        </div>
    );
}

export default AdminLayout;
