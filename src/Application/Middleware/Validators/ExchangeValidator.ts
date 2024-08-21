import {body, param} from 'express-validator';

const validateCreateExchange = [
    body('senderUserId').isString().withMessage('Sender User ID debe ser un string'),
    body('receiverUserId').isString().withMessage('Receiver User ID debe ser un string'),
    body('senderClotheId').isString().withMessage('Sender Clothe Id debe ser un string'),
    body('receiverClotheId').isString().withMessage('Receiver Clothe Id debe ser un string')
]

const validateUpdateExchange = [
    body('state').isString().withMessage('State debe ser un string'),
]

const validateDeleteExchange = [
    param('exchangeId').isString().withMessage('exchangeId debe ser un string'),
]

export {validateCreateExchange, validateUpdateExchange, validateDeleteExchange};