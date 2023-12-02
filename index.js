const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { WebSocketServer } = require('ws');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;
server = app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

// JSON body parsing using built-in middleware
app.use(express.json());

app.use(cookieParser());

// Serve up the frontend static content hosting
app.use(express.static('public'));

app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.email, req.body.password);

        // Set the cookie
        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
    const user = await DB.getUser(req.params.email);
    if (user) {
        const token = req?.cookies.token;
        res.send({ email: user.email, authenticated: token === user.token });
        return;
    }
    res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

//getRecipes
apiRouter.get('/recipes/:userName', async (_req, res) => {
    const recipe = await DB.getRecipes(_req.params.userName);
    res.send(recipe);
});

//Submit Recipes
apiRouter.post('/recipe', (req, res) => {
    DB.addRecipe(req.body)
    res.status(200);
});

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });
});

let connections = [];

wss.on('connection', (ws) => {
    const connection = { id: connections.length + 1, alive: true, ws: ws };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on('message', function message(data) {
        connections.forEach((c) => {
            if (c.id !== connection.id) {
                c.ws.send(data);
            }
        });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
        connections.findIndex((o, i) => {
            if (o.id === connection.id) {
                connections.splice(i, 1);
                return true;
            }
        });
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
        connection.alive = true;
    });
});

setInterval(() => {
    connections.forEach((c) => {
        // Kill any connection that didn't respond to the ping last time
        if (!c.alive) {
            c.ws.terminate();
        } else {
            c.alive = false;
            c.ws.ping();
        }
    });
}, 10000);