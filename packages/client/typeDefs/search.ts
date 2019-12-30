import { Product } from './product'
import { RequestStatus } from './store'

export interface Search {
  data: {
    visible: boolean;
    searchString: string;
    results: Product[];
  };
  status: RequestStatus;
}
