import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

export default class UssdsController {
    public async index({ request, response }: HttpContextContract) {
        // Read the variables sent via POST from our API
        const {
            sessionId,
            serviceCode,
            phoneNumber,
            text,
        } = request.all();
        Logger.info(`phone number : ${phoneNumber}`);
        let body = '';
        Logger.info(`Text: ${text}`);
        if (text == null) {
            // This is the first request. Note how we start the body with CON
            body = `CON What would you like to check
    1. My account
    2. My phone number`;
            Logger.info('First text');
        } else if (text == '1') {
            // Business logic for first level body
            body = `CON Choose account information you want to view
    1. Account number`;
        } else if (text == '2') {
            // Business logic for first level body
            // This is a terminal request. Note how we start the body with END
            body = `END Your phone number is ${phoneNumber}`;
        } else if (text == '1*1') {
            // This is a second level body where the user selected 1 in the first instance
            const accountNumber = 'ACC100101';
            // This is a terminal request. Note how we start the body with END
            body = `END Your account number is ${accountNumber}`;
        }
        response.header('Content-type', 'text/plain');
        response.send(body);
        // return body;
    }
}
