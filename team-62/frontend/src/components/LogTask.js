// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext'; // Ensure this path is correct
// import Header from './Header';

// const LogTask = ({ onTaskLogged }) => {
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [timer, setTimer] = useState(0);
//   const { fetchTasks } = useAuth(); // Destructure the fetchTasks function

//   useEffect(() => {
//     let interval = null;
//     if (selectedTask) {
//       const startTime = Date.now();
//       interval = setInterval(() => {
//         setTimer(Date.now() - startTime);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [selectedTask]);

//   useEffect(() => {
//     async function loadTasks() {
//       try {
//         const fetchedTasks = await fetchTasks();
//         setTasks(fetchedTasks);
//       } catch (error) {
//         console.error('Failed to fetch tasks:', error);
//       }
//     }

//     loadTasks();
//   }, [fetchTasks]); // Fetch tasks when the component mounts

//   const handleTaskSelect = (task) => {
//     setSelectedTask(task);
//   };

//   const handleTaskLog = () => {
//     clearInterval(timer);
//     setTimer(0);
//     if (onTaskLogged && typeof onTaskLogged === 'function') {
//       onTaskLogged(selectedTask);
//     }
//     setSelectedTask(null);
//   };

//   return (
//     <div>
//       <Header />
//       <h2>Log Task</h2>
//       {selectedTask ? (
//         <div>
//           <p>Selected Task: {selectedTask.taskname}</p>
//           <p>Timer: {Math.floor(timer / 1000)} seconds</p>
//           <button onClick={handleTaskLog}>Log Task</button>
//         </div>
//       ) : (
//         <div>
//           <p>Choose a task:</p>
//           <ul>
//             {tasks.map((task) => (
//               <li key={task._id}>
//                 <button onClick={() => handleTaskSelect(task)}>
//                   {task.taskname}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LogTask;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct
import Header from './Header';

const LogTask = ({ onTaskLogged }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [timer, setTimer] = useState(0);
  const { fetchTasks } = useAuth(); // Destructure the fetchTasks function

  useEffect(() => {
    let interval = null;
    if (selectedTask) {
      const startTime = Date.now();
      interval = setInterval(() => {
        setTimer(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [selectedTask]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    loadTasks();
  }, [fetchTasks]);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleTaskLog = () => {
    clearInterval(timer);
    setTimer(0);
    if (onTaskLogged && typeof onTaskLogged === 'function') {
      onTaskLogged(selectedTask);
    }
    setSelectedTask(null);
  };

  return (
    <div>
      <Header />
      <h2>Log Task</h2>
      {selectedTask ? (
        <div>
          <p>Selected Task: {selectedTask.taskname}</p>
          <p>Timer: {Math.floor(timer / 1000)} seconds</p>
          <button onClick={handleTaskLog}>Log Task</button>
        </div>
      ) : (
        <div>
          <p>Choose a task:</p>
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <button onClick={() => handleTaskSelect(task)}>
                  {task.taskname}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LogTask;
