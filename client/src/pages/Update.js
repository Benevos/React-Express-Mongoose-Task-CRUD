import React, { useEffect, useRef, useState } from 'react'
import NavbarLayout from '../Layout/NavbarLayout'
import { useSearchParams } from 'react-router-dom'
import fetchDataAsJSON from '../scripts/fetch_data';

function Update() 
{
    const [taskData, setTaskData] = useState({title: "", description: ""});

    const [searchParams, setSearchParams] = useSearchParams();

    const buttonRef = useRef(null);

    const id = searchParams.get("id");

    const handleChange = ( { target: { value, name } } ) =>
    {
        const newTask = { ...taskData, [name]: value }
        setTaskData(newTask)
    }

    const handleSumbit = async (e) =>
    {
        e.preventDefault();

        try
        {   
            const data = await fetchDataAsJSON("/tasks/edit", "POST", { id: taskData._id, title: taskData.title, description: taskData.description });

            alert(data);
        }
        catch(err)
        {
            console.error(err)
        }
    }

    const getInitalTaskData = async () =>
    {
        try
        {
            const data = await fetchDataAsJSON("/tasks/edit?id="+id, "GET");
            
            setTaskData(data);
        }
        catch({ message })
        {
            const button = buttonRef.current;

            console.error(message);
            alert(message);

            button.disabled = true;
        }
    }

    useEffect(() =>
    {
        getInitalTaskData();
    }, [])

    return (
        <NavbarLayout>

            <form onSubmit={handleSumbit}>
                <input 
                    value={taskData.title} 
                    type='text' 
                    name='title' 
                    placeholder='title'
                    onChange={handleChange}/>

                <textarea 
                    value={taskData.description} 
                    name='description' 
                    rows={3} 
                    placeholder='description'
                    onChange={handleChange}/>

                <button ref={buttonRef}>Update</button>
            </form>

        </NavbarLayout>
    )
}

export default Update