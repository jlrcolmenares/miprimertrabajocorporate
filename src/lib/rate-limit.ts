// Simple in-memory rate limiter for API routes
// For production, consider using Redis or Upstash

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = identifier;

  // Initialize or reset if expired
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 0,
      resetTime: now + config.interval,
    };
  }

  // Increment count
  store[key].count++;

  // Check if limit exceeded
  const remaining = Math.max(0, config.maxRequests - store[key].count);
  const success = store[key].count <= config.maxRequests;

  return {
    success,
    remaining,
    resetTime: store[key].resetTime,
  };
}

// Helper to get IP from request
export function getClientIp(request: Request): string {
  // Try to get real IP from headers (for proxies/CDNs)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  // Fallback
  return "unknown";
}
