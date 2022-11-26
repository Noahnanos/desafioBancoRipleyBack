const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const users = require('../models/user');
const account = require('../models/account');

const createUser = async (request, response) => {
    try {
        const { username, rut, email, password } = request.body;
        const pass = await bcrypt.hash(password, 10);
        await users.create({
          username,
          rut,
          email,
          password: pass,
        });
        const user = await users.findOne({rut},{username:1, rut:1, email:1, _id:1});
        const token = generateToken(user._id);
        console.log(user)
        await account.create({user: user._id})
        response.send({ status: 'OK', user, token});
    } catch (error) {
        response.status(500).send({status: "Error"})
    }
}

const login = async (request, response) => {
    try {
      const { rut, password } = request.body;
      const user = await users.findOne({ rut });
      console.log(rut, password, user)
      if (user !== null) {
        const validPass = await bcrypt.compare(password, user.password);
        if (validPass) {
          const token = generateToken(user._id);
          response.status(200).send({ status: 'OK', user: {
            username:user.username, rut:user.rut, email:user.email, _id:user._id
          }, token });
        } else {
          response.status(404).send({status: 'Error', msg: 'La contraseña es incorrecta'})
        }
      } else {
        response.status(404).send({status: 'Error', msg: 'El usuario no existe'})
      }
    } catch (error) {
        console.log(error)
      response.status(500).send({status:'Error'});
    }
  };

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.jwt_key, { expiresIn: '4h'});
}

module.exports = {
    createUser,
    login
}