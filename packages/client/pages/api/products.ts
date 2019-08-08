import { NextApiRequest, NextApiResponse } from 'next';

import products from '../../static/products.json';

export default (req: NextApiRequest, res: NextApiResponse) => {

    if ( req.method === 'GET' ) {
        res.status(200).json(products);
    }

    
};