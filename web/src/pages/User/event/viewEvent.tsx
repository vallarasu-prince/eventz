import { useQuery } from '@/common';
import TicketPreview from '@/pages/components/ticketPreview';
import { CalendarFilled } from '@ant-design/icons';
import { Avatar, Button, Card, Layout } from 'antd';
import Meta from 'antd/es/card/Meta';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { getPostById } from '../services';

const { Header, Footer, Sider, Content } = Layout;

export const data = {
  name: 'user 1',
  followers: 100,
  photoUrl:
    'https://res.cloudinary.com/dz878qel5/image/upload/v1683974959/dataeee/dataeee_logo_pf6bgq.jpg',
  title: 'data title 1',
  postUrl:
    'https://res.cloudinary.com/dz878qel5/image/upload/v1683974959/dataeee/dataeee_logo_pf6bgq.jpg',
  description:
    "Hey there, fellow developers! Sloan here. 🦥 I'm back with another edition of Sloan's Inbox, your go-to online column and discussion. I must say, your queries and enthusiasm never fail to make my day! So, thanks to a particularly compelling question from a newbie developer, I'm here once again, and counting on all of you to share your valuable insights and advice. Today's question is: I'm a newbie software developer trainee, and I'm eager to take on a real-life project. However, I'm feeling a bit lost and unsure of how to proceed. I want to challenge myself by building a project without relying on YouTube tutorials, but I'm struggling to figure out where to start. Are there any specific concepts or skills I should focus on before diving into the project? Any guidance or help would be greatly appreciated! So, what do you say, DEV members? Can you help a newbie out? Let's show our kindness and knowledge in full force!",
  commentsCount: 20,
  createdAt: '2021-05-01',
  tags: ['style', 'fashion', 'lifestyle'],
};

const ViewEvent = (props: any) => {
  const { query } = useQuery();
  const [data, setData] = useState<any>({});

  const postId = query?.id;

  const getData = async () => {
    const { payload } = await getPostById(postId);
    if (payload) {
      setData(payload);
    }
  };

  useEffect(() => {
    if (postId) {
      getData();
    }
  }, [postId]);

  return (
    <>
      <div
        style={{
          margin: 'auto',
          minWidth: '100%',
          maxWidth: '100%',
        }}
      >
        <Card
          cover={
            <img
              src={data?.postUrl}
              alt="post"
              style={{
                width: '100%',
                height: '350px',
                objectFit: "cover",
              }}
            />
          }
        >
          {/* <TagsPreview tags={data?.tags} /> */}

          <Title level={2}>{data?.title}</Title>

          <Meta
            avatar={<Avatar src={data?.createdBy?.photoUrl} />}
            title={data?.createdBy?.name}
            description={
              <>
                <Button type="text" icon={<CalendarFilled />}>
                  {data?.createdAt}
                </Button>
              </>
            }
            style={{ marginBottom: '10px' }}
          />

          <div
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>

          <Card>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <h3>Choose A Ticket</h3>
              <h1>Get Your Ticket Here</h1>
            </div>
            <TicketPreview data={data} />
          </Card>
        </Card>
      </div>
    </>
  );
};

export default ViewEvent;
