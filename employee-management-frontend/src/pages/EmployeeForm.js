import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
function EmployeeForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [department, setDepartment] = useState('');
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/employees/${id}`)
                .then(response => {
                    setName(response.data.name);
                    setAge(response.data.age);
                    setDepartment(response.data.department);
                })
                .catch(error => console.error('Lỗi khi tải thông tin nhân viên:', error));
        }
    }, [id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const employee = { name, age, department };
        if (id) {
            axios.put(`http://localhost:5000/employees/${id}`, employee)
                .then(() => navigate('/'))
                .catch(error => console.error('Lỗi khi cập nhật nhân viên:', error));
        } else {
            axios.post('http://localhost:5000/employees', employee)
                .then(() => navigate('/'))
                .catch(error => console.error('Lỗi khi thêm nhân viên:', error));
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Tên nhân viên" required />
            <input type="number" value={age} onChange={e => setAge(e.target.value)}
                placeholder="Tuổi" required />
            <input type="text" value={department} onChange={e =>
                setDepartment(e.target.value)} placeholder="Phòng ban" required />
            <button type="submit">{id ? 'Cập Nhật' : 'Thêm'}</button>
        </form>
    );
}
export default EmployeeForm;