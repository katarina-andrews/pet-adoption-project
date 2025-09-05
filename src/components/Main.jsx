import { useState, useEffect } from "react";
import {
  listAllItems,
  createItem,
  updateItem,
  deleteItem,
} from "../utils/dynamo";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

export default function Main() {
  const [pets, setPets] = useState([]);
  const [open, setOpen] = useState(false);
  const [petEdit, setPetEdit] = useState({});

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const handleGetPet = async () => {
      const items = await listAllItems("PetAdopt");

      setPets(items);
    };

    handleGetPet();
  }, []);

  const handleOpen = (petObject) => {
    setPetEdit(petObject);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleCreatePet = async (event) => {
    event.preventDefault();

    const newPet = {
      id: Date.now().toString(),
      name: event.target.petName.value,
      age: parseInt(event.target.age.value),
      sex: event.target.sex.value,
      breed: event.target.breed.value,
      isFixed: event.target.isFixed.value,
      details: event.target.details.value,
    };

    console.log(event.target.isFixed.value);
    console.log(newPet);

    await createItem("PetAdopt", newPet);

    setPets((oldPets) => {
      return [...oldPets, newPet];
    });
  };

  const handleUpdatePet = async (event) => {
    event.preventDefault();

    const { name, age, sex, breed, isFixed, details } = petEdit;

    console.log(petEdit.id);
    await updateItem(
      "PetAdopt",
      { id: petEdit.id },
      { name, age, sex, breed, isFixed, details }
    );

    setPets((oldPets) => {
      return oldPets.map((petObject) => {
        return petObject.id === petEdit.id ? petEdit : petObject;
      });
    });

    setOpen(false);
  };

  const handleDeletePet = async (id) => {
    await deleteItem("PetAdopt", { id: id});
    console.log(id);
    setPets((oldPets) => {
      return oldPets.filter((petObject) => {
        return petObject.id != id;
      });
    });
  };

  return (
    <>
      <main>
        <section>
          <h2>Pet Information Form</h2>
          <form onSubmit={(event) => handleCreatePet(event)}>
            <label htmlFor="petName">Name</label>
            <input type="text" name="petName" id="petName" />
            <label htmlFor="age">Age</label>
            <input type="text" name="age" id="age" />
            <label htmlFor="sex">Sex</label>
            <input type="text" name="sex" id="sex" />
            <label htmlFor="breed">Breed</label>
            <input type="text" name="breed" id="breed" />
            <fieldset>
              <legend>Spayed/Neutered</legend>

              <label>
                <input type="radio" name="isFixed" value="Yes" /> Yes
              </label>
              <label>
                <input type="radio" name="isFixed" value="No" /> No
              </label>
            </fieldset>
            <label htmlFor="details">Details</label>
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
          <Grid container rowSpacing={3} columnSpacing={3} alignItems="stretch">
            {pets?.map((petObject, index) => {
              return (
                <div className="adoptable-pet-div" key={index}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: 300,
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image="src/assets/catdog.jpg"
                          alt="cat and dog"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            <Typography variant="h6" fontWeight="bold">
                              Name
                            </Typography>
                            <p>{petObject.name}</p>
                            <Typography variant="h6" fontWeight="bold">
                              Age
                            </Typography>
                            <p>{petObject.age}</p>
                            <Typography variant="h6" fontWeight="bold">
                              Sex
                            </Typography>
                            <p>{petObject.sex}</p>
                            <Typography variant="h6" fontWeight="bold">
                              Breed
                            </Typography>
                            <p>{petObject.breed}</p>
                            <Typography variant="h6" fontWeight="bold">
                              Spayed/Neutered
                            </Typography>
                            <p>{petObject.isFixed}</p>
                            <Typography variant="h6" fontWeight="bold">
                              Additional Details
                            </Typography>
                            <p>{petObject.details}</p>
                          </Typography>
                          <Button onClick={() => handleOpen(petObject)}>
                            Update Pet Information
                          </Button>
                          <Button
                            onClick={() =>
                              handleDeletePet(petObject.id)
                            }
                          >
                            Delete Me. I've Been Adopted!
                          </Button>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </div>
              );
            })}
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <form onSubmit={(event) => handleUpdatePet(event)}>
                <h2>Pet Information Form</h2>
                <label htmlFor="petName">Name</label>
                <input
                  onChange={(event) =>
                    setPetEdit({
                      id: petEdit.id,
                      name: event.target.value,
                      age: petEdit.age,
                      sex: petEdit.sex,
                      breed: petEdit.breed,
                      isFixed: petEdit.isFixed,
                      details: petEdit.details,
                    })
                  }
                  value={petEdit.name}
                  type="text"
                  name="petName"
                  id="petName"
                />

                <label htmlFor="age">Age</label>
                <input
                  onChange={(event) =>
                    setPetEdit({
                      id: petEdit.id,
                      name: petEdit.name,
                      age: event.target.value,
                      sex: petEdit.sex,
                      breed: petEdit.breed,
                      isFixed: petEdit.isFixed,
                      details: petEdit.details,
                    })
                  }
                  value={petEdit.age}
                  type="number"
                  name="age"
                  id="age"
                />

                <label htmlFor="sex">Sex</label>
                <input
                  onChange={(event) =>
                    setPetEdit({
                      id: petEdit.id,
                      name: petEdit.name,
                      age: petEdit.age,
                      sex: event.target.value,
                      breed: petEdit.breed,
                      isFixed: petEdit.isFixed,
                      details: petEdit.details,
                    })
                  }
                  value={petEdit.sex}
                  type="text"
                  name="sex"
                  id="sex"
                />

                <label htmlFor="breed">Breed</label>
                <input
                  onChange={(event) =>
                    setPetEdit({
                      id: petEdit.id,
                      name: petEdit.name,
                      age: petEdit.age,
                      sex: petEdit.sex,
                      breed: event.target.value,
                      isFixed: petEdit.isFixed,
                      details: petEdit.details,
                    })
                  }
                  value={petEdit.breed}
                  type="text"
                  name="breed"
                  id="breed"
                />

                <fieldset>
                  <legend>Spayed/Neutered</legend>
                  <label>Yes</label>
                  <input
                    onChange={(event) =>
                      setPetEdit({
                        id: petEdit.id,
                        name: petEdit.name,
                        age: petEdit.age,
                        sex: petEdit.sex,
                        breed: petEdit.breed,
                        isFixed: event.target.value,
                        details: petEdit.details,
                      })
                    }
                    value={petEdit.isFixed}
                    type="radio"
                    name="isFixed"
                  />

                      <label>No</label>
                  <input
                    onChange={(event) =>
                      setPetEdit({
                        id: petEdit.id,
                        name: petEdit.name,
                        age: petEdit.age,
                        sex: petEdit.sex,
                        breed: petEdit.breed,
                        isFixed: event.target.value,
                        details: petEdit.details,
                      })
                    }
                    value={petEdit.isFixed}
                    type="radio"
                    name="isFixed"
                  />
                </fieldset>

                <label htmlFor="details">Details</label>
                <textarea
                  onChange={(event) =>
                    setPetEdit({
                      id: petEdit.id,
                      name: petEdit.name,
                      age: petEdit.age,
                      sex: petEdit.sex,
                      breed: petEdit.breed,
                      isFixed: petEdit.isFixed,
                      details: event.target.value,
                    })
                  }
                  value={petEdit.details}
                  type="text"
                  name="details"
                  id="details"
                />
                <button type="submit">Add Pet</button>
              </form>
            </Box>
          </Modal>
        </section>
      </main>
    </>
  );
}
