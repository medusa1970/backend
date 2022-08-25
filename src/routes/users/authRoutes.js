import { Router } from "express";
import {users, signup, signin, updateUser, deleteUser} from "../../controllers/users/authControllers.js";
const router = Router();

router.get("/", users);
router.post("/signup", signup);
router.post("/signin", signin);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;