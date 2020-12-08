import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import 'moment/locale/fr';
import {useEffect, useState} from "react";
import axios from "axios";
import React from "react";

moment().locale("fr");

function App() {
    const [days, setDays] = useState([]);
    useEffect(() => {
        axios.get(`https://calendrier.api.gouv.fr/jours-feries/metropole.json`)
            .then(data => data.data)
            .then(data => Object.keys(data).map(dayKey => ({
                iso: moment(dayKey, "YYYY-MM-DD"),
                label: data[dayKey]
            })))
            .then(data => data.filter(day => day.iso > moment()))
            .then(data => data.sort((dayA, dayB) => dayA.iso < dayB.iso ? -1 : 1))
            .then(data => data.slice(0, 13))
            .then(computedDays => setDays(computedDays))
    }, []);
    return (
        <div className="App">
            <Container>
                <Box className="title">
                    <Typography variant="h3">Jours feriés</Typography>
                </Box>
            </Container>
            <Container>
                <Box>
                    <Grid container spacing={3}>
                        {days.map((day, id) => (
                            <React.Fragment key={id}>
                                <Grid item xs={6} className="date">
                                    <Typography variant="body1">
                                        {day.iso.format("ddd Do MMM YYYY")}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} className="date-label">
                                    <Typography variant="body1">
                                        {day.label}
                                    </Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default App;
