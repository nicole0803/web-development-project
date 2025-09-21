import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";

type Props = {
    activity?: Activity
    closeForm: () => void
    submitForm: (activity: Activity) => void
}

export default function ActivityForm({ activity, closeForm, submitForm }: Props) {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // prevent using browser submission which causes the page to reload and lose data

        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {}

        formData.forEach((value, key) => {
            data[key] = value;
        })

        if (activity) data.id = activity.id;

        submitForm(data as unknown as Activity);    // convert to unknown first before Activity

    }

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">Create activity</Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                <TextField label='Title' name="title" defaultValue={activity?.title} />
                <TextField label='Description' name="description" defaultValue={activity?.description} multiline rows={3} />
                <TextField label='Category' name="category" defaultValue={activity?.category} />
                <TextField label='Date' name="date" defaultValue={activity?.date} type="date" />
                <TextField label='City' name="city" defaultValue={activity?.city} />
                <TextField label='Venue' name="venue" defaultValue={activity?.venue} />
                <Box display={'flex'} justifyContent={'end'} gap={3}>
                    <Button onClick={closeForm} color="inherit">Cancel</Button>
                    <Button type="submit" color="success" variant="contained">Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}