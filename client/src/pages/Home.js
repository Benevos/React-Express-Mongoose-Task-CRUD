import { useEffect, useState } from "react";
import NavbarLayout from "../Layout/NavbarLayout";
import fetchDataAsJSON from "../scripts/fetch_data";
import { useNavigate } from "react-router-dom";

function Home() 
{
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({title: "", description: ""});

  const navigate = useNavigate();

  const handleChange = ( { target: { value, name } } ) =>
  {
    const newTask = { ...taskData, [name]: value }
    setTaskData(newTask)
  }

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    try
    {
      const data = await fetchDataAsJSON('/tasks/add', 'POST', taskData);

      await getTasks();
    }
    catch(err)
    {
      console.error(err);
      alert(err);
    }
  }

  const handleUpdateClick = ({ target: { dataset } }) =>
  {
    navigate("/edit?id="+dataset.id);
  }

  const handleDeleteClick = async ({ target: { dataset } }) =>
  {
    try
    {
      const data = await fetchDataAsJSON("/tasks/delete?id="+dataset.id, "GET");

      getTasks();
    }
    catch({ message })
    {
      console.error(message);
      alert(message);
    }
  }

  const handleDoneClick = async ({ target: { dataset } }) =>
  {
    try
    {
      const data = await fetchDataAsJSON("/tasks/toogle-done?id="+dataset.id, "GET");

      getTasks();
    }
    catch({ message })
    {
      console.error(message);
      alert(message);
    }
  }

  const getTasks = async () =>
  {
    try
    {
      const data = await fetchDataAsJSON('/tasks/find', 'GET');

      setTasks(data);
    }
    catch(err)
    {
      console.error(err)
    }
  }

/*   const connectWebSocket = () =>
  {
    const socket = new WebSocket('ws://localhost:5000/websocket');

    socket.onopen = (event) =>
    {
      console.log("Conexion establecida");
    }
  } */

  useEffect(() =>
  {
    getTasks();
    //connectWebSocket();
  }, [])

  return (
    <NavbarLayout>

      <form onSubmit={handleSubmit}>
        <label>Write a title</label>
        <input placeholder="title" name="title" onChange={handleChange}/>

        <label>Description</label>
        <textarea placeholder="description" name="description" onChange={handleChange}/>

        <button>Add</button>
      </form>


      <table>

        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Opreations</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task, index) =>
            <tr key={index}>
              <td>{index+1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <button data-id={task._id} onClick={handleDoneClick}>{task.done === true ? "Done" : "Undone"}</button>
                <button data-id={task._id} onClick={handleUpdateClick}>Update</button>
                <button data-id={task._id} onClick={handleDeleteClick}>Delete</button>
              </td>
            </tr>
          )}
        </tbody>

      </table>
      

    </NavbarLayout>
    

  );
}

export default Home;
