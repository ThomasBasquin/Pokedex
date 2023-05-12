import Redis from "ioredis";
import * as dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  // host: process.env.REDIS_HOST || "localhost",
  host: "localhost",
  port: 6379,
  password: process.env.REDIS_PASSWORD,
});

export default redis;
