import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

/**
 * GET all thoughts in the database
 */
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET a single thought by its ID
 */
export const getSingleThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
  return; // ✅ added to satisfy TypeScript
};

/**
 * POST a new thought and add its ID to the associated user's `thoughts` array
 */
export const createThought = async (req: Request, res: Response) => {
  try {
    const { thoughtText, username, userId } = req.body;

    // Create the thought
    const thought = await Thought.create({ thoughtText, username });

    // Push thought ID to the user's `thoughts` field
    await User.findByIdAndUpdate(userId, {
      $push: { thoughts: thought._id },
    });

    res.status(201).json(thought);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PUT update a thought by its ID
 * ✅ FIXED: added fallback return for not-found case to satisfy TypeScript
 */
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );

    // If no thought found, return 404
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }

    // Return updated thought
    res.json(thought);
  } catch (err: any) {
    // Return 500 on error
    res.status(500).json({ message: err.message });
  }
  return;
};

/**
 * DELETE a thought and remove it from the user's thoughts array
 */
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }

    // Remove the thought from the user's thought list
    await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: thought._id } }
    );

    res.json({ message: 'Thought deleted!' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
  return;
};

/**
 * POST a new reaction to a thought
 */
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }

    res.json(thought);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
  return;
};

/**
 * DELETE a reaction from a thought by reaction ID
 */
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $pull: { reactions: { reactionId: req.params.reactionId } },
      },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }

    res.json(thought);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
  return;
};