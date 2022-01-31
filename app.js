'use strict';

const Homey = require('homey');
const {OAuth2App} = require('/lib/homey-oauth2app');
const MieleAtHomeOAuthClient = require('./lib/MieleAtHomeOauth2Client');

module.exports = class MercedesMeApp extends OAuth2App {
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

        let ClientID = this.homey.settings.get('ClientID');
        let ClientSecret = this.homey.settings.get('ClientSecret');
        this.diagLog = '';

        // TODO: Remove these
        // ClientID = '7e274d2d-3116-48f7-bc26-e017b22ba6bd';
        // ClientSecret = 'vOEY7djhn6K53AuB8bqBLNrnKHdftkOA';

        if (ClientID && ClientSecret) {
            this.setOAuth2Config({'clientId': ClientID, 'clientSecret': ClientSecret});
            await this.onOAuth2Init();
        } else {
            this.homey.settings.set('ClientID', '');
            this.homey.settings.set('ClientSecret', '');
        }

        if (process.env.DEBUG === '1') {
            this.homey.settings.set('debugMode', true);
        } else {
            this.homey.settings.set('debugMode', false);
        }

        this.homey.settings.on('set', async (key) => {
            let updateConfig = false;
            if (key === 'ClientSecret') {
                ClientSecret = this.homey.settings.get('ClientSecret');
                updateConfig = true;
            } else if (key === 'ClientID') {
                ClientID = this.homey.settings.get('ClientID');
                updateConfig = true;
            }

            if (updateConfig && ClientID && ClientSecret) {
                this.setOAuth2Config({'clientId': ClientID, 'clientSecret': ClientSecret});
                await this.onOAuth2Init();
            }
        });
    }

    async onOAuth2Init() {
        // Do App logic here
    }
};
