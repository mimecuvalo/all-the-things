import express from 'express';
import fetch from 'node-fetch';

/**
 * Routes for letting the user login / logout.
 */

const router = express.Router();
router.get('/callback', async (req, res) => {
  try {
    const protocol = req.get('x-scheme') || req.protocol;
    const hostWithPort = req.get('host');
    const redirectUri = `${protocol}://${hostWithPort}/api/auth/callback`;
    const tokenResponse = await fetch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      body: JSON.stringify({
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
        redirect_uri: redirectUri,
        code: req.query.code,
        grant_type: 'authorization_code',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const tokenInfo = await tokenResponse.json();
    const accessToken = tokenInfo['access_token'];
    const userResponse = await fetch(
      `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`
    );
    const userInfo = await userResponse.json();

    // To the implementer, it's useful to put the model on the session, too.
    //const userDbInfo = await models.User.findOne({ where: { email: userInfo.email } });

    req.session.user = {
      oauth: userInfo,
      model: null, //userDbInfo,
    };

    if (req.query.next && !req.query.next.startsWith('/')) {
      throw new Error('i call shenanigans');
    }

    res.redirect(req.query.next || '/');
    return;
  } catch (ex) {
    console.error('Could not log user in.');
    res.redirect('/');
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('connect.sid');

  if (req.query.next && !req.query.next.startsWith('/')) {
    throw new Error('i call shenanigans');
  }

  req.session.destroy(() => {
    res.redirect(req.query.next || '/');
  });
});

export default router;
