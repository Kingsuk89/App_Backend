import redis from "redis";

const client = redis.createClient({ url: process.env.REDIS_URL });

client.connect("error", (err) => {
  console.error("Redis error:", err);
});

export default client;
