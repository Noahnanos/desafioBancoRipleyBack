const tranfers = require('../models/transfer');
const account = require('../models/account');
const recipients = require('../models/recipients');


const makeTransfer = async (request, response) => {

    try {
        const { mount, date, user, recipient } = request.body;

        const userAccount = await account.findOne({user});
        const userRecipient = await recipients.findById(recipient);
        
        if (userAccount.balance >= mount ) {
            userAccount.balance = userAccount.balance - mount;
            userRecipient.balance = userRecipient.balance + mount;
            userAccount.save();
            userRecipient.save();

            await tranfers.create({mount, date, user, recipient});

            response.status(200).send({status: 'ok', msg: 'Transacción realizada correctamente.'})
        }else{
            response.status(200).send({status: 'Error', msg: 'La cuenta no cuenta con dinero suficiente para realizar la transacción.'})
        }

        
    } catch (error) {
        response.status(500).send({status: 'Error'})
    }

}

const getTransfer = async (request, response) => {
    try {
        
        const { user } = request.query;

        const transfersAccount = await tranfers.find({user}, {mount:1, date:1})
            .sort({"created_at": 1})
            .populate('recipient', ['username', 'rut', 'bank', 'accountType']);

        response.status(200).send({status: 'ok', transfers: transfersAccount});
    } catch (error) {
        response.status(500).send({status: 'Error'});
    }
}

module.exports = {
    makeTransfer,
    getTransfer
}