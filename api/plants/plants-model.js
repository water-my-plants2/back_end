const db = require('../data/db-config');

async function getAllPlants() {  
        let results = await db("plants")
          return results         
  }

  function getPlantByPlantId(plant_id) {  
    return db("plants as p")
    .select("p.user_id","p.plant_nickname","p.plant_species" ,"p.h2ofrequency","p.plant_image" )
    .where( "p.plant_id", plant_id ).first()
  }

  async function getByNickname(filter) {
    let results = await db("plants").where(filter)
    return results;
  }

  function getBySpeciesname(filter) {
    return db("users").where(filter)
  }

  async function addPlant(plant) {
    // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
    // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
    // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
    const [newPlantObject] = await db('plants').insert(plant, ['user_id','plant_id', 'plant_nickname', 'plant_species','h2ofrequency',"plant_image"])
    return newPlantObject // { 'plant_id', 'plant_nickname', 'plant_species','h2ofrequency' }
  }

  async function updatePlant (plant_id, contents) {
    const [updatedPlant] = await db('plants')
      .where('plant_id', plant_id)
      .update(contents, [
        'user_id',
        'plant_nickname',
        'plant_species',
        'h2ofrequency',
        'plant_image',
    
      ]);
    return updatedPlant;
  }

  async function deletePlant(plant_id) {
    const plantToBeDeleted = await db("plants").where('plant_id',plant_id)
	await db('plants').where("plant_id", plant_id).del();
	return plantToBeDeleted;
  }
  
  module.exports = {
    getAllPlants,
    getPlantByPlantId,
    getByNickname,
    getBySpeciesname,
    addPlant,
    updatePlant,
    deletePlant
    
  };