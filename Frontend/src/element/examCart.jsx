import React, { useState } from 'react';
import './TaskCard.css';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';


import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";



// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };







export default function TaskCard({
  tasksList,
  id,
  TaskContent,
  setTasksList,
  Category,
  Prio,
  time,
  date,
  state,
  isDeleteBtnVisible,
  isEditeBtnVisible,
  DoneSvg,
  UndoneSvg,
  isCanceled,
 

}) {

  // const[id2, setId2]= useState();



  // Icons
  const FailedSvg=(
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#f9bc00" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20.777a9 9 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a9 9 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A9 9 0 0 1 10 3.223M12 8v4m0 4v.01"/></svg>
  );
  const paperSvg = (
    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.6" d="M15.5814 7.20264C15.1299 7.20264 14.5318 7.19264 13.7872 7.19264C11.9713 7.19264 10.4781 5.68964 10.4781 3.85664V0.64064C10.4781 0.387641 10.2761 0.181641 10.0256 0.181641H4.73621C2.26775 0.181641 0.272583 2.20764 0.272583 4.69064V15.4656C0.272583 18.0706 2.3628 20.1816 4.94216 20.1816H12.8189C15.2784 20.1816 17.2726 18.1686 17.2726 15.6836V7.65264C17.2726 7.39864 17.0716 7.19364 16.8201 7.19464C16.3973 7.19764 15.8903 7.20264 15.5814 7.20264Z" fill="white" />
      <path opacity="0.4" d="M13.0841 0.56737C12.7851 0.25637 12.2631 0.47037 12.2631 0.90137V3.53837C12.2631 4.64437 13.1741 5.55437 14.2801 5.55437C14.9771 5.56237 15.9451 5.56437 16.7671 5.56237C17.1881 5.56137 17.4021 5.05837 17.1101 4.75437C16.0551 3.65737 14.1661 1.69137 13.0841 0.56737Z" fill="white" />
      <path d="M11.4181 12.8926C11.8291 12.8926 12.1631 13.2266 12.1631 13.6376C12.1631 14.0486 11.8291 14.3816 11.4181 14.3816H5.97408C5.56308 14.3816 5.23008 14.0486 5.23008 13.6376C5.23008 13.2266 5.56308 12.8926 5.97408 12.8926H11.4181ZM9.35898 7.89844C9.76998 7.89844 10.104 8.23244 10.104 8.64344C10.104 9.05444 9.76998 9.38744 9.35898 9.38744H5.97398C5.56298 9.38744 5.22998 9.05444 5.22998 8.64344C5.22998 8.23244 5.56298 7.89844 5.97398 7.89844H9.35898Z" fill="white" />
    </svg>
  );

  const DeletTinyBtn = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#FFDFE0" />
      <path d="M13.9999 13L19.9999 19M19.9999 13L13.9999 19M11.9999 9C11.503 9.00003 11.0239 9.18504 10.6559 9.519L4.32794 15.259C4.22466 15.3527 4.14213 15.467 4.08565 15.5946C4.02918 15.7221 4 15.86 4 15.9995C4 16.139 4.02918 16.2769 4.08565 16.4044C4.14213 16.532 4.22466 16.6463 4.32794 16.74L10.6559 22.481C11.0239 22.815 11.503 23 11.9999 23H21.9999C22.5304 23 23.0391 22.7893 23.4142 22.4142C23.7892 22.0391 23.9999 21.5304 23.9999 21V11C23.9999 10.4696 23.7892 9.96086 23.4142 9.58579C23.0391 9.21071 22.5304 9 21.9999 9H11.9999Z" stroke="#B90800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

 

  const EditTInyBtn = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#DBE6F7" />
      <rect x="6" y="6" width="20" height="20" fill="#DBE6F7" />
      <path fillRule="evenodd" clipRule="evenodd" d="M22.6666 22.6667H9.33325Z" fill="#DBE6F7" />
      <path d="M22.6666 22.6667H9.33325" stroke="#115ACA" strokeWidth="1.5" strokeLinecap="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.1548 9.67859C18.8056 9.02771 19.861 9.02771 20.5118 9.67859V9.67859C21.1627 10.3295 21.1627 11.3847 20.5118 12.0356L13.6091 18.9383L11.0837 19.1067L11.2521 16.5813L18.1548 9.67859Z" fill="#DBE6F7" stroke="#115ACA" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );


const handleDelete = async (taskId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN); // Get the access token
  
  try {
    // Send a DELETE request to the backend to delete the task from the database
    const response = await fetch(`http://127.0.0.1:8000/apif/tasksList/delete/${taskId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || 'Failed to delete task from the database.');
    }

    // If the DELETE request was successful, update the local state
    setTasksList((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    // Show success message
    Swal.fire({
      icon: "success",
      title: "Your task has been deleted",
      showConfirmButton: false,
      timer: 1500,
    });

  } catch (error) {
    // console.error('Error deleting task:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message,
      confirmButtonText: 'Ok',
    });
  }
};



  const [isEditing, setIsEditing] = useState(false);
  
  

  const [newTaskContent, setNewTaskContent] = useState(''); // For storing new task content
  

  const handleEditClick = (taskId, currentContent) => {
    setIsEditing(true);
    setNewTaskContent(currentContent); // Set the current content to edit
};




const handleSave = async () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN); // Get the access token
  try {
      const updatedTask = {
          TaskContent: newTaskContent,
          // Category: Category,
          // Prio: "var(--grey)",
          // time: time,
          // date: date
          // state:state
      };
    
      // console.log(updatedTask);

      const response = await fetch(`http://127.0.0.1:8000/apif/tasklist/update/${id}/`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer  ${accessToken}`,
          },
          body: JSON.stringify(updatedTask)
      });

      // console.log(response);


      if (!response.ok) {
          throw new Error('Failed to update task');
      }

      const updatedData = await response.json();

      // console.log("updated data",updatedData);


      // Update the task in the state (frontend)
      setTasksList((prevTasks) =>
          prevTasks.map((task) =>
              task.id === id ? { ...task, TaskContent: newTaskContent } : task
          )
      );

      // Show success message
      Swal.fire({
          icon: 'success',
          title: 'Your task has been updated',
          showConfirmButton: false,
          timer: 1500
      });

      setIsEditing(false); // Exit editing mode
  } catch (error) {
      // console.error('Error updating task:', error);
      Swal.fire({
          icon: 'error',
          title: 'Failed to update task',
          text: error.message,
      });
  }
};



  // handle task statu

  // const [progress, setProgress] = useState(false);


  console.log("state",state);

  const handleToggleProgress = async () => {




    const accessToken = localStorage.getItem(ACCESS_TOKEN); // Get the access token

    try {

      
        // newState    const newState = state === "done" ? "undone" : "done";
        const updatedState = {
            state:"done"
        };
      
        console.log("updated state",updatedState);

        const response = await fetch(`http://127.0.0.1:8000/apif/task/done/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${accessToken}`,
            },
            body: JSON.stringify(updatedState)
        });

        console.log("state res",response);


        if (!response.ok) {
            throw new Error('Failed to update State');
        }

        const updatedData = await response.json();

        console.log("updated data for state",updatedData);


        // Update the task in the state (frontend)
        setTasksList((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, state: "done" } : task
            )
        );




        // Show success message
        Swal.fire({
            icon: 'success',
            title: 'Your State has been updated to Done',
            showConfirmButton: false,
            timer: 1500
        });

        setIsEditing(false); // Exit editing mode
    } catch (error) {
        console.error('Error updating State:', error);
        Swal.fire({
            icon: 'error',
            title: 'Failed to update State',
            text: error.message,
        });
    }

  };


  const handleCancelProgress = async () => {




    const accessToken = localStorage.getItem(ACCESS_TOKEN); // Get the access token

    try {

      
        // newState    const newState = state === "done" ? "undone" : "done";
        const updatedState = {
            state:"failed"
        };
      
        console.log("updated state",updatedState);

        const response = await fetch(`http://127.0.0.1:8000/apif/task/${id}/failled/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${accessToken}`,
            },
            body: JSON.stringify(updatedState)
        });

        console.log("state res",response);


        if (!response.ok) {
            throw new Error('Failed to Cancel Task');
        }

        const updatedData = await response.json();

        console.log("updated data for state",updatedData);


        // Update the task in the state (frontend)
        setTasksList((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, state: "failed" } : task
            )
        );




        // Show success message
        Swal.fire({
            icon: 'success',
            title: 'Your State has been canceled',
            showConfirmButton: false,
            timer: 1500
        });

        setIsEditing(false); // Exit editing mode
    } catch (error) {
        console.error('Error with Failed task:', error);
        Swal.fire({
            icon: 'error',
            title: 'Failed to cancel the task',
            text: error.message,
        });
    }

  };

  

  return (

    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, x: 100 }} // Slide out animation on delete
        transition={{ duration: 0.2 }}
        className="TheTaskCrad"
        // style={{ background: Prio || 'blue' }}
        style={{ background: Prio || 'blue' }} 
        
      >
        <div className="TopCard">
          <h5 className="Category"
            style={ state=="done"||state=="failed" ? { textDecoration: 'line-through', opacity: 0.5 ,whiteSpace: 'nowrap'} : {whiteSpace: 'nowrap'}}
          
          >{Category}</h5>

          <div className="TasksChangesBtn">
            {isDeleteBtnVisible && (
              <motion.button
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                className="BtnDAnimation"
                onClick={() => handleDelete(id)}
              >
                {DeletTinyBtn}
              </motion.button>
            )}

            {isEditeBtnVisible && ( state=="undone") && (
              <motion.button
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                className="BtnEAnimation"
                // onClick={handleEditClick}
                onClick={() => handleEditClick(id, TaskContent)}
              >
                {EditTInyBtn}
              </motion.button>
            )}

         
            
          
            {!isCanceled && state=="undone" && (
              <motion.button
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                className="ProgressBtn"
                onClick={() => handleToggleProgress()}
                id='undoneTask'
              >
               {UndoneSvg}
              </motion.button>
            )}

             {state=="done" && (
              <motion.button
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                className="ProgressBtn"
                // onClick={() => handleToggleProgress()}
                id='doneTask'
                style= {{opacity: 0.7 }}
              >
               {DoneSvg}
               
              </motion.button>
            )}


{/* neeeeeeeeeeeeeeeeeeeeeeeeeewwwwwww---------------------------- */}
            {isCanceled && ( state=="undone" ) && (
              <motion.button
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                className="ProgressBtn"
                id='CancelTask'
                // onClick={handleEditClick}
                onClick={() => handleCancelProgress()}
              >
                {FailedSvg}
              </motion.button>
            )}
            


          </div>
        </div>

        <div className="TheTask">
          <div className="paperDiv" 
            style={state=="done" ? { textDecoration: 'line-through', opacity: 0.5 } : {}}
          
          >{paperSvg}</div>
          {isEditing ? (
            <textarea
              type="text"
              maxlength="57"
              value={newTaskContent}
              onChange={(e) => setNewTaskContent(e.target.value)}
            />
          ) : (
            <p
            style={state=="done"||state=="failed" ? { textDecoration: 'line-through', opacity: 0.5 } : {}}


            
            >{TaskContent}</p>
          )}
        </div>

        <div className="BotCard">
          <div className="TimeDiv">
            <div className="Date"
            style={state=="done"||state=="failed" ? { textDecoration: 'line-through', opacity: 0.5 } : {}}
            
            >{date}</div> 

{isEditing && (
    <div className="saveCancel">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
)}


            
            <div className="Time"
            style={state=="done"||state=="failed" ? { textDecoration: 'line-through', opacity: 0.5 } : {}}
            
            >{time}</div>
          </div>
        </div>

       
        {state=="failed"&& (
              <div className="Choche">
                
              </div>
            )}
      </motion.div>
    </AnimatePresence>
  );
}