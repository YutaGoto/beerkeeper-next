import { Participation } from "./participation"
import { User } from "./user"

export type Event = {
  id?: number,
  name: string,
  location: string,
  max_size: number,
  budget: string,
  description: string,
  start_at: string,
  end_at: string,
  organizer: User,
  participations: Array<Participation>
}
