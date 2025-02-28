import { Request, Response, Router } from "typeorm";
import { UserService } from "..//users.service";

const userService = new UserService();
const router = Router();

router.get("/voters", async (req: Request, res: Response) => {
    try {
        const voters = await userService.getAllVoters();
        res.json(voters);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/voters/:id", async (req: Request, res: Response) => {
    try {
        const voter = await userService.getVoterById(parseInt(req.params.id));
        if (!voter) return res.status(404).json({ message: "Voter not found" });

        res.json(voter);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/voters", async (req: Request, res: Response) => {
    try {
        const newVoter = await userService.createVoter(req.body);
        res.status(201).json(newVoter);
    } catch (error) {
        res.status(500).json({ error: "Failed to create voter" });
    }
});

router.put("/voters/:id", async (req: Request, res: Response) => {
    try {
        const updatedVoter = await userService.updateVoter(parseInt(req.params.id), req.body);
        if (!updatedVoter) return res.status(404).json({ message: "Voter not found" });

        res.json(updatedVoter);
    } catch (error) {
        res.status(500).json({ error: "Failed to update voter" });
    }
});

router.delete("/voters/:id", async (req: Request, res: Response) => {
    try {
        const deleted = await userService.deleteVoter(parseInt(req.params.id));
        if (!deleted) return res.status(404).json({ message: "Voter not found" });

        res.json({ message: "Voter deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete voter" });
    }
});

export default router;
