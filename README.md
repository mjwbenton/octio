## Octio

Uses Octopus Energy APIs, combined with APIs from https://carbonintensity.org.uk/ to estimate the emissions related to my home energy usage.

### Single-use queries

The following queries can be used to get information needed to fetch data

Given an API key, get a JWT to call the GraphQL API:

```
mutation GetJWT($apiKey: String!) {
  obtainKrakenToken(input: { APIKey: $apiKey }) {
    token
  }
}
```

Given an account ID, get the gas and electricity deviceIDs:

```
query GetAccountDeviceIds($accountNumber: String!) {
  account(accountNumber: $accountNumber) {
    electricityAgreements {
      meterPoint {
        meters {
          smartDevices {
            deviceId
          }
        }
      }
    }
    gasAgreements {
      meterPoint {
        meters {
          smartDevices {
            deviceId
          }
        }
      }
    }
  }
}
```
