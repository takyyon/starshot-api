import { Express, Request, Response } from 'express';
const express = require("express");
import {  getFrameworks, getRecommendation } from './lib/functions';

const app: Express = express();
const port = process.env.PORT || 8080;

app.get('/', async (req: Request, res: Response) => {
  const repo = req.query.repo;
  const org = req.query.org;
  let branch = req.query.branch;
  const token = req.headers['github-token'];
  process.env.GITHUB_TOKEN = '';
  process.env.__GITHUB_PROJECT__ = '';

  if(!org || typeof org !== 'string') {
    res.status(400);
    res.json({
      message: 'Invalid or missing parameters: Org'
    });
  } else if(!repo || typeof repo !== 'string') {
    res.status(400);
    res.json({
      message: 'Invalid or missing parameters: Repo'
    });
  } else {
    
    if(!!token && typeof token === 'string') {
      process.env.GITHUB_TOKEN = token;
    } else {
      console.warn('Invalid token header');
    }

    if(typeof branch !== 'string') {
      branch = '';
      console.warn('Invalid branch parameter');
    }

    try{
      await runAndReturnAnalysis(res, org, repo, branch);
    } catch(ex) {
      res.status(500);
      res.json(JSON.parse(JSON.stringify(ex)));
    }
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

const runAndReturnAnalysis = (res: Response, org: string, repo: string, branch?: string) => {
  return getFrameworks(org, repo, branch).then(frameworks => {
    getRecommendation(frameworks, org, repo, branch).then(recommendation => {
      res.status(200);
      res.json({
        frameworks,
        recommendation
      });
    }).catch(ex1 => {
      console.log('Error on Recommendation: ' + ex1);
      res.status(500);
      res.json(ex1);
    }).catch(ex2 => {
      console.log('Error on framework: ' + ex2);
      res.status(500);
      res.json(ex2);
    });
  });
};