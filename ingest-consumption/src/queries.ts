import gql from "graphql-tag";

export const GET_JWT = gql`
  mutation GetJWT($apiKey: String!) {
    obtainKrakenToken(input: { APIKey: $apiKey }) {
      token
    }
  }
`;

export const GET_CONSUMPTION = gql`
  query GetConsumptionData(
    $startDate: DateTime!
    $endDate: DateTime
    $electricityDeviceId: String!
    $gasDeviceId: String!
  ) {
    electricity: smartMeterTelemetry(
      deviceId: $electricityDeviceId
      grouping: HALF_HOURLY
      start: $startDate
      end: $endDate
    ) {
      readAt
      consumptionDelta
    }
    gas: smartMeterTelemetry(
      deviceId: $gasDeviceId
      grouping: HALF_HOURLY
      start: $startDate
      end: $endDate
    ) {
      readAt
      consumptionDelta
    }
  }
`;
