import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  GRID_TABLE: str(),
});

export default env;
