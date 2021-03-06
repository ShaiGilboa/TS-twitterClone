import * as path from "path";
import express from 'express';
import profileRouter from "./routes/profile";
import feedRouter from "./routes/feed";
import tweetRouter from "./routes/tweet";

const PORT = process.env.PORT || 4000;

const app : express.Application = express()

app.use(express.json());

app.use(profileRouter);
app.use(feedRouter);
app.use(tweetRouter);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const server = app.listen(PORT, function() {
  console.info('🌍 Listening on port ' + PORT);
});