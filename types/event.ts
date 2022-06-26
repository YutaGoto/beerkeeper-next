import { Participation } from "./participation";
import { User } from "./user";

export type Event = {
  id?: number;
  name: string;
  location: string;
  maxSize: number;
  budget: string;
  description: string;
  startAt: string;
  endAt: string;
  organizer: User;
  participations: Array<Participation>;
};

export type EventFormType = Pick<
  Event,
  "name" | "location" | "budget" | "description"
> & {
  max_size: number;
  start_at: string;
  end_at: string;
};
