import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const text = req.query['text'];

    res.status(200).json({ message: 'Hello from Next.js!' });
  }
}
