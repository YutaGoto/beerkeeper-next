import { Event } from "./event";

export type User = {
  id?: number;
  name: string;
  email: string;
};

export type UserProfile = {
  id: number;
  email: string;
  name: string;
  events: Event[];
  organizingEvents: Event[];
};
