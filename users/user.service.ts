import { Repository } from "typeorm";
import { AppDataSource } from "../_helpers/db";
import { Voter } from "./user.entity"; 

export class UserService {
    private voterRepository: Repository<Voter>;

    constructor() {
        this.voterRepository = AppDataSource.getRepository(Voter);
    }

    async getAllVoters(): Promise<Voter[]> {
        return await this.voterRepository.find();
    }

    async getVoterById(voterID: number): Promise<Voter | null> {
        return await this.voterRepository.findOne({ where: { voterID } });
    }

    async createVoter(voterData: Partial<Voter>): Promise<Voter> {
        const newVoter = this.voterRepository.create(voterData);
        return await this.voterRepository.save(newVoter);
    }

    async updateVoter(voterID: number, updateData: Partial<Voter>): Promise<Voter | null> {
        const voter = await this.voterRepository.findOne({ where: { voterID } });
        if (!voter) return null;

        Object.assign(voter, updateData);
        return await this.voterRepository.save(voter);
    }

    async deleteVoter(voterID: number): Promise<boolean> {
        const result = await this.voterRepository.delete(voterID);
        return result.affected !== 0;
    }
}
