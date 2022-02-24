import express from 'express';
import morgan from 'morgan';
import {
    getAllthings,
    insertThing,
    getThing,
    updateThing,
    deletethings,
} from './services/things-crud.js';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use((req, resp, next) => {
    resp.port = PORT;
    next();
});

app.get('/things', async (req, resp) => {
    let result = await getAllthings();
    resp.json(result);
});

app.post('/things', async (req, resp) => {
    let result = await insertThing(req.body);
    resp.json(result);
});

app.get('/things/:id', async (req, resp) => {
    let result = await getThing(req.params.id);
    resp.json(result);
});

app.patch('/things/:id', async (req, resp) => {
    let result = await updateThing(req.params.id, req.body);
    resp.json(result);
});

app.delete('/things/:id', async (req, resp) => {
    let result = await deletethings(req.params.id);
    resp.json(result);
});

app.listen(PORT, () => {
    console.log('Server running at http://localhost:' + PORT + '/things');
});
