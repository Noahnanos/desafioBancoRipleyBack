const account = require('../models/account');
const recipient = require('../models/recipients');

const resultRecipient = {user: 1,username: 1,rut: 1,email: 1,phone: 1,bank: 1,accountType: 1,accountNumber: 1, balance: 1};
const addRecipients = async (request, response) => {
    try {
      const { id, recipientAccount } = request.body;
  
      const result = await recipient.findOne({rut: recipientAccount.rut});
      if (result) {
        const acc = await account.findOne({user: id});
        if (acc.recipients.includes(result._id)) {
            return response.status(200).send({status: 'ok', msg: 'El destinario que deseas agregar ya se encuentra en tu lista.'});
        }

        acc.recipients.push(result._id);
        await acc.save();

        response.status(200).send({status: 'ok', msg: 'Destinatario agregado correctamente'});
      }else{
        const result = await recipient.create({...recipientAccount});
        const acc = await account.findOne({user: id});
        acc.recipients.push(result._id);
        await acc.save();

        response.status(200).send({status: 'ok', msg: 'Destinatario agregado correctamente'})
      }
    } catch (error) {
        console.log(error)
        response.status(500).send({status: 'Error'})
    }
}


const getRecipients = async (request, response) => {
  try {
    const { id } = request.body;

    const {recipients:recipientsID} = await account.findOne({user: id});
    const recipients = await recipient.find({_id:{$in: recipientsID}}, {...resultRecipient});

    response.status(200).send({status: 'ok', recipients})
  } catch (error) {
    response.status(500).send({status: 'Error'})
  }
}

const getRecipient = async (request, response) => {
  try {
    const { rut, id } = request.query;

    const {recipients:recipientsID} = await account.findOne({user: id});
    const recipients = await recipient.find({_id:{$in: recipientsID}}, {...resultRecipient});
    const recipientAccount = recipients.find(val => val.rut === rut);

    if (recipientAccount) {
      response.status(200).send({status: 'ok', recipient: recipientAccount});
    }else{
      response.status(200).send({status: 'Error', msg: "El destinatario ingresado no se encuentra en tu lista."});
    }

  } catch (error) {
    response.status(500).send({status: 'Error'})
  }
}

module.exports = {
    addRecipients,
    getRecipients,
    getRecipient
}