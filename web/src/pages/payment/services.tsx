import { request } from '@/services/request';

export async function getPaymentRequest(rid: string) {
  return request(`/server/api/request/payment/${rid}`, {
    method: 'GET',
  });
}

export async function getTicketsList() {
  return request(`/server/api/request/tickets/list`, {
    method: 'GET',
  });
}

export async function initiatePayment(values: any) {
  return request('/server/api/init/payment', {
    method: 'POST',
    data: values,
  });
}
export async function paymentSuccess(values: any) {
  const rid = values?.rid;
  return request(`/server/api/payment/success/${rid}`, {
    method: 'POST',
    data: values,
  });
}

export async function initiateTicket(values: any) {
  return request('/server/api/init/ticket', {
    method: 'POST',
    data: values,
  });
}
