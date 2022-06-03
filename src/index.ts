import { Express, Request, Response } from 'express';
const express = require("express");
import {  getFrameworks } from './lib/functions';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
  const repo = req.query.repo;
  const org = req.query.org;
  const branch = req.query.branch;
  const token = req.headers['github-token'];

  if(!org || typeof org !== 'string') {
    res.status(400);
    res.render('Invalid parameters: Org');
  } else if(!repo || typeof repo !== 'string') {
    res.status(400);
    res.render('Invalid parameters: Repo');
  } else if(typeof branch !== 'string'){
    res.status(400);
    res.render('Invalid parameters: Branch');
  } else if(typeof token !== 'string'){
    res.status(400);
    res.render('Invalid header: Github-token');
  } else {
    const frameworks = await getFrameworks(org, repo, branch, token);
    res.send(frameworks);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});