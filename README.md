## Octio

Uses Octopus Energy APIs, combined with APIs from https://carbonintensity.org.uk/ to estimate the emissions related to my home energy usage.

### Units

The consumption table uses different units for different types of energy, in different circumstances.

- Electricity consumption is stored in _Watt hours_
- Gas consumption, with a source of `DIRECT` is stored in _litres_ (i.e. _0.001 cubic meters_)
- Gas consumption, with a source of `MINI` is stored in _Watt hours_

Energy vended from the GraphQL API is consistently in kWh. Emissions vended from the GraphQL API is consistently kgCo2e.

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
