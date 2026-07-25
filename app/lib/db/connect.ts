import "server-only";

import mongoose, { type Mongoose } from "mongoose";

/**
 * Cached Mongoose connection.
 *
 * `mongoose.connect()` is a no-op when already connected, so calling this from
 * every server component and route handler is safe. The cache exists for two
 * narrower reasons:
 *
 *  1. In dev, hot reload re-evaluates modules, and without a cache on
 *     `globalThis` each reload would open a fresh connection.
 *  2. On a serverless cold start several requests can land before the first
 *     connect resolves. Caching the *promise* (not just the connection) means
 *     they all await the same handshake instead of opening one socket each.
 *
 * TEMPORARY: this file exists only while the Render backend is down. The
 * backend owns Mongo normally (backend/app/config/db.ts). Delete this once
 * app/lib/reviews/ moves to backend/app/modules/testimonial/.
 */

type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

const globalForMongoose = globalThis as unknown as {
  __khemshieldMongoose?: MongooseCache;
};

const cache: MongooseCache =
  globalForMongoose.__khemshieldMongoose ?? { conn: null, promise: null };

globalForMongoose.__khemshieldMongoose = cache;

const connectDB = async (): Promise<Mongoose> => {
  if (cache.conn) return cache.conn;

  const url = process.env.MONGODB_URL;
  if (!url) {
    throw new Error(
      "MONGODB_URL is not set. Copy it from backend/.env into web/.env.local."
    );
  }

  if (!cache.promise) {
    // bufferCommands: false makes a query fail fast if the connection dropped,
    // rather than queueing until the default 10s buffer timeout.
    cache.promise = mongoose.connect(url, { bufferCommands: false });
  }

  try {
    cache.conn = await cache.promise;
  } catch (err) {
    // Clear the rejected promise so the next call retries instead of
    // re-awaiting a permanently failed handshake.
    cache.promise = null;
    throw err;
  }

  return cache.conn;
};

export default connectDB;
