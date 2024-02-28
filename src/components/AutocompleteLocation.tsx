import React, { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

function App() {
  const [searchResult, setSearchResult] = useState<any>(null);
  const apikey = process.env.REACT_APP_PLACES_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apikey || "",
    libraries: ["places"],
  });

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
    } else {
      alert("Please enter text");
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div id="searchColumn">
      <Autocomplete
        onPlaceChanged={onPlaceChanged}
        onLoad={onLoad}
        options={{
          types: ["(cities)"],
          componentRestrictions: { country: ["ec", "co"] },
        }}
      >
        <div className="search-pill">
          <input type="text" className="search-pill-input " />
        </div>
      </Autocomplete>
    </div>
  );
}

export default App;
