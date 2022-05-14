import { NextComponentType, NextPageContext } from "next";
import { Event, EventFormType } from "../types";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface EventFormProps {
  event?: Event;
  onFinish: (values: any) => void;
  register: UseFormRegister<EventFormType>;
  submitBtnText: string;
}

const EventForm: NextComponentType<NextPageContext, null, EventFormProps> = ({
  event,
  onFinish,
  register,
  submitBtnText,
}) => {
  return (
    <form onSubmit={onFinish}>
      <FormControl>
        <FormLabel htmlFor="name">イベント名</FormLabel>
        <Input
          type="text"
          {...register("name", { required: true, value: event?.name })}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="description">説明</FormLabel>
        <Textarea
          {...register("description", {
            required: true,
            value: event?.description,
          })}
        />
      </FormControl>

      <SimpleGrid columns={2} spacing={4}>
        <FormControl>
          <FormLabel htmlFor="start_at">開始日時</FormLabel>
          <Input
            type="datetime-local"
            {...register("start_at", {
              required: true,
              value: event?.start_at,
            })}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="end_at">終了日時</FormLabel>
          <Input
            type="datetime-local"
            {...register("end_at", { required: true, value: event?.end_at })}
          />
        </FormControl>
      </SimpleGrid>

      <FormControl>
        <FormLabel htmlFor="max_size">最大人数</FormLabel>
        <Input
          type="number"
          {...register("max_size", { required: true, value: event?.max_size })}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="location">場所</FormLabel>
        <Input
          type="text"
          {...register("location", { required: true, value: event?.location })}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="budget">料金</FormLabel>
        <Input
          type="number"
          {...register("budget", { required: true, value: event?.budget })}
        />
      </FormControl>

      <Button variant="solid" colorScheme="blue" type="submit" mt={1}>
        {submitBtnText}
      </Button>
    </form>
  );
};

export default EventForm;
