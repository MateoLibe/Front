// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  project: string
}

export default function handler(  req: NextApiRequest,  res: NextApiResponse<Data>) {
  
    if (req.method === 'POST') {
       
      console.log(req.body)
        return res.status(200).json({"project":"new task"})}


    return res.status(200).json({ project: 'First Project' })
}
