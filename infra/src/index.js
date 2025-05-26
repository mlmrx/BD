const cdk = require('aws-cdk-lib');
const { EtlStack } = require('./etl-stack');

const app = new cdk.App();
new EtlStack(app, 'EtlStack');
