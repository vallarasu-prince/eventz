import { Alert, Card, Descriptions, Divider, Spin, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PayNow } from './payment';
import { getPaymentRequest } from './services';

const PaymentPreview = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});

  const { cart, step } = data;

  const steps = [
    {
      title: 'Payment Preview',
    },
    {
      title: 'Ticket Preview',
    },
  ];

  const stepsMap = {
    paymentPreview: {
      title: 'Payment Preview',
      component: <PaymentPreviewComponent cart={cart} data={data} />,
    },
    ticketPreview: {
      title: 'Ticket Preview',
      component: <TicketPreviewComponent cart={cart} data={data} />,
    },
  };

  const { rid } = useParams();

  useEffect(() => {
    getData(rid);
  }, []);

  const getData = async (rid: string) => {
    setLoading(true);
    const { status, payload } = await getPaymentRequest(rid);

    if (status && payload) {
      setData(payload['request']);
    }
    setLoading(false);
  };

  if (loading && !data) return <Spin />;

  return (
    <Card>
      <Steps current={steps[step]} items={steps} size="small" />
      <div
        style={{
          margin: 30,
        }}
      >
        {stepsMap[step]?.component}
      </div>
    </Card>
  );
};

export default PaymentPreview;

const PaymentPreviewComponent = (props: any) => {
  const { data, cart } = props;

  return (
    <>
      <Card>
        <Descriptions
          column={1}
          labelStyle={{
            fontSize: '15px',
          }}
          title="Applicant Details"
        >
          <Descriptions.Item label="Name">
            <div>{data?.fullName}</div>
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            <div>{data?.email}</div>
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            <strong>{data?.createdAt}</strong>
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          column={1}
          labelStyle={{
            fontSize: '15px',
          }}
          title="Ticket Details"
        >
          <Descriptions.Item label="Title">
            <div>{cart?.title}</div>
          </Descriptions.Item>
          <Descriptions.Item label="Per Items">
            <div>{cart?.perItem}</div>
          </Descriptions.Item>
          <Descriptions.Item label="Amount">
            <strong>{cart?.total} Rs.</strong>
          </Descriptions.Item>
          {data?.paidAt && (
            <Descriptions.Item label="Paid At">
              <strong>{data?.paidAt}</strong>
            </Descriptions.Item>
          )}
        </Descriptions>
        {!(data?.ps === 2) && <PayNow data={data} />}
      </Card>
    </>
  );
};

const TicketPreviewComponent = (props: any) => {
  const { cart, data } = props;
  const { payment } = data;
  return (
    <>
      {data?.ps === 2 && (
        <Alert
          style={{
            marginBottom: '5px',
          }}
          type="success"
          showIcon
          message={<strong>Ticket Booked Successfully</strong>}
        />
      )}

      <Card>
        <Descriptions
          column={1}
          labelStyle={{
            fontSize: '15px',
          }}
          title="Applicant Details"
        >
          <Descriptions.Item label="Name">
            <div>{data?.fullName}</div>
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            <div>{data?.email}</div>
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            <strong>{data?.createdAt}</strong>
          </Descriptions.Item>
        </Descriptions>

        <Divider />
        <Descriptions
          column={1}
          labelStyle={{
            fontSize: '15px',
          }}
          title="Ticket Details"
        >
          <Descriptions.Item label="Title">
            <div>{cart?.title}</div>
          </Descriptions.Item>
          <Descriptions.Item label="Per Items">
            <div>{cart?.perItem}</div>
          </Descriptions.Item>
          <Descriptions.Item label="Amount">
            <strong>{cart?.total} Rs.</strong>
          </Descriptions.Item>
          <Descriptions.Item label="Payment Id">
            <strong>{payment?.pid}</strong>
          </Descriptions.Item>
          {data?.paidAt && (
            <Descriptions.Item label="Paid At">
              <strong>{data?.paidAt}</strong>
            </Descriptions.Item>
          )}
        </Descriptions>
        {!(data?.ps === 2) && <PayNow data={data} />}
      </Card>
    </>
  );
};
