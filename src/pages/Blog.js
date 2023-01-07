import{useMemo} from 'react';
import {GoogleMap,useLoadScript,marker} from '@react-google-maps/api';

export default function Home(){

    const {isLoaded}=useLoadScript({
        googleMapsApiKey:'AIzaSyBwz0ELeXzrfOmPmrbAILbIGm9tUd_oVzE',
    })
    if(!isLoaded){
        return <div>it's loading</div>
    }
    return <Map/>;

}

function Map(){
    return <GoogleMap zoom={10} center={{lat:44,lng:-80}}/>
}