import { useState } from "react"

function CreateTasks() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { title, description, completed: false, dueDate, category : {categoryname : category} };

        const token = localStorage.getItem('jwtToken');
        fetch('http://localhost:8080/api/tasks', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(task)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Error while creating task');
            }
            return response.json();
        })
        .then(data => {
            console.log('Task created successfully:', data);
            setTitle(data.title);
            setDescription(data.description);
            setDueDate(data.dueDate);
            setCategory(data.category.categoryname);
            alert('Task created successfully');
        })
        .catch(err => {
            console.error(err.message);
            alert('Error while creating task');
        });
    }
    return (
    <div style={{ marginTop: '20px', fontStyle: 'italic' }}>
        <form id='taskForm' style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
            <input type='text' placeholder='Title' name='title' required value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type='text' placeholder='Description' name='description' required value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type='date' placeholder='Due Date' name='dueDate' required value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <input type='category' placeholder='Category' name='category' required value={category} onChange={(e) => setCategory(e.target.value)}/>
            <button type='submit'>Add Task</button>
        </form>
    </div>);
}

export default CreateTasks;