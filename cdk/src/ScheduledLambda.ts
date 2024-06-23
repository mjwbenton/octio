import { CfnOutput, Duration } from "aws-cdk-lib";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import {
  FunctionUrlAuthType,
  IFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as targets from "aws-cdk-lib/aws-events-targets";
import { SnsAction } from "aws-cdk-lib/aws-cloudwatch-actions";
import { Topic } from "aws-cdk-lib/aws-sns";
import {
  ComparisonOperator,
  TreatMissingData,
} from "aws-cdk-lib/aws-cloudwatch";

const ALARM_TOPIC = "arn:aws:sns:us-east-1:858777967843:general-alarms";

export default class ScheduledLambda extends Construct {
  readonly lambda: IFunction;

  constructor(
    scope: Construct,
    id: string,
    {
      environment,
      entry,
    }: {
      environment: Record<string, string>;
      entry: string;
    },
  ) {
    super(scope, id);

    this.lambda = new NodejsFunction(this, "Lambda", {
      entry,
      handler: "handler",
      bundling: {
        target: "node20",
        environment: {
          NODE_ENV: "production",
        },
      },
      timeout: Duration.minutes(2),
      runtime: Runtime.NODEJS_20_X,
      memorySize: 2048,
      environment,
    });
  }

  public withSchedule(schedule: Schedule): this {
    new Rule(this, "ScheduleRule", {
      schedule,
      targets: [new targets.LambdaFunction(this.lambda)],
    });
    return this;
  }

  public withErrorAlarm(): this {
    const alarmAction = new SnsAction(
      Topic.fromTopicArn(this, "AlarmTopic", ALARM_TOPIC),
    );

    this.lambda
      .metricErrors()
      .createAlarm(this, "ErrorsAlarm", {
        threshold: 1,
        comparisonOperator:
          ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
        evaluationPeriods: 1,
        treatMissingData: TreatMissingData.NOT_BREACHING,
      })
      .addAlarmAction(alarmAction);

    return this;
  }

  public withUrl(): this {
    const { url } = this.lambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });
    new CfnOutput(this, "LambdaUrl", {
      value: url,
    });
    return this;
  }
}
