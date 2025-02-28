import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Vote } from "../entities/vote.entity";

export class VotingService {
    private voteRepository: Repository<Vote>;

    constructor() {
        this.voteRepository = AppDataSource.getRepository(Vote);
    }

    async getAllVotes(): Promise<Vote[]> {
        return await this.voteRepository.find();
    }

    async getVoteById(voteID: number): Promise<Vote | null> {
        return await this.voteRepository.findOne({ where: { voteID } });
    }

    async castVote(voteData: Partial<Vote>): Promise<Vote> {
        const newVote = this.voteRepository.create(voteData);
        return await this.voteRepository.save(newVote);
    }

    async updateVote(voteID: number, updateData: Partial<Vote>): Promise<Vote | null> {
        const vote = await this.voteRepository.findOne({ where: { voteID } });
        if (!vote) return null;

        Object.assign(vote, updateData);
        return await this.voteRepository.save(vote);
    }

    async deleteVote(voteID: number): Promise<boolean> {
        const result = await this.voteRepository.delete(voteID);
        return result.affected !== 0;
    }
}
