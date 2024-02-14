import mongoose from "mongoose";
import {TrackHistory, TrackHistoryModel} from "../types";

const Schema = mongoose.Schema;

const trackHistorySchema = new Schema<TrackHistory, TrackHistoryModel>({
  user: {
    type: String,
    required: true,
  },
  track: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const TrackHistory = mongoose.model<TrackHistory, TrackHistoryModel>('TrackHistory', trackHistorySchema);

export default TrackHistory;