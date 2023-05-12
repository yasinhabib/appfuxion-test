import { useState, useCallback } from 'react'
import { Container, Box, Autocomplete, InputLabel, FormControl } from "@mui/material"
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import SearchInput from './SearchInput';

const containerStyle = {
    width: '100vw',
    height: '100vh'
};
  
const center = {
    lat: -6.2,
    lng: 106.81
};

const libraries : ["places" | "drawing" | "geometry" | "localContext" | "visualization"] = ['places']

const PlaceLocator = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
        libraries: libraries
    })
    
    const [map, setMap] = useState<google.maps.Map | null>(null)

    const onLoad = useCallback((map : google.maps.Map) => {
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)

        setMap(map)
    },[])

    const onUnmount = useCallback(() => {
        setMap(null)
    },[])

    return isLoaded ? (
            <Container maxWidth={false} disableGutters>
                <Box position={'absolute'} top={'4rem'} left={'1rem'} zIndex={10} width={'300px'} sx={{backgroundColor: 'white'}}>
                    <FormControl fullWidth>
                        <SearchInput />
                    </FormControl>
                </Box>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={4}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    { /* Child components, such as markers, info windows, etc. */ }
                    <></>
                </GoogleMap>
            </Container>
        
    ) : <></>
}

export default PlaceLocator