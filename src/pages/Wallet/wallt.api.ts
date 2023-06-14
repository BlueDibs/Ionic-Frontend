import { axiosInstance } from '../../utils/axios';

export function getHoldings() {
  return axiosInstance.get('/user/wallet').then((res) => res.data);
}
