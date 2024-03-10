import { CfnOutput, Stack } from "aws-cdk-lib";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import path from "path";
import env from "./env";
import ScheduledLambda from "./ScheduledLambda";

export default class OctioIngestionStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    { dataTable, gridTable }: { dataTable: ITable; gridTable: ITable }
  ) {
    super(scope, id);

    const ingestConsumptionLambda = new ScheduledLambda(
      this,
      "IngestConsumption",
      {
        entry: path.join(__dirname, "../../ingest-consumption/dist/index.js"),
        environment: {
          DATA_TABLE: dataTable.tableName,
          OCTOPUS_API_KEY: env.OCTOPUS_API_KEY,
          OCTOPUS_ELECTRICITY_MPAN: env.OCTOPUS_ELECTRICITY_MPAN,
          OCTOPUS_ELECTRICITY_SERIAL: env.OCTOPUS_ELECTRICITY_SERIAL,
          OCTOPUS_GAS_MPRN: env.OCTOPUS_GAS_MPRN,
          OCTOPUS_GAS_SERIAL: env.OCTOPUS_GAS_SERIAL,
        },
      }
    );

    dataTable.grantReadWriteData(ingestConsumptionLambda.lambda);

    new CfnOutput(this, "IngestConsumptionUrl", {
      value: ingestConsumptionLambda.url,
    });
  }
}
