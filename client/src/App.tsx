import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';//defly

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [message, setMessage] = useState(""); //defly


  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
      .then((response => setActivities(response.data)));

  }, []);

  const handleClick = async() => {
    setMessage("Waiting for 100s...");
    await axios.get("https://localhost:5001/api/buttondemo")//defly
      .then((response => setMessage(response.data)));//defly

  }

  return (
    <>
      <Typography variant="h3">Reactivities</Typography>
      {message ? 
      (<Typography>{message}</Typography>) : 
      (<Button variant="contained" onClick={handleClick}>Demo</Button>)
    }
       
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
