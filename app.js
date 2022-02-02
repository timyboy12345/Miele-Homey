'use strict';

const Homey = require('homey');
const {OAuth2App} = require('/lib/homey-oauth2app');
const MieleAtHomeOAuthClient = require('./lib/MieleAtHomeOauth2Client');

module.exports = class MieleAtHomeApp extends OAuth2App {
    static OAUTH2_CLIENT = MieleAtHomeOAuthClient; // Default: OAuth2Client
    static OAUTH2_DEBUG = false; // Default: false
    static OAUTH2_MULTI_SESSION = false; // Default: false

    async onInit() {
        try {
            await super.onInit();
        } catch (err) {
            this.error(err);
            console.log(err);
        }

        this.enableOAuth2Debug();
        this.setOAuth2Config({
            client: MieleAtHomeApp.OAUTH2_CLIENT,
            clientId: Homey.env.CLIENT_ID,
            clientSecret: Homey.env.CLIENT_SECRET,
            apiUrl: MieleAtHomeOAuthClient.API_URL,
            tokenUrl: MieleAtHomeOAuthClient.TOKEN_URL,
            authorizationUrl: MieleAtHomeOAuthClient.AUTHORIZATION_URL,
        });

        if (process.env.DEBUG === '1') {
            this.homey.settings.set('debugMode', true);
        } else {
            this.homey.settings.set('debugMode', false);
        }

        // this.homeyLog = new Log({ homey: this.homey });
        // this.log(`${this.id} running...`);
    }
};
