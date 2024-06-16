import { DocumentNode } from "graphql";

const ENDPOINT = "https://api.octopus.energy/v1/graphql/";

type GraphQlResponse<ResponseType = any> = {
  data: ResponseType;
  errors: Array<{ message: string }>;
};

export async function query<ResponseType = any>(
  query: DocumentNode,
  variables: Record<string, string>,
  authToken?: string,
): Promise<ResponseType> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `JWT ${authToken}` } : {}),
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
