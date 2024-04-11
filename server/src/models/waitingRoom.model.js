import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  isOnline: {
    type: Boolean,
  },
});

const waitingRoomSchema = new mongoose.Schema(
  {
    waitingRoomID: {
      type: Number,
      required: true,
    },
    participants: { type: [participantSchema], default: [] },
    onlineParticipants: [
       {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "User",
        },
    ],
  },
  {
    timestamps: true,
  }
);

export const WaitingRoom = mongoose.model("WaitingRoom", waitingRoomSchema);
