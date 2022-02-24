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

app.get('/things', (req, resp) => {
    let result = getAllthings();
    resp.json(result);
});

app.post('/things', (req, resp) => {
    let result = insertThing(req.params);
    resp.json(result);
});

app.get('/things/:idThing', (req, resp) => {
    let result = getThing(req.params.idThing);
    resp.json(result);
});

app.patch('/things/:idThing', (req, resp) => {
    let result = updateThing(req.params.idThing, req.params.name);
    resp.json(result);
});

app.delete('/tasks/:idThing', (req, resp) => {
    let result = deletethings(req.params.idThing);
    resp.json(result);
});

app.listen(PORT, () => {
    console.log('Server running at http://localhost:' + PORT + '/things');
});
