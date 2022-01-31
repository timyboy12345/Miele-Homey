const {OAuth2Client, OAuth2Error} = require('/lib/homey-oauth2app');

module.exports = class MieleAtHomeOAuth2Client extends OAuth2Client {
    static API_URL = 'https://api.mcs3.miele.com/v1/';
    static TOKEN_URL = 'https://api.mcs3.miele.com/thirdparty/token/';
    static AUTHORIZATION_URL = 'https://api.mcs3.miele.com/thirdparty/login/';

    async onHandleNotOK({statusText}) {
        throw new OAuth2Error(statusText);
    }

    async getDevices() {
        return this.get(
            {
                path: 'devices?language=nl'
            }
        )
    }

    async getDevice(id) {
        return this.get(
            {
                path: 'devices/' + id + '?language=nl'
            }
        )
    }
};
