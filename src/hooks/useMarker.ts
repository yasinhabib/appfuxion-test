import { PlaceType } from "../pages/PlaceLocator/SearchInput/interface";
import { getGeoLocation } from "../utils/common";

interface MarkerInterface{
    setMarker: (searchHistories: PlaceType[]) => void,
}

export const useMarker = (map : google.maps.Map | null) : MarkerInterface => {
    let markers : google.maps.Marker[] = []

    const setMapOnAllMarker = (map : google.maps.Map | null) => {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    const setMarker = async (searchHistories: PlaceType[]) => {
        removeAllMarker()
        for(const history of searchHistories){
            const result = await getGeoLocation(history.place_id)
            
            const mark = new google.maps.Marker({ map: map,position: result});
    
            markers.push(mark)
        }
    }

    const removeAllMarker = () => {
        setMapOnAllMarker(null)
        markers = [];
    }

    return({setMarker})
}