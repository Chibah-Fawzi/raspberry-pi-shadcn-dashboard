import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker optimization
  output: 'standalone',
  
  // Disable telemetry
  telemetry: {
    disabled: true,
  },
  
  // Optimize for production
  // Removed invalid 'outputFileTracingRoot' property from experimental config
};

export default nextConfig;
