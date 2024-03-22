import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  DATA_TABLE: str(),
  GRID_TABLE: str(),
});

export default env;
