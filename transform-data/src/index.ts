import { DynamoDBClient, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
  paginateScan,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME;

if (!tableName) {
  throw new Error("Table name not set");
}

// Modify this for new transformations
function transformItem(item: Record<string, any>): Record<string, any> {
  return {
    ...item,
    consumption: Math.round(item.consumption * 1000),
  };
}

async function scanTable(): Promise<Record<string, any>[]> {
  let items: Record<string, any>[] = [];

  const params: ScanCommandInput = {
    TableName: tableName,
  };

  for await (const page of paginateScan({ client: docClient }, params)) {
    items = items.concat(page.Items || []);
  }

  return items;
}

async function writeItem(item: Record<string, any>): Promise<void> {
  const params: PutCommandInput = {
    TableName: tableName,
    Item: item,
  };

  await docClient.send(new PutCommand(params));
}

async function main() {
  try {
    const items = await scanTable();

    for (const item of items) {
      const transformedItem = transformItem(item);
      await writeItem(transformedItem);
    }

    console.log(
      "All items have been transformed and written back to the table.",
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
