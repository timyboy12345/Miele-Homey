# Miele@Homey ⚙️

View the status of your Miele@Home devices on your Homey through the Miele API.

## Retrieving Data
This package retrieves data through the Miele API, using the oAuth Protocol.

## Adding devices
Although intriguing, I don't own all devices that can be controlled through Miele@Home

## Capabilities
Miele has published a spreadsheet containing all the capabilities of each device. This file can be found on [miele.com/developer](https://www.miele.com/developer/assets/API_V1.x.x_capabilities_by_device.pdf).

## Supported Devices
This app supports the following devices:

- Washing Machine
- Tumble Dryer
- Ovens
- Dishwasher

If you find yourself having a device that is not supported, but is supported by Miele, feel free to add the device and create a pull request.

## Development
If you want to add any devices, or improve any code currently committed, it is important you read the information below.

### Miele Developer Account
To deploy this application to your Homey, you need to copy `example.env.json` to `env.json` and fill in the client token and secret. To obtain these credentials, you have to submit your email-address, together with an application name, to Miele. Fill in the form at https://www.miele.com/f/com/en/register_api.aspx to get your credentials.
