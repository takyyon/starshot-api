"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const src_1 = require("./src");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = req.query['repo'];
    const org = req.query['org'];
    const branch = req.query['branch'];
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
        const frameworks = yield (0, src_1.getFrameworks)(org, repo, branch, token);
        res.send(frameworks);
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
