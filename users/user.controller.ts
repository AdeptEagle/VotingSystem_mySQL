import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { VotingService } from "../services/voting.service";

const userService = new UserService();
const votingService = new VotingService();
const router = Router();

/** 
 * Get all users (voters)
 */
router.get("/users", async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/** 
 * Get a specific user by ID
 */
router.get("/users/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: number = parseInt(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const user = await userService.getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/** 
 * Register a new voter (user)
 */
router.post("/users", async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to register user" });
    }
});

/** 
 * Update user details 
 */
router.put("/users/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: number = parseInt(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const updatedUser = await userService.updateUser(userId, req.body);
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update user" });
    }
});

/** 
 * Delete a user (Remove voter)
 */
router.delete("/users/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: number = parseInt(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const deleted: boolean = await userService.deleteUser(userId);
        if (!deleted) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete user" });
    }
});

/** 
 * Cast a vote 
 */
router.post("/users/:id/vote", async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: number = parseInt(req.params.id);
        const candidateId: number = parseInt(req.body.candidateId);

        if (isNaN(userId) || isNaN(candidateId)) {
            res.status(400).json({ message: "Invalid user or candidate ID" });
            return;
        }

        const vote = await votingService.castVote(userId, candidateId);
        if (!vote) {
            res.status(400).json({ message: "User has already voted or invalid request" });
            return;
        }

        res.status(201).json({ message: "Vote cast successfully", vote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to cast vote" });
    }
});

/** 
 * Get voting status of a user
 */
router.get("/users/:id/vote", async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: number = parseInt(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const voteStatus = await votingService.getUserVoteStatus(userId);
        res.json({ voted: !!voteStatus, voteStatus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve vote status" });
    }
});

export default router;
