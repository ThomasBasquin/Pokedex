import Redis from "ioredis";
import * as dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  // host: "redis",
  host: "127.0.0.1",
  port: 6379,
});

export default redis;
