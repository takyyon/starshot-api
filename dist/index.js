"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const functions_1 = require("./lib/functions");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', async (req, res) => {
    const repo = req.query.repo;
    const org = req.query.org;
    const branch = req.query.branch;
    const token = req.headers['github-token'];
    if (!org || typeof org !== 'string') {
        res.status(400);
        res.render('Invalid parameters: Org');
    }
    else if (!repo || typeof repo !== 'string') {
        res.status(400);
        res.render('Invalid parameters: Repo');
    }
    else if (typeof branch !== 'string') {
        res.status(400);
        res.render('Invalid parameters: Branch');
    }
    else if (typeof token !== 'string') {
        res.status(400);
        res.render('Invalid header: Github-token');
    }
    else {
        const frameworks = await (0, functions_1.getFrameworks)(org, repo, branch, token);
        res.send(frameworks);
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=index.js.map