import React, { useState } from "react";
import { Autocomplete, Libraries, useLoadScript } from "@react-google-maps/api";

interface AutocompleteProps {
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<LocationData | undefined>
  >;
  setGrayButton: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

function AutocompleteLocation({
  setSelectedLocation,
  setGrayButton,
}: AutocompleteProps) {
  const [searchResult, setSearchResult] = useState<any>(null);
  //   const apikey = ;
  const libraries: Libraries = ["places"];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_PLACES_API_KEY || "",
    libraries,
  });

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

  async function onPlaceChanged() {
    try {
      if (searchResult != null) {
        const place = await searchResult.getPlace();
        if (place.name === "") {
          setGrayButton(true);
          setSelectedLocation(undefined);
          return;
        }
        const name = place.name;
        const status = place.business_status;
        const formattedAddress = place.formatted_address;
        const city = place.address_components[0].long_name;
        const country =
          place.address_components[place.address_components.length - 1]
            .long_name;

        const data: LocationData = {
          city: city,
          country: country,
          latitude: 123,
          longitude: 123,
        };

        setSelectedLocation(data);
        setGrayButton(false);
        console.log(`Country: ${country}`);
        console.log(`City: ${city}`);
      } else {
        setSelectedLocation(undefined);
      }
    } catch (err) {
      setGrayButton(true);
      console.log(err);
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div id="searchColumn" className="w100">
      <Autocomplete
        onPlaceChanged={onPlaceChanged}
        onLoad={onLoad}
        options={{
          types: ["(cities)"],
          componentRestrictions: { country: ["ec", "co", "mx"] },
        }}
      >
        <div className="search-pill">
          <input type="text" className="search-pill-input " />
        </div>
      </Autocomplete>
    </div>
  );
}

export default AutocompleteLocation;
