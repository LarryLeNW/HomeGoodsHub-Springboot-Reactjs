import 'bootstrap/dist/css/bootstrap.css';
import './ManagerUser.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerUser = () => {
    const [Customer, setCustomer] = useState([]);
    const [editCustomer , setEditCustomer] = useState(null)
    const [newCustomer, setNewCustomer] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        registeredDate: new Date().toISOString().slice(0, 10),
        admin: ""
    });

    const resetForm = () => {
        setNewCustomer({
            username: "",
            email: "",
            password: "",
            phone: "",
            registeredDate: new Date().toISOString().slice(0, 10),
            admin: ""
        });
        setEditCustomer(null)
    };

    useEffect(() => {
        const showCustomer = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/user");
                console.log(response.data);
                setCustomer(response.data);
            } catch (error) {
                console.error("Error fetching customers: ", error);
            }
        };
        showCustomer();
    }, []);

    const handleDelete = async (customerId) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/user/delete/${customerId}`);
            setCustomer(Customer.filter(customer => customer.customerId !== customerId));
        } catch (error) {
            console.error("Error deleting customer: ", error);
        }
    };

    const handleNewCustomer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/admin/user", newCustomer);
            setCustomer([...Customer, response.data]);
            resetForm();
        } catch (error) {
            console.error("Error adding new customer: ", error);
        }
    };
    const handleUpdate = async (e) =>{
        e.preventDefault();
        
        try {
            const response = await axios.put(`http://localhost:8080/api/admin/user/update/${editCustomer}`,newCustomer)
            
            const updateCustomer = Customer.map(customer =>(
                customer.customerId === editCustomer ? {...customer ,...newCustomer} : customer
            ))

            setCustomer(updateCustomer)
            resetForm();

        } catch (error) {
            
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleEdit = (customer)=>{
        setNewCustomer({...customer})
        setEditCustomer(customer.customerId)
        console.log(editCustomer);
    }
 
    return (
        <>
            <h2 className='text-center'>Manager Customer</h2><br />
            <div className='row user'>
                <div className='col-md-5'>
                    <div className='form-group'>
                        <label>username</label>
                        <input type="text" className='form-control' name="username" value={newCustomer.username} onChange={handleChange} placeholder='Name...' />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type="text" className='form-control' name="email" value={newCustomer.email} onChange={handleChange} placeholder='Email...' />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type="text" className='form-control' name="password" value={newCustomer.password} onChange={handleChange} placeholder='Password...' />
                    </div>
                    <div className='form-group'>
                        <label>Phone</label>
                        <input type="text" className='form-control' name="phone" value={newCustomer.phone} onChange={handleChange} placeholder='Phone...' />
                    </div>
                    <div className="form-group">
                        <label>Admin</label>
                        <div>
                            <input type="radio" id="true" name="admin" value="true" checked={newCustomer.admin === "true"} onChange={handleChange} />
                            <label htmlFor="true">True</label>
                            <input type="radio" className='ms-2' id="false" name="admin" value="false" checked={newCustomer.admin === "false"} onChange={handleChange} />
                            <label htmlFor="false">False</label>
                        </div>
                        <hr />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-success' onClick={handleNewCustomer}>New Customer</button>
                        <button className='btn btn-primary ms-2' onClick={handleUpdate}>Update</button>
                        <button className='btn btn-secondary ms-2' onClick={resetForm}>Reset</button>
                    </div>
                </div>
            </div>
            <div>
                <table className="table table-hover mt-5">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Phone</th>
                            <th>Registered Date</th>
                            <th>Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Customer.map((customer,index) => (
                            <tr key={index}>
                                <td>{customer.customerId}</td>
                                <td>{customer.username}</td>
                                <td>{customer.email}</td>
                                <td>{customer.password}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.registeredDate}</td>
                                <td>{customer.admin}</td>
                                <td>
                                    <button className='btn btn-warning' onClick={()=>handleEdit(customer)} >Edit</button>
                                    <button className='btn btn-danger ms-2' onClick={() => handleDelete(customer.customerId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ManagerUser;
