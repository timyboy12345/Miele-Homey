'use strict';

const {OAuth2Device} = require('/lib/homey-oauth2app');

class MieleWashingMachineDevice extends OAuth2Device {
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
                this.setCapabilityValue('program_id', device.state.ProgramID.value_localized).catch((e) => this.t(e, 'program_id'));
                this.setCapabilityValue('status', device.state.status.value_localized).catch(e => this.t(e, 'status'));
                this.setCapabilityValue('program_type', device.state.programType.value_localized).catch(e => this.t(e, 'Program Type'));
                this.setCapabilityValue('program_phase', device.state.programPhase.value_localized).catch(e => this.t(e, 'Program Phase'));
                this.setCapabilityValue('remaining_time', this.convertArrayToMinutes(device.state.remainingTime)).catch(e => this.t(e, 'Remaining Time'));
                this.setCapabilityValue('start_time', this.convertArrayToMinutes(device.state.startTime)).catch(e => this.t(e, 'Start Time'));
                this.setCapabilityValue('signal_info', device.state.signalInfo).catch(e => this.t(e, 'Signal Info'));
                this.setCapabilityValue('signal_failure', device.state.signalFailure).catch(e => this.t(e, 'Signal Failure'));
                this.setCapabilityValue('remote_enable', device.state.remoteEnable.mobileStart).catch(e => this.t(e, 'Remote Enable'));
                this.setCapabilityValue('elapsed_time', this.convertArrayToMinutes(device.state.elapsedTime)).catch(e => this.t(e, 'Elapsed Time'));
                this.setCapabilityValue('spinning_speed', device.state.spinningSpeed.value_raw).catch(e => this.t(e, 'Spinning Speed Step'));
                this.setCapabilityValue('eco_feedback', device.state.ecoFeedback ? device.state.ecoFeedback.energyForecast : null).catch(e => this.t(e, 'Eco Feedback'));
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

module.exports = MieleWashingMachineDevice;
