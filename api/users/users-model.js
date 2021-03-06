const db = require('../data/db-config');

async function findAllUsers() {  
  let results = await db("users")
    return results 
  }

async function findByUserId(user_id) {  
    let results = await db("users").where( "user_id", user_id ).first();
    return results;
  }

  function findPlantsByUserId(user_id) {  
    return db("users as u")
    .select("u.user_id","u.username","p.plant_id","p.plant_nickname","p.plant_species" ,"p.h2ofrequency","p.plant_image" )
    .join("plants as p", "u.user_id", "p.user_id")
    .where( "u.user_id", user_id )
  }

  async function findByUsername(filter) {
    let results = await db("users").where(filter)
    return results;
  }

  async function findByPhone(phone){
    let results =  await db("users").where( "user_phone", phone ).first();
    return results;
  }

  async function addUser(user) {
    // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
    // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
    // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
    return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
  }

async function updateUser (user_id, contents) {
  const [updatedUser] = await db('users')
    .where('user_id', user_id)
    .update(contents, [
      "user_id",
      "username",
      "user_phone",
      "user_email",
      "created_at"
    ]);
  return updatedUser;
}

  
  module.exports = {
    findAllUsers,
    findByUserId,
    findPlantsByUserId, 
    findByUsername,
    findByPhone,
    addUser,
    updateUser
  };