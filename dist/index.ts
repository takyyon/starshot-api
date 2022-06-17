import { Express, Request, Response } from 'express';
const express = require("express");
import {  getFrameworks, getRecommendation } from './lib/functions';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
  const repo = req.query.repo;
  const org = req.query.org;
  const branch = req.query.branch;
  const token = req.headers['github-token'];

  if(!org || typeof org !== 'string') {
    res.status(400);
    res.json('Invalid or missing parameters: Org');
  } else if(!repo || typeof repo !== 'string') {
    res.status(400);
    res.json('Invalid or missing parameters: Repo');
  } else if(typeof branch !== 'string'){
    res.status(400);
    res.json('Invalid or missing parameters: Branch');
  } else if(typeof token !== 'string'){
    res.status(400);
    res.json('Invalid header: Github-token');
  } else {
    // process.env.GITHUB_TOKEN = token;
    let frameworks: FrameworkMatch[] = [];
    let recommendation = 'webapp';
    try{
      frameworks = await getFrameworks(org, repo, branch, token);
      recommendation = await getRecommendation(frameworks, org, repo, branch, token);
    }catch(ex) {
      console.log(ex);
    }

    res.status(200);
    res.json({
      frameworks,
      recommendation
    });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});