import { Stack } from "aws-cdk-lib";
import {
  AttributeType,
  BillingMode,
  ITable,
  Table,
} from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export default class OctioDataStack extends Stack {
  public readonly dataTable: ITable;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.dataTable = new Table(this, "DataTable", {
      partitionKey: { name: "energyType", type: AttributeType.STRING },
      sortKey: { name: "startDate", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
    });
  }
}
