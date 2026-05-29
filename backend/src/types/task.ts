export type Quadrant =
  | 'urgent-important'
  | 'not-urgent-important'
  | 'urgent-not-important'
  | 'not-urgent-not-important'
  | null;

export interface Task {
  _id?: string;
  _rev?: string;
  type: 'task';
  title: string;
  quadrant: Quadrant;
  createdAt: string;
}
