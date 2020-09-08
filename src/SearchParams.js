import React, { useState, useEffect, useContext } from 'react';
import Results from './Results';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropDown from './useDropdown';
import ThemeContext from './ThemeContext';

const SearchParams = () => {
    const [location, setLocation] = useState("Seattle, WA");
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropDown] = useDropDown("Animal", "dog", ANIMALS);
    const [breed, BreedDropDown, setBreed] = useDropDown("Breed", "", breeds);
    const [pets, setPets] = useState([]); // this is for initial state. When we load things, in the beginning, nothing will be there.
    const [theme, setTheme] = useContext(ThemeContext);

    async function requestPets() {
        const { animals } = await pet.animals({
            location, breed, type: animal
        })

        setPets(animals || []);
    };

    useEffect(() => {
        setBreeds([]);
        setBreed("");
        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({ name }) => name);
            setBreeds(breedStrings);
        }, console.error);
    }, [animal, setBreed, setBreeds]);


    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                requestPets();
            }} >
                <label htmlFor="location">
                    Location
                    <input id="location"
                        value={location}
                        placeholder="location"
                        onChange={e => setLocation(e.target.value)}
                    />
                </label>
                <AnimalDropDown />
                <BreedDropDown />
                {/* We are not using the dropdown component because we are using a different hook */}
                <label htmlFor="theme">
                    Theme
                    <select value={theme}
                        onChange={e => setTheme(e.target.value)}
                        onBlur={e => setTheme(e.target.value)}
                    >
                        <option value="peru">Peru</option>
                        <option value="darkblue">Dark Blue</option>
                        <option value="mediumorchid">Medium Orchid</option>
                        <option value="chartreuse">Chartreuse</option>
                    </select>
                </label>
                <button style={{ backgroundColor: theme }}>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    );
}

export default SearchParams;