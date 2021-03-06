
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
        username: 'lambda',
        password: '$2a$08$eUq5Nf68T.3lWymXhy5G5OYT9tubevRMWmUp0qrGDVtdhlI4rzNSC', //lambda123
        user_email: 'contact@lambdaschool.com', 
        user_phone: '415-262 4219'
      }   ,
      {
        username: 'guest',
        password: '$2a$08$8Pbh.AJwwBeOqeVD4LQs2OIYY3D2.7EP7fzcORqGDiBla89EQiYwq', //guest1234
        user_email: 'test@lambdaschool.com', 
        user_phone: '408-333-666'
      }         
      ]);
    });
};
