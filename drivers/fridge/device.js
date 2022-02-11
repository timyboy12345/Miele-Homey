'use strict';

const {OAuth2Device} = require('/lib/homey-oauth2app');

class MieleFridgeDevice extends OAuth2Device {
    async onOAuth2Init() {
        // Update data manually every minute
        this.interval = setInterval(() => {
            this.updateData();
        }, 1000 * 60)

        this.updateData();

        // TODO: Implement event listening
        // Example: https://jsfiddle.net/gjx3oshw/13/
    }

    async onOAuth2Deleted() {
        // TODO: Unregister listeners

        clearInterval(this.interval);
    }

    async updateData() {
        this.oAuth2Client.getDevice(this.getData().id)
            .then((device) => {
                this.setCapabilityValue('status', device.state.status.value_localized).catch(e => this.t(e, 'status'));
                this.setCapabilityValue('signal_info', device.state.signalInfo).catch(e => this.t(e, 'Signal Info'));
                this.setCapabilityValue('signal_failure', device.state.signalFailure).catch(e => this.t(e, 'Signal Failure'));
                this.setCapabilityValue('remote_enable', device.state.remoteEnable.mobileStart).catch(e => this.t(e, 'Remote Enable'));
            })
            .catch((e) => {
                console.error(e);
            });
    }

    /**
     * Converts an miele array to minutes
     * @param array
     */
    convertArrayToMinutes(array) {
        const hours = parseInt(array[0]) * 60;
        const minutes = parseInt(array[1]);

        if (hours === 0 && minutes === 0) {
            return null;
        }

        return hours + minutes;
    }

    /**
     * Print exception to console and throw
     * @param exception
     * @param type
     */
    t(exception, type) {
        console.error(`${type}: ${exception}`);
        // throw exception;
    }
}

module.exports = MieleFridgeDevice;
