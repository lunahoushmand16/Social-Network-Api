import { Schema, Types, model, type Document } from 'mongoose';
import { formatDate } from '../utils/dateFormat.js';

interface IReaction extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount?: number;
}

// 📄 Subdocument schema for Reaction (not a model)
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: (timestamp: Date) =>
      //   timestamp.toLocaleString('en-US', { timeZone: 'UTC' }),
      get: formatDate, // 🟢 This calls formatter on query
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false, // don't generate _id for subdoc
  }
);

// 🧠 Main Thought schema
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: (timestamp: Date) =>
      //   timestamp.toLocaleString('en-US', { timeZone: 'UTC' }),
      get: formatDate, // 🟢 This calls formatter on query
    },
    

    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// 🔢 Virtual: reactionCount
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
