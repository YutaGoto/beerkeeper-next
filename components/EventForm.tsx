import { Form, Input, InputNumber, Button } from "antd";
import { NextComponentType, NextPageContext } from "next";
import dayjs from "dayjs";

import { Event } from "../types";
import { DatePicker } from "./antd";

const { RangePicker } = DatePicker;

interface EventFormProps {
  event?: Event;
  onFinish: (values: any) => void;
}

const EventForm: NextComponentType<NextPageContext, null, EventFormProps> = ({
  event,
  onFinish,
}) => {
  return (
    <Form onFinish={onFinish}>
      <Form.Item name="name" label="name" rules={[{ required: true }]}>
        <Input defaultValue={event?.name} />
      </Form.Item>
      <Form.Item name="budget" label="budget" rules={[{ required: true }]}>
        <Input defaultValue={event?.budget} />
      </Form.Item>
      <Form.Item name="date" label="date" rules={[{ required: true }]}>
        <RangePicker
          showTime
          defaultValue={[dayjs(event?.start_at), dayjs(event?.end_at)]}
        />
      </Form.Item>
      <Form.Item
        name="max_size"
        label="max_size"
        rules={[{ required: true, type: "number", min: 1, max: 10000 }]}
      >
        <InputNumber defaultValue={event?.max_size} />
      </Form.Item>
      <Form.Item name="location" label="location" rules={[{ required: true }]}>
        <Input defaultValue={event?.location} />
      </Form.Item>
      <Form.Item
        name="description"
        label="description"
        rules={[{ required: true }]}
      >
        <Input.TextArea defaultValue={event?.description} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
