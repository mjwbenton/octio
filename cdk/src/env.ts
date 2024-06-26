import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  OCTOPUS_API_KEY: str(),
  OCTOPUS_ELECTRICITY_MPAN: str(),
  OCTOPUS_ELECTRICITY_SERIAL: str(),
  OCTOPUS_ELECTRICITY_DEVICE_ID: str(),
  OCTOPUS_GAS_MPRN: str(),
  OCTOPUS_GAS_SERIAL: str(),
  OCTOPUS_GAS_DEVICE_ID: str(),
});

export default env;
