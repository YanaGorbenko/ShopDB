import { TWENTY_MINETES, TWO_DAYS } from '../constants/index.js';
import { Session } from '../db/models/SessionModel.js';
import { User } from '../db/models/userModel.js';
import { randomBytes } from 'node:crypto';

export const findUserByEmail = email => User.findOne({ email });

export const createUser = userData => User.create(userData);

export const createSession = userId => {
  const session = {
    userId,
    accessToken: randomBytes(30).toString('base64'),
    accessTokenExpireAt: Date.now() + TWENTY_MINETES,
    refreshToken: randomBytes(30).toString('base64'),
    refreshTokenExpireAt: Date.now() + TWO_DAYS,
  };

  return Session.create(session);
};

export const deleteSessionByUserId = userId => Session.deleteOne({userId});

export const deleteSessionById = sessionId => Session.deleteOne({ _id: sessionId });

export const findSessionById = id => Session.findById(id);

export const findUserById = id => User.findById(id);