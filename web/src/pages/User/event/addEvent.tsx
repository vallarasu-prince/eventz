import { formLayout } from '@/common';
import FileUpload from '@/pages/file/fileUpload';
import { Button, Card, Form, Input, InputNumber } from 'antd';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { postData } from '../services';

const AddEventForm = (props: any) => {
  const { _id = 'new' } = props;

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    values.content = draftToHtml(values?.content);

    const { payload } = await postData({ _id: _id, ...values });
    if (payload) {
      props?.onSaved(payload);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} {...formLayout}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the blog title' }]}
      >
        <Input placeholder="Enter the blog title" />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Please enter the blog content' }]}
      >
        <Editor
          wrapperStyle={{
            border: '1px solid #f1f1f1',
            minHeight: '400px',
            maxHeight: '400px',
            overflowY: 'scroll',
            padding: '0 5px',
          }}
        />
      </Form.Item>

      <FileUpload />

      <Form.Item required label="Tickets">
        <Form.List name="tickets">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Card key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, 'title']}
                    fieldKey={[fieldKey, 'title']}
                    rules={[{ required: true, message: 'Please enter ticket title' }]}
                  >
                    <Input placeholder="Enter ticket title" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'seats']}
                    fieldKey={[fieldKey, 'seats']}
                    rules={[{ required: true, message: 'Please enter the number of seats' }]}
                  >
                    <InputNumber placeholder="Enter the number of seats" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'price']}
                    fieldKey={[fieldKey, 'price']}
                    rules={[{ required: true, message: 'Please enter the ticket price' }]}
                  >
                    <InputNumber placeholder="Enter the ticket price" />
                  </Form.Item>
                  <Button type="dashed" onClick={() => remove(name)}>
                    Remove Ticket
                  </Button>
                </Card>
              ))}
              <Button
                style={{
                  marginTop: '10px',
                }}
                type="dashed"
                onClick={() => add()}
              >
                Add Ticket
              </Button>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item
        label="Tags"
        name="tags"
        rules={[{ required: true, message: 'Please enter the blog tags' }]}
      >
        <Input placeholder="Enter the blog tags" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {' '}
          Post{' '}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEventForm;
