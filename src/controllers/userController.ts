import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

/**
 * GET all users with their populated friends and thoughts
 */
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().populate('friends').populate('thoughts');
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET a single user by ID with their friends and thoughts populated
 */
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('friends')
      .populate('thoughts');

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST a new user using request body data
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PUT update an existing user by ID
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      runValidators: true,
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'No user with this ID' });
    }

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE a user by ID and also delete their associated thoughts
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'No user with this ID' });
    }

    // Deletes all thoughts that belong to this user
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST to add a friend to a user's friend list
 */
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } }, // avoids duplicates
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE a friend from a user's friend list
 */
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } }, // removes friend by ID
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};