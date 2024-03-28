import express, { Request, Response, NextFunction } from "express";
// import { validateUpdateUser, validateCreateUser, validateLogin } from '../middlewares/errorValidator';
import { validateCreateRequest } from "../middlewares/supportValidator";
import NotFound from "../errors/notFound";
import {
  addSupportRequests,
  getSupportRequests,
} from "../controllers/supportRequests";
import { addProjects, getProjects } from "../controllers/projects";
import sendMail from '../middlewares/sendMailRequest';

const router = express.Router();
// import { updateUser, aboutMe, login, createUser, getUsers } from '../controllers/users';

// router.post('/signin/', validateLogin, login);
// router.post('/signup/', validateCreateUser, createUser);

// router.get('/users/', getUsers);
// router.get('/users/me', auth, aboutMe);
// router.patch('/users/me', auth, validateUpdateUser, updateUser);
router.get("/addprojectorgeitnow/", getProjects);
router.post("/addprojectorgeitnow/", addProjects);
router.get("/requests/", getSupportRequests);
router.post("/requests/", validateCreateRequest, sendMail, addSupportRequests);
// router.post("/requests/", sendMail, addSupportRequests);

router.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(NotFound("Page not found"));
});

export default router;
