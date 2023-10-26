import { Button, Card, Col, Row, Tag } from 'antd';
import { initiateTicket } from '../payment/services';

export const TicketItem = (props: any) => {
  const { data, idx, eventId } = props;

  const onInitiateTicket = async (values: any) => {
    const { status, payload } = await initiateTicket({ ...values, eventId });

    if (status && payload?.redirectUrl) {
      window.location.href = payload?.redirectUrl;
    }
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          borderRadius: '12px',
          // backgroundImage: 'linear-gradient(to left, #CB218E 10%, #eff1fd 70%)',
        }}
      >
        <div
          style={{
            width: '100%',

            background: '#eff1fd',
            borderRadius: '12px',
            textAlign: 'center',
            color: 'black',
            padding: 20,
          }}
        >
          <div>
            <Tag color="yellow">{data.title}</Tag>

            <h1>
              <strong>{data?.price} Rs.</strong>
            </h1>
          </div>
        </div>

        <div style={{ padding: 40 ,
            // background:"white",
        
        }}>
          <Button
            style={{
              width: '100%',
              margin: 10,
              fontSize: 15,
              fontWeight: 'bold',
              color: 'white',
              backgroundImage: 'linear-gradient(to left, #CB218E 10%, #6617CB 70%)',
            }}
            key={idx}
            onClick={() => onInitiateTicket(data)}
          >
            Get Ticket
          </Button>
        </div>
      </div>
    </>
  );
};

const TicketPreview = (props: any) => {
  const { data } = props;

  return (
    <>
      <Row gutter={[16, 16]}>
        {data?.tickets?.map((item, idx) => {
          return (
            <Col key={idx} sm={24} md={8}>
              <TicketItem eventId={data?._id} data={item} idx={idx} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default TicketPreview;
