import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import "./searchBox.css";

export default function SearchBox() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const API_URL = "http://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "5ffb1637abebda1a511c12d58a05c98b"

    const getWeatherInfo = async (city) => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error("City not found or API limit exceeded");
            }
            let jsonResponse = await response.json();
            let result = {
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,  
            };
            setWeather(result);
            setError("");
        } catch (err) {
            setError(err.message);
            setWeather(null);
        }
    };

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (city.trim() !== "") {
            getWeatherInfo(city);
            setCity("");
        }
    };

    return (
        <Card className="card" sx={{ maxWidth: 500, mx: "auto",boxShadow: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} sx={{mt: 4, p: 2}}>
                    <CardContent>
                        <Typography variant="h4">Search Weather</Typography>
                        <form onSubmit={onSubmit}>
                            <TextField
                                // id="city-input"
                                label="City"
                                variant="outlined"
                                placeholder="Enter city"
                                required
                                value={city}
                                onChange={handleChange}
                                fullWidth
                                id="margin-normal" margin="normal"
                            />
                            <Button type="submit" variant="contained" endIcon={<SendIcon />} fullWidth>
                                Search
                            </Button>
                        </form>
                    </CardContent>
                </Grid>
            <Grid item xs={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",  color: "black" }}>
                <CardContent className="rightPart">
                    <Box className="image" sx={{ width: "100%", display: "flex", justifyContent: "center" ,mb:2}}>
                         <img src="./assets/image.png" alt="image" style={{ width: "100%", maxHeight: 150, objectFit: "cover", borderRadius:"25px" }} />
                    </Box>
                    {weather ? (
                    <Box sx={{ mt: 2 }}>
                    <Typography variant="h5" fontWeight="bold">{city}</Typography>
                    <Typography variant="h6" color="primary">{weather.weather}</Typography>
                    <Typography>Temp:🌡️ {weather.temp}°C</Typography>
                    <Typography>Feels Like: {weather.feelsLike}°C</Typography>
                    <Typography>Humidity: {weather.humidity}%</Typography>
                    <Typography>Min: {weather.tempMin}°C | Max: {weather.tempMax}°C</Typography>
                    </Box>
                     ) : (
                    <Typography color="textSecondary">Enter a city to get weather details</Typography>
                     )}
                 </CardContent>
            </Grid>
        </Grid>
        </Card>
    );
}
