export const loadScript = (src: string, position: HTMLElement| null, id: string) => {
    if (!position) {
        return;
    }
    
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

export const getGeoLocation = async (placeId: string) => {
    const geocoder = new (window as any).google.maps.Geocoder(); 

    const result = await geocoder.geocode({placeId: placeId})

    return {lat: result.results[0].geometry.location.lat(), lng: result.results[0].geometry.location.lng()}
}