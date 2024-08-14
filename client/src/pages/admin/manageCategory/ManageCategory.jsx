import 'bootstrap/dist/css/bootstrap.css';
import './ManageCategory.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageCategory = () => {
    const [categorys, setCategorys] = useState([]);
    const [editCategoryId, setEditCategoryId] = useState(null)
    const navitage = useNavigate();
    const [addCategory, setAddCategory] = useState({
        name: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setAddCategory({ ...addCategory, [name]: value });
    };

    const handleNewCategory = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/admin/category/add", addCategory, {
                headers: { "Content-Type": "application/json" },
            });
            setCategorys([...categorys, response.data]);
            setAddCategory({ name: "" });
            console.log("Thêm mới category thành công:", response.data);
        } catch (error) {
            console.log("Error category:", error);
        }
    };

    useEffect(() => {
        const showCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/categorys");
                
                setCategorys(response.data);
            } catch (error) {
                console.log("Lỗi show category:", error);
                if (error.response && error.response.status === 401) {
                    navitage("/")
                } else {
                    console.log("Lỗi show category:", error);
                }
            }
        };
        showCategories();
    }, []);

    const handleDelete = async (categoryId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/admin/category/delete/${categoryId}`);
            setCategorys(categorys.filter(category => category.categoryId !== categoryId));
        } catch (error) {
            console.log("Error deleting category:", error);
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/admin/category/update/${editCategoryId}`, addCategory, {
                headers: { "Content-Type": "application/json" }
            });
            const updateCategory = categorys.map(category => category.categoryId == editCategoryId ? { ...category, ...addCategory } : category)
            setCategorys(updateCategory);


        } catch (error) {   
            console.log("lỗi update category: "+ error);

        }

    }
    const handleEdit = (category) => {
        setAddCategory({ name: category.name });
        setEditCategoryId(category.categoryId);
        console.log(category);
    }
    const handleReset = () =>{
        setAddCategory({
            categoryId: "",
            name: ""
        })

        setEditCategoryId(null)
    }

    return (
        <div className='container'>
            <div className='col-md-5'>
                <div className='form-group'>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className='form-control'
                        name='name'
                        value={addCategory.name}
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <button className='btn btn-primary mt-3' onClick={handleNewCategory}>Add new</button>
                    <button className='btn btn-primary mt-3 ms-3' onClick={handleUpdate} >Update</button>
                    <button className='btn btn-primary mt-3 ms-3' onClick={handleReset} >Reset</button>
                </div>
            </div>
            <table className="table table-hover mt-5">
                <thead>
                    <tr>
                        <th>CategoryId</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categorys.map((category, index) => (
                        <tr key={index}>
                            <td>{category.categoryId}</td>
                            <td>{category.name}</td>
                            <td>
                                <button className='btn btn-danger' onClick={() => handleDelete(category.categoryId)}>Delete</button>
                                <button className='btn btn-primary ms-2' onClick={() => handleEdit(category)} >Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
        
    );
};

export default ManageCategory;
