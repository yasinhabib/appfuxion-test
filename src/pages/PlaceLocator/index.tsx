import { useState, useCallback, useEffect } from 'react'
import { Container, Box, Autocomplete, InputLabel, FormControl } from "@mui/material"
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import SearchInput from './SearchInput';
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import { getGeoLocation } from '../../utils/common';
import { useMarker } from '../../hooks/useMarker';
import HistoryInput from './HistoryInput';

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: -6.2,
    lng: 106.81
}

const libraries : ["places" | "drawing" | "geometry" | "localContext" | "visualization"] = ['places']

const PlaceLocator = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
        libraries: libraries
    })
    const {searchHistories} = useSelector((s : RootState) => s)

    const [map, setMap] = useState<google.maps.Map | null>(null)
    const {setMarker} = useMarker(map)

    const onLoad = useCallback((map : google.maps.Map) => {
        setMap(map)
    },[])

    const onUnmount = useCallback(() => {
        setMap(null)
    },[])

    const setGeoLocation = async () => {
        const result = await getGeoLocation(searchHistories[searchHistories.length - 1].place_id)

        map?.setCenter(result)

        var bounds = new google.maps.LatLngBounds(result);
        map?.fitBounds(bounds);

        setMarker(searchHistories)
    }

    const navigateToMarker = async (placeId: string) => {
        const result = await getGeoLocation(placeId)

        map?.setCenter(result)
    }
    
    useEffect(() => {
        if(searchHistories.length > 0){
            setGeoLocation()
        }
    },[searchHistories])

    return isLoaded ? (
            <Container maxWidth={false} disableGutters>
                <Box position={'absolute'} top={'4rem'} left={'10px'} zIndex={10} width={'300px'} sx={{backgroundColor: 'white'}}>
                    <FormControl fullWidth>
                        <SearchInput />
                    </FormControl>
                </Box>
                <Box position={'absolute'} bottom={'24px'} right={'4rem'} zIndex={10} width={'300px'} sx={{backgroundColor: 'white'}} boxShadow={'10px 10px 25px 0px rgba(0,0,0,0.5)'}>
                    <HistoryInput navigate={navigateToMarker}/>
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