import env from "./env";

const ELECTRICITY_ENDPOINT = `https://api.octopus.energy/v1/electricity-meter-points/${env.OCTOPUS_ELECTRICITY_MPAN}/meters/${env.OCTOPUS_ELECTRICITY_SERIAL}/consumption/`;
const GAS_ENDPOINT = `https://api.octopus.energy/v1/gas-meter-points/${env.OCTOPUS_GAS_MPRN}/meters/${env.OCTOPUS_GAS_SERIAL}/consumption/`;

const HEADERS = {
  Authorization: `Basic ${Buffer.from(env.OCTOPUS_API_KEY + ":").toString("base64")}`,
};

export async function handler() {
  const electricity = await fetch(ELECTRICITY_ENDPOINT, {
    headers: HEADERS,
  });
  console.log(
    "Electricity: ",
    JSON.stringify(await electricity.json(), null, 2)
  );
  const gas = await fetch(GAS_ENDPOINT, {
    headers: HEADERS,
  });
  console.log("Gas: ", JSON.stringify(await gas.json(), null, 2));
}
