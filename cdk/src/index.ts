import { App } from "aws-cdk-lib";
import OctioDataStack from "./OctioDataStack";
import OctioIngestionStack from "./OctioIngestionStack";
import OctioGraphqlStack from "./OctioGraphqlStack";

const app = new App();
const dataStack = new OctioDataStack(app, "OctioData");
new OctioIngestionStack(app, "OctioIngestion", {
  dataTable: dataStack.dataTable,
  gridTable: dataStack.gridTable,
});
new OctioGraphqlStack(app, "OctioGraphql", {
  dataTable: dataStack.dataTable,
  gridTable: dataStack.gridTable,
});
