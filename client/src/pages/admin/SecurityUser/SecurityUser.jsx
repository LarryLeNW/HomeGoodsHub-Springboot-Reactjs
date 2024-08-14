import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';

const SecurityUser = () => {
    const [showSecurity, setShowSecurity] = useState({ customer: [], customerrole: [], roles: [] });

    useEffect(() => {
        const showSecurityUser = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/securityUser");
                setShowSecurity(response.data);
            } catch (error) {
                console.error("Error fetching security data: ", error);
            }
        }
        showSecurityUser();
    }, []);

    const handleCheckboxChange = async (customerId, roleId, checked) => {
        try {
            if (checked) {
                await axios.post("http://localhost:8080/api/admin/securityUser", {
                    customer: {
                        customerId: customerId
                    },
                    role: {
                        id: roleId
                    }
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log(roleId,customerId);
            } else {
                await axios.delete(`http://localhost:8080/api/admin/securityUser/${customerId}/${roleId}`);
                console.log("Removed role:", roleId, "from customer:", customerId);
            }

            const response = await axios.get("http://localhost:8080/api/admin/securityUser");
            setShowSecurity(response.data);
        } catch (error) {
            console.log("Lỗi cập nhật: "+error);
        }
    }


    const isRoleAssigned = (customerId, roleId) => {
        return showSecurity.customerrole.some(cr => cr.customer?.customerId === customerId && cr.role?.id === roleId);
    }

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Username</th>
                        {showSecurity.roles.map((role) => (
                            <th key={role.id}>{role.id}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {showSecurity.customer.map((customer) => (
                        <tr key={customer.customerId}>
                            <td>{customer.username}</td>
                            {showSecurity.roles.map((role) => (
                                <td key={role.id}>
                                    <input
                                        type="checkbox"
                                        checked={isRoleAssigned(customer.customerId, role.id)}
                                        onChange={(e) => handleCheckboxChange(customer.customerId, role.id, e.target.checked)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SecurityUser;
