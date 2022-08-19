import { Router } from "express";
import {signup, signin, recover, change} from "../../controllers/users/authControllers.js";
const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/recover", recover);
router.post("/change", change);

export default router;