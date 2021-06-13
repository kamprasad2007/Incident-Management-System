import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";

const { TextArea } = Input;

const CommentEditor = ({ onSubmit, value, initialValues = {} }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <Form name="addComment" onFinish={onSubmit} form={form}>
      <Form.Item name="comment">
        <TextArea rows={4} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentEditor;
