import React, { useState } from 'react';

interface AddReminderProps {
    onAddReminder: (title:string) => void;
}

function AddReminder({onAddReminder}:AddReminderProps) {

    const [title,setTitle] = useState('');

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if(!title) return;
        onAddReminder(title);
        setTitle('');
    }
    return (
        <form onSubmit={submitForm}>
            <label htmlFor="title"></label>
            <input value={title} onChange={e => setTitle(e.target.value)} id="title" type="text" className="form-control" placeholder='Enter Your Reminder Here'/>
            <button className="btn btn-outline-primary mt-3 mb-3">
            Add Reminder
            </button>
        </form>
    );
}

export default AddReminder;