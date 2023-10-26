import { Button } from 'antd';
import { useEffect } from 'react';
import { initiatePayment, paymentSuccess } from './services';

export const PayNow = (props: any) => {
  const { data } = props;

  const { _id } = data;
  console.log("🚀 ~ file: payment.tsx:10 ~ PayNow ~ _id:", _id)

  const initPayment = async (e) => {
    const { status, payload } = await initiatePayment(e);

    if (status === 1) {
      if (window.Razorpay) {
        openPaymentPopup(payload);
      } else {
        console.error('Razorpay script not loaded');
      }
    }
  };

  const openPaymentPopup = (data) => {
    if (data.paymentOptions) {
      let paymentOptions = {
        ...data.paymentOptions,
        handler: async (response) => {
          await successPayment({...response, rid: _id});
        },
      };
      const rzp = new window.Razorpay(paymentOptions);
      rzp.open();
    }
  };

  const successPayment = async (data) => {
    const { status, payload } = await paymentSuccess(data);
    if (status) {
      window.location.reload();
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <Button onClick={(e) => initPayment(data)}>Pay Now</Button>;
};
