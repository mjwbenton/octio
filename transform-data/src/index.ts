import { DynamoDBClient, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
  paginateScan,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME;

if (!tableName) {
  throw new Error("Table name not set");
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

async function deleteItem(item: Record<string, any>): Promise<void> {
  const params: DeleteCommandInput = {
    TableName: tableName,
    Key: {
      energyType: item.energyType,
      startDate: item.startDate,
    },
  };

  await docClient.send(new DeleteCommand(params));
}

async function main() {
  try {
    const items = await scanTable();

    const oldItems = items.filter(
      (item) => !item.startDate.endsWith("00.000Z"),
    );

    for (const oldItem of oldItems) {
      await deleteItem(oldItem);
    }

    console.log("All old-style items have been deleted from the table.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
