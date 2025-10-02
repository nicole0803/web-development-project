import { Box, Container, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Button from '@mui/material/Button';//defly
import NavBar from "./NavBar";
import { Outlet } from "react-router";

function App() {
  const [message, setMessage] = useState(""); //defly

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
      <NavBar />
      {message ?
        (<Typography>{message}</Typography>) :
        (<Button variant="contained" onClick={handleClick}>Demo</Button>)
      }

      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <Outlet />  {/*Component that we route to will be replaced the outlet*/}
      </Container>
    </Box>
  );
}

export default App;
