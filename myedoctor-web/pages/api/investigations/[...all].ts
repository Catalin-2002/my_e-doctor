import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';
// pages/api/[...all].ts
export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    target: process.env.AI_API_SERVER_URL,
    changeOrigin: true,
    pathRewrite: [
      {
        patternStr: '^/api/investigations',
        replaceStr: '/api',
      },
    ],
    xfwd: false,
  });
