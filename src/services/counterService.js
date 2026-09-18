import { Counter } from '../db/models/CounterModel.js';

export async function getNextOrderNumber() {
  const counter = await Counter.findByIdAndUpdate(
    'order',
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );

  return `ORD-${counter.seq}`;
}
