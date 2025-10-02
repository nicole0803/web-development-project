import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {
    const {id} = useParams();   // the value defined inside {} must match the value define in the route
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // prevent using browser submission which causes the page to reload and lose data

        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {}

        formData.forEach((value, key) => {
            data[key] = value;
        })

        if (activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity); // convert to unknown first before Activity
            navigate(`/activities/${activity.id}`);

        } else {
            createActivity.mutate(data as unknown as Activity, {
                onSuccess: (id) => {    // the id here is the id we get back from our API (response.data) when we create an activity
                    navigate(`/activities/${id}`)   
                }
            });

        }      
    }

    if (isLoadingActivity) {
        return (
            <Typography>Loading activity...</Typography>
        )
    }

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity? 'Edit Activity': 'Create Activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                <TextField label='Title' name="title" defaultValue={activity?.title} />
                <TextField label='Description' name="description" defaultValue={activity?.description} multiline rows={3} />
                <TextField label='Category' name="category" defaultValue={activity?.category} />
                <TextField label='Date' name="date" type="date"  
                    defaultValue={activity?.date 
                        ? new Date(activity.date).toISOString().split('T')[0] 
                        : new Date().toISOString().split('T')[0]
                    } 
                />
                <TextField label='City' name="city" defaultValue={activity?.city} />
                <TextField label='Venue' name="venue" defaultValue={activity?.venue} />
                <Box display={'flex'} justifyContent={'end'} gap={3}>
                    <Button color="inherit">Cancel</Button>
                    <Button 
                        type="submit" 
                        color="success" 
                        variant="contained"
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}