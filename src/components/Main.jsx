import { useState, useEffect } from "react";
import { listAllItems, createItem } from "../utils/dynamo";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function Main() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const handleGetPet = async () => {
      const items = await listAllItems("PetAdopt");

      setPets(items);
    }

    handleGetPet();
  }, []);

  const handleCreatePet = async (event) => {
    event.preventDefault();

    const newPet = {
      id: Date.now().toString(),
      name: event.target.petName.value,
      age: parseInt(event.target.age.value),
      sex: event.target.sex.value, 
      breed: event.target.breed.value,
      isFixed: event.target.isFixed.value,
      details: event.target.details.value
    }

    console.log(event.target.isFixed.value);
    console.log(newPet);

    await createItem("PetAdopt", newPet);

    setPets((oldPets) => {
      return [...oldPets, newPet];
    });
  }

  return (
    <>
      <main>
        <section>
          <form onSubmit={(event) => handleCreatePet(event)}>
            <label>Name</label>
            <input type="text" name="petName" id="petName" />
            <label>Age</label>
            <input type="text" name="age" id="age" />
            <label>Sex</label>
            <input type="text" name="sex" id="sex" />
            <label>Breed</label>
            <input type="text" name="breed" id="breed" />
            <fieldset>
              <legend>Spayed/Neutered</legend>

               <label>
    <input type="radio" name="isFixed" value="Yes"/> Yes
  </label>
  <label>
    <input type="radio" name="isFixed" value="No"/> No
  </label>
            </fieldset>
            <label>Details</label>
            <textarea
              type="text"
              name="details"
              id="details"
              placeholder="temperament, good w/ kids, good w/ other pets, size/weight etc."
            ></textarea>
            <button type="submit">Add Pet</button>
          </form>
        </section>
       <section>
        <h2>Adoptable Pets</h2>
        {pets?.map((petObject, index) => {
          return (
            <div className="adoptable-pet-div" key={index}>
        <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="src/assets/catdog.jpg"
          alt="cat and dog"
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <p className="p-head">Name</p><p>{petObject.name}</p>
            <p className="p-head">Age</p><p>{petObject.age}</p>
            <p className="p-head">Sex</p><p>{petObject.sex}</p>
            <p className="p-head">Breed</p><p>{petObject.breed}</p>
            <p className="p-head">Spayed/Neutered</p><p>{petObject.isFixed}</p>
            <p className="p-head">Additional Details</p><p>{petObject.details}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
          );
        })} 
      </section>
      </main>
    </>
  );
}


