import { Box, Container, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Button from '@mui/material/Button';//defly
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);  // initial value undefined
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(""); //defly

  const {activities, isPending} = useActivities();

  const handleSelectedActivity = (id: string) => {
    // (x => x.id === id): equivalent to, for each (x in activities), if (x.id == id), return x;
    setSelectedActivity(activities!.find(x => x.id === id));

  }

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectedActivity(id);
    else handleCancelSelectedActivity();
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  // const handleSubmitForm = (activity: Activity) => {
  //   // edit activity
  //   if(activity.id) {
  //     // find from activities the activity(x) that matches the id of activity(activity) passed in, 
  //     // if match, set the activity(activity), else return the original activity (x)
  //     setActivities(activities.map(x => x.id === activity.id? activity : x)) 


  //   } else {  // create activity
  //     // {...activity, id:xxxx}: the new activity added with unique id
  //     const newActivity = {...activity, id: activities!.length.toString()};
  //     setSelectedActivity(newActivity);
  //     // ...activities: current activities contained inside the state: activity 1, activity 2, activity 3...
  //     setActivities([...activities!, newActivity])
  //   }
  //   setEditMode(false); // after done create/edit activity, close the form
  //   console.log(activity);

  // }

  // const handleDelete = (id: string) => {
  //   // setActivities(activities.filter(x => x.id != id))
  //   console.log(id);
  // }

  //defly
  const handleClick = async () => {
    setMessage("Waiting for 100s...");
    await axios.get("https://localhost:5001/api/buttondemo")
      .then((response => setMessage(response.data)));

  }
  //defly

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar
        openForm={handleOpenForm}
      />
      {message ?
        (<Typography>{message}</Typography>) :
        (<Button variant="contained" onClick={handleClick}>Demo</Button>)
      }

      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectedActivity}
            cancelSelectActivity={handleCancelSelectedActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleCloseForm}
          />
        )}

      </Container>

    </Box>
  );
}

export default App;
