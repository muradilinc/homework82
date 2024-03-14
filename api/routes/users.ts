import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';
import crypto from 'crypto';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);
usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    return res.send({ message: 'ok!', user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }

    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(422).send({ error: 'User not found!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'password is wrong!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Email and password are correct!', user });
  } catch (error) {
    return next(error);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Google login is wrong!' });
    }

    const email = payload['email'];
    const id = payload['sub'];
    const displayName = payload['name'];
    const avatar = payload['picture'];

    if (!email) {
      return res.status(400).send({ error: 'Email is not present!' });
    }

    let user = await User.findOne({ googleID: id });
    if (!user) {
      user = new User({
        email: email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
        avatar,
      });
    }

    user.generateToken();
    await user.save();
    return res.send({ message: 'Login with google successful!', user });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get('/github', async (req, res, next) => {
  try {
    const response = await fetch(
      process.env['GITHUB_ACCESS_TOKEN_LINK'] +
        '?client_id=' +
        process.env['GITHUB_CLIENT_ID'] +
        '&client_secret=' +
        process.env['GITHUB_CLIENT_SECRET'] +
        '&code=' +
        req.query.code,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      },
    );
    const data = await response.json();
    const token = data.access_token;

    if (!token) {
      return res.status(400).send({ error: 'Github login is wrong!' });
    }

    const getUserGithub = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    const userGithub = await getUserGithub.json();

    let user = await User.findOne({ githubID: userGithub.id });
    if (!user) {
      user = new User({
        email: data.email,
        password: crypto.randomUUID(),
        githubID: data.id,
        displayName: data.name,
        avatar: data.avatar_url,
      });
    }
    user.generateToken();
    await user.save();
    return res.send({ message: 'Login with github successful!', user });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    const successMessage = { message: 'Success!' };

    if (!headerValue) {
      return res.send({ ...successMessage, stage: 'No header' });
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.send({ ...successMessage, stage: 'No token' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send({ ...successMessage, stage: 'No user' });
    }

    user.generateToken();
    await user.save();

    return res.send({ ...successMessage, stage: 'Success' });
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
