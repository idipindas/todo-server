"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const morgan_1 = __importDefault(require("morgan"));
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/todos', todo_routes_1.default);
app.get('/', (_req, res) => {
    res.send('Hello from Node + TypeScript!');
});
// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Running at http://0.0.0.0:${PORT}`);
});
