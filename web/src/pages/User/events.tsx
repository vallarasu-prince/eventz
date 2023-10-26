import { CalendarFilled } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Card, Drawer } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import AddBlogForm from './event/addEvent';
import { getAllPosts } from './services';

export const PostItem = (props: any) => {
  const { _id, postUrl, title, createdAt, createdBy } = props;

  return (
    <>
      <Card
        hoverable
        onClick={() => {
          window.location.href = `/events/view?id=${_id}`;
        }}
        cover={
          <img
            src={postUrl}
            alt="post"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        }
        style={{
          marginBottom: '30px',
          minWidth: '500px',
          width: '100%',
          maxWidth: '500px',
          margin: 10,
        }}
      >
        <h1>{title}</h1>

        <Meta
          avatar={<Avatar src={createdBy?.photoUrl} />}
          title={createdBy?.name}
          description={
            <Button type="text" icon={<CalendarFilled />}>
              {createdAt}
            </Button>
          }
        />
        {/* <TagsPreview tags={props?.tags} /> */}
      </Card>
    </>
  );
};

const Events = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    const { payload } = await getAllPosts();

    if (payload) {
      setData(payload);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const onSaved = () => {
    getData();
    setVisible(false);
  };

  return (
    <div
      style={
        {
          // backgroundImage: 'linear-gradient(to left, #000000 10%, #130F40 70%)',
        }
      }
    >
      <PageContainer
        header={{
          title: 'Events',
        }}
        extra={[
          <Button
            key="1"
            type="primary"
            style={{
              backgroundColor: '#ff4d4f',
            }}
            onClick={() => {
              setVisible(true);
            }}
          >
            Create Event
          </Button>,
        ]}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {data?.map((item: any, index) => {
            return <PostItem key={index} {...item} />;
          })}
        </div>
      </PageContainer>

      <Drawer
        onClose={() => {
          setVisible(false);
        }}
        open={visible}
        title="Create Event"
        width={900}
      >
        <AddBlogForm onSaved={onSaved} />
      </Drawer>
    </div>
  );
};

export default Events;
