import { DocumentNode } from "graphql";
import gql from "graphql-tag";

const ENDPOINT = "https://api.mattb.tech";

const QUERY = gql`
  query SnapshotTest($startDate: DateTime!, $endDate: DateTime!) {
    energy(startDate: $startDate, endDate: $endDate) {
      gas {
        usage
        mix {
          fuel
          percentage
        }
        missingData
        emissions
      }
      electricity {
        usage
        mix {
          fuel
          percentage
        }
        emissions
        missingData
      }
      periods {
        electricity {
          emissions
          missingData
          mix {
            fuel
            percentage
          }
        }
        gas {
          emissions
          missingData
          mix {
            fuel
            percentage
          }
        }
      }
      startDate
      endDate
    }
  }
`;

test("Snapshot", async () => {
  const response = await query(QUERY, {
    startDate: "2024-06-16T00:00:00Z",
    endDate: "2024-06-16T23:59:59Z",
  });
  expect(response).toMatchSnapshot();
});

type GraphQlResponse<ResponseType = any> = {
  data: ResponseType;
  errors: Array<{ message: string }>;
};

export async function query<ResponseType = any>(
  query: DocumentNode,
  variables: Record<string, string>,
): Promise<ResponseType> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query.loc!.source.body, variables }),
  });

  if (!response.ok) {
    throw new Error(`Failed to query: ${response.statusText}`);
  }

  const responseJson = (await response.json()) as GraphQlResponse<ResponseType>;
  if (responseJson.errors?.length > 0) {
    throw new Error(`Failed to query: ${responseJson.errors[0].message}`);
  }

  return responseJson.data;
}
