import { App } from "aws-cdk-lib";
import OctioDataStack from "./OctioDataStack";
import OctioIngestionStack from "./OctioIngestionStack";
import OctioGraphqlStack from "./OctioGraphqlStack";

const app = new App();
const dataStack = new OctioDataStack(app, "OctioData");
new OctioIngestionStack(app, "OctioIngestion", {
  consumptionTable: dataStack.consumptionTable,
  gridTable: dataStack.gridTable,
});
new OctioGraphqlStack(app, "OctioGraphql", {
  consumptionTable: dataStack.consumptionTable,
  gridTable: dataStack.gridTable,
});
