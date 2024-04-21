import React, { useState } from "react";
import { Autocomplete, Libraries, useLoadScript } from "@react-google-maps/api";

interface AutocompleteProps {
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<LocationData | undefined>
  >;
  setGrayButton?: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string;
}

interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

const libraries: Libraries = ["places"];
function AutocompleteLocation({
  setSelectedLocation,
  setGrayButton,
  placeholder,
}: AutocompleteProps) {
  const [searchResult, setSearchResult] = useState<any>(null);
  //   const apikey = ;
  // insert the public api key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB3OJgL9-g2f6rIxua7rxV0ST2hcgsqppw",
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
          if (setGrayButton) {
            setGrayButton(true);
          }
          setSelectedLocation(undefined);
          return;
        }
        // const name = place.name;
        // const status = place.business_status;
        // const formattedAddress = place.formatted_address;
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
        if (setGrayButton) {
          setGrayButton(false);
        }
      } else {
        setSelectedLocation(undefined);
      }
    } catch (err) {
      if (setGrayButton) {
        setGrayButton(true);
      }
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
          componentRestrictions: { country: ["ec", "ar", "co", "mx"] },
        }}
      >
        <div className="search-pill">
          <input
            type="text"
            className="search-pill-input "
            placeholder={placeholder ? placeholder : ""}
          />
        </div>
      </Autocomplete>
    </div>
  );
}

export default AutocompleteLocation;
