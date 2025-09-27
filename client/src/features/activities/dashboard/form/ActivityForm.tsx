import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../../lib/hooks/useActivities";

type Props = {
    activity?: Activity
    closeForm: () => void
}

export default function ActivityForm({ activity, closeForm }: Props) {
    const { updateActivity, createActivity } = useActivities();

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
            closeForm();

        } else {
            await createActivity.mutateAsync(data as unknown as Activity);
            closeForm();
        }

    }

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">Create activity</Typography>
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
                    <Button onClick={closeForm} color="inherit">Cancel</Button>
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