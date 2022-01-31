'use strict';

const {OAuth2Device} = require('/lib/homey-oauth2app');

module.exports = class MyBrandDevice extends OAuth2Device {
    async onOAuth2Init() {
        // this.registerCapabilityListener("onoff", async (value) => {
        //     await DeviceApi.setMyDeviceState({on: value});
        // });

        // DeviceApi.on('state-changed', (isOn) => {
        //     this.setCapabilityValue('onoff', isOn).catch(this.error);
        // });

        // Update data manually every 5 minutes
        this.interval = setInterval(() => {
            this.updateData();
        }, 1000 * 60 * 5)

        this.updateData();
    }

    async onOAuth2Deleted() {
        // TODO: Unregister listeners

        clearInterval(this.interval);
    }

    async updateData() {
        this.oAuth2Client.getDevice(this.getData().id)
            .then((device) => {
                this.setCapabilityValue('status', device.state.status.value_localized).catch(e => console.error(e));
                this.setCapabilityValue('program_phase', device.state.programPhase.value_localized).catch(e => console.error(e));
                this.setCapabilityValue('program_type', device.state.programType.value_localized).catch(e => console.error(e));
                this.setCapabilityValue('remaining_time', device.state.remainingTime[0]).catch(e => console.error(e));
                this.setCapabilityValue('spinning_speed', device.state.spinningSpeed.value_raw).catch(e => console.error(e));
            })
            .catch((e) => {
                console.error(e);
            });
    }

};
