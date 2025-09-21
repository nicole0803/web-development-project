import { Box, Container, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';//defly
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);  // initial value undefined
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(""); //defly


  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
      .then((response => setActivities(response.data)));

  }, []);

  const handleSelectedActivity = (id: string) => {
    // (x => x.id === id): equivalent to, for each (x in activities), if (x.id == id), return x;
    setSelectedActivity( activities.find(x => x.id === id) );

  }

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if(id) handleSelectedActivity(id);
    else handleCancelSelectedActivity();
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    // edit activity
    if(activity.id) {
      // find from activities the activity(x) that matches the id of activity(activity) passed in, 
      // if match, set the activity(activity), else return the original activity (x)
      setActivities(activities.map(x => x.id === activity.id? activity : x)) 


    } else {  // create activity
      // {...activity, id:xxxx}: the new activity added with unique id
      const newActivity = {...activity, id: activities.length.toString()};
      setSelectedActivity(newActivity);
      // ...activities: current activities contained inside the state: activity 1, activity 2, activity 3...
      setActivities([...activities, newActivity])
    }
    setEditMode(false); // after done create/edit activity, close the form

  }

  const handleDelete = (id: string) => {
    setActivities(activities.filter(x => x.id != id))
  }

  //defly
  const handleClick = async () => {
    setMessage("Waiting for 100s...");
    await axios.get("https://localhost:5001/api/buttondemo")
      .then((response => setMessage(response.data)));

  }
  //defly

  return (
    <Box sx={{ bgcolor: '#eeeeee' }}>
      <CssBaseline />
      <NavBar 
        openForm={handleOpenForm}
      />
      {message ?
        (<Typography>{message}</Typography>) :
        (<Button variant="contained" onClick={handleClick}>Demo</Button>)
      }

      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectedActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          submitForm={handleSubmitForm}
          deleteActivity={handleDelete}
        />
      </Container>

    </Box>
  );
}

export default App;
