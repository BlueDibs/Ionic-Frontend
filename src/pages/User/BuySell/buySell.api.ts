import { axiosInstance } from "../../../utils/axios";

export function buySharesAPI(userId: string, body: { amount: number }) {
  return axiosInstance.post(`/holding/buy/${userId}`, body);
}

export function sellSharesAPI(userId: string, body: { amount: number }) {
  return axiosInstance.post(`/holding/sell/${userId}`, body);
}

export function selfSellSharesAPI(body: { percentage: number }) {
  return axiosInstance.post(`/user/sell-own-equity`, body);
}
