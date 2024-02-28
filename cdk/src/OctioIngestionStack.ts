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
      entry: path.join(__dirname, "../../ingestion/dist/index.js"),
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
      },
    });

    dataTable.grantReadWriteData(this.ingestionFunction);

    const alarmAction = new SnsAction(
      Topic.fromTopicArn(this, "AlarmTopic", ALARM_TOPIC),
    );

    this.ingestionFunction
      .metricInvocations({
        period: Duration.hours(6),
        statistic: "Sum",
      })
      .createAlarm(this, "RunningAlarm", {
        threshold: 1,
        comparisonOperator: ComparisonOperator.LESS_THAN_THRESHOLD,
        evaluationPeriods: 4,
        treatMissingData: TreatMissingData.BREACHING,
      })
      .addAlarmAction(alarmAction);

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
