import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  CONSUMPTION_TABLE: str(),
  GRID_TABLE: str(),
});

export default env;
