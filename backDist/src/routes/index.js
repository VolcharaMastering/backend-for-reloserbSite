"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { validateUpdateUser, validateCreateUser, validateLogin } from '../middlewares/errorValidator';
const supportValidator_1 = require("../middlewares/supportValidator");
const notFound_1 = __importDefault(require("../errors/notFound"));
const supportRequests_1 = require("../controllers/supportRequests");
const projects_1 = require("../controllers/projects");
// import auth from '../middlewares/auth';
const router = express_1.default.Router();
// import { updateUser, aboutMe, login, createUser, getUsers } from '../controllers/users';
// router.post('/signin/', validateLogin, login);
// router.post('/signup/', validateCreateUser, createUser);
// router.get('/users/', getUsers);
// router.get('/users/me', auth, aboutMe);
// router.patch('/users/me', auth, validateUpdateUser, updateUser);
router.get("/addprojectorgeitnow/", projects_1.getProjects);
router.post("/addprojectorgeitnow/", projects_1.addProjects);
router.get("/requests/", supportRequests_1.getSupportRequests);
router.post("/requests/", supportValidator_1.validateCreateRequest, supportRequests_1.sendMail, supportRequests_1.addSupportRequests);
router.all("*", (req, res, next) => {
    next((0, notFound_1.default)("Page not found"));
});
exports.default = router;
