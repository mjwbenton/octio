import { CfnOutput, Duration, Stack } from "aws-cdk-lib";
import {
  ComparisonOperator,
  TreatMissingData,
} from "aws-cdk-lib/aws-cloudwatch";
import { SnsAction } from "aws-cdk-lib/aws-cloudwatch-actions";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import {
  FunctionUrlAuthType,
  IFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Topic } from "aws-cdk-lib/aws-sns";
import { Construct } from "constructs";
import path from "path";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import env from "./env";

const ALARM_TOPIC = "arn:aws:sns:us-east-1:858777967843:general-alarms";

export default class OctioIngestionStack extends Stack {
  public readonly ingestionFunction: IFunction;

  constructor(
    scope: Construct,
    id: string,
    { dataTable }: { dataTable: ITable },
  ) {
    super(scope, id);

    this.ingestionFunction = new NodejsFunction(this, "Lambda", {
      entry: path.join(__dirname, "../../ingest-consumption/dist/index.js"),
      handler: "handler",
      bundling: {
        target: "node20",
        environment: {
          NODE_ENV: "production",
        },
      },
      timeout: Duration.minutes(1),
      runtime: Runtime.NODEJS_20_X,
      memorySize: 1024,
      environment: {
        DATA_TABLE: dataTable.tableName,
        OCTOPUS_API_KEY: env.OCTOPUS_API_KEY,
        OCTOPUS_ELECTRICITY_MPAN: env.OCTOPUS_ELECTRICITY_MPAN,
        OCTOPUS_ELECTRICITY_SERIAL: env.OCTOPUS_ELECTRICITY_SERIAL,
        OCTOPUS_GAS_MPRN: env.OCTOPUS_GAS_MPRN,
        OCTOPUS_GAS_SERIAL: env.OCTOPUS_GAS_SERIAL,
      },
    });

    // Schedule the function to run every 6 hours
    new Rule(this, "ScheduleRule", {
      schedule: Schedule.rate(Duration.hours(6)),
      targets: [new targets.LambdaFunction(this.ingestionFunction)],
    });

    dataTable.grantReadWriteData(this.ingestionFunction);

    const alarmAction = new SnsAction(
      Topic.fromTopicArn(this, "AlarmTopic", ALARM_TOPIC),
    );

    this.ingestionFunction
      .metricErrors()
      .createAlarm(this, "ErrorsAlarm", {
        threshold: 1,
        comparisonOperator:
          ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
        evaluationPeriods: 1,
        treatMissingData: TreatMissingData.NOT_BREACHING,
      })
      .addAlarmAction(alarmAction);

    const url = this.ingestionFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, "IngestionFunctionUrl", {
      value: url.url,
    });
  }
}
