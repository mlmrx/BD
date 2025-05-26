const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const events = require('aws-cdk-lib/aws-events');
const targets = require('aws-cdk-lib/aws-events-targets');

class EtlStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const func = new lambda.Function(this, 'EtlHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('../services/etl/dist'),
      handler: 'index.handler',
      environment: {},
    });

    new events.Rule(this, 'ShallowRule', {
      schedule: events.Schedule.cron({ minute: '*/5', hour: '*' }),
      targets: [new targets.LambdaFunction(func)],
    });

    new events.Rule(this, 'DeepRule', {
      schedule: events.Schedule.cron({ minute: '0', hour: '*/1' }),
      targets: [new targets.LambdaFunction(func)],
    });
  }
}

module.exports = { EtlStack };
