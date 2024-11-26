import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/employees')
            .then(response => setEmployees(response.data))
            .catch(error => console.error('Lỗi khi tải danh sách nhân viên:', error));
    }, []);
    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:5000/employees/${id}`)
            .then(() => setEmployees(employees.filter(emp => emp.id !== id)))
            .catch(error => console.error('Lỗi khi xóa nhân viên:', error));
    };
    return (
        <div>
            <h2>Danh Sách Nhân Viên</h2>
            <Link to="/add">Thêm Nhân Viên</Link>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.name} - {employee.age}- {employee.department}
                        <Link to={`/edit/${employee.id}`}> Sửa </Link>
                        <button onClick={() => deleteEmployee(employee.id)}> Xóa </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default EmployeeList;