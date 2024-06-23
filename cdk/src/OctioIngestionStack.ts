import { CfnOutput, Duration, Stack } from "aws-cdk-lib";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import path from "path";
import env from "./env";
import ScheduledLambda from "./ScheduledLambda";
import { Schedule } from "aws-cdk-lib/aws-events";

export default class OctioIngestionStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    {
      consumptionTable,
      gridTable,
    }: { consumptionTable: ITable; gridTable: ITable },
  ) {
    super(scope, id);

    const ingestConsumptionLambda = new ScheduledLambda(
      this,
      "IngestConsumption",
      {
        entry: path.join(__dirname, "../../ingest-consumption/dist/index.js"),
        environment: {
          CONSUMPTION_TABLE: consumptionTable.tableName,
          OCTOPUS_API_KEY: env.OCTOPUS_API_KEY,
          OCTOPUS_ELECTRICITY_MPAN: env.OCTOPUS_ELECTRICITY_MPAN,
          OCTOPUS_ELECTRICITY_SERIAL: env.OCTOPUS_ELECTRICITY_SERIAL,
          OCTOPUS_GAS_MPRN: env.OCTOPUS_GAS_MPRN,
          OCTOPUS_GAS_SERIAL: env.OCTOPUS_GAS_SERIAL,
          OCTOPUS_ELECTRICITY_DEVICE_ID: env.OCTOPUS_ELECTRICITY_DEVICE_ID,
          OCTOPUS_GAS_DEVICE_ID: env.OCTOPUS_GAS_DEVICE_ID,
        },
      },
    )
      .withUrl()
      .withSchedule(Schedule.rate(Duration.hours(6)));

    consumptionTable.grantReadWriteData(ingestConsumptionLambda.lambda);

    const ingestGridLambda = new ScheduledLambda(this, "IngestGrid", {
      entry: path.join(__dirname, "../../ingest-grid/dist/index.js"),
      environment: {
        GRID_TABLE: gridTable.tableName,
      },
    })
      .withUrl()
      .withSchedule(Schedule.rate(Duration.hours(6)))
      .withErrorAlarm();

    gridTable.grantReadWriteData(ingestGridLambda.lambda);

    const gapCheckerConsumptionLambda = new ScheduledLambda(
      this,
      "GapCheckerConsumption",
      {
        entry: path.join(
          __dirname,
          "../../gap-checker-consumption/dist/index.js",
        ),
        environment: {
          CONSUMPTION_TABLE: consumptionTable.tableName,
        },
      },
    )
      .withUrl()
      .withSchedule(Schedule.rate(Duration.hours(24)))
      .withErrorAlarm();

    consumptionTable.grantReadData(gapCheckerConsumptionLambda.lambda);
  }
}
