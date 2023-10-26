import { ProTable } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getTicketsList } from './services';

const TicketsList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { status, payload } = await getTicketsList();

    if (status && payload) {
      setData(payload['list']);
    }
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'id',
      valueType: 'indexBorder',
      render: (text: any, record: any, index: any) => index + 1,
    },

    {
      title: 'Name',
      dataIndex: 'fullName',
      valueType: 'text',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: 'Amount',
      render: (text: any, record: any) => <>{record?.cart?.total} Rs.</>,
    },
    {
      title: 'Initiated At',
      render: (text: any, record: any) => <>{record?.createdAt}</>,
    },
    {
      title: 'Paid At',
      render: (text: any, record: any) => <>{record?.paidAt}</>,
    },
    {
      title: 'Status',
      render: (text: any, record: any) => (
        <>{record?.ps === 2 ? <Tag color="green">Paid</Tag> : <Tag color="red">Not Paid</Tag>}</>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      valueType: 'option',
      render: (text: any, record: any) => (
        <>
          <Button type="link" href={`/request/payment/${record['_id']}`} target="_blank">
            View
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        toolBarRender={false}
        search={false}
      />
    </>
  );
};

export default TicketsList;
