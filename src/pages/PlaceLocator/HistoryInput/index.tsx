import { useSelector } from "react-redux";
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Divider} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { RootState } from "../../../redux/store";
import { HistoryInputProps } from "./interface";

const HistoryInput = ({navigate} : HistoryInputProps) => {
    const {searchHistories} = useSelector((s : RootState) => s)

    return(
        <>
            <Typography sx={{px: '1rem', pt: '1rem'}} variant="h6" component="div">
                Search Location History
            </Typography>
            <List
                dense={true}
            >
                {
                    searchHistories.map(value => (
                        <>
                            <Divider variant="fullWidth" component="li" />
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="navigate" onClick={() => navigate(value.place_id)} title="Navigate to Marker">
                                        <ArrowIcon />
                                    </IconButton>
                                }

                            >
                                <ListItemIcon>
                                    <LocationOnIcon sx={{ color: 'text.secondary' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={value.description}
                                />
                            </ListItem>
                        </>
                    ))
                }
                {
                    searchHistories.length === 0 
                    && 
                    <>
                        <Divider variant="fullWidth" component="li" />
                        <ListItem>
                            <ListItemText
                                sx={{textAlign: 'center', color: 'grey'}}
                                primary="No Search History Location Found"
                            />
                        </ListItem>
                    </>
                }
            </List>
        </>
    )
}

export default HistoryInput