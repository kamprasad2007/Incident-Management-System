import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, Card } from "antd";
import moment from "moment";

const { Option } = Select;

const IncidentCard = ({
  isEdit = false,
  initialValues = {},
  onSubmit,
  onCancel,
  state,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    const date = moment(initialValues.date);
    form.setFieldsValue({
      ...initialValues,
      date,
    });
  }, [form, initialValues]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 10 },
  };

  return (
    <Card style={{ width: 800 }}>
      <Form {...layout} name="createIncident" form={form} onFinish={onSubmit}>
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please input Date!" }]}
        >
          <DatePicker disabled={isEdit} />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <Input disabled={isEdit} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <Input.TextArea disabled={isEdit} />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please input type!" }]}
        >
          <Select style={{ width: 120 }} allowClear disabled={isEdit}>
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Reported By" name="reportedBy">
          <Input disabled={true} />
        </Form.Item>

        {isEdit && (
          <Form.Item label="Assign to" name="assignedTo">
            <Select style={{ width: 120 }} allowClear>
              {state.users.map((user) => (
                <Option key={user.name} value={user.name}>
                  {user.name}{" "}
                  {user.role === "admin" && <strong>&#9812;</strong>}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            {isEdit ? "UPDATE" : "CREATE"}
          </Button>

          <Button onClick={onCancel}>CANCEL</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default IncidentCard;
