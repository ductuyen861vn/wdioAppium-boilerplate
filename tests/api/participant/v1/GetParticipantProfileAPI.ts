import { ParticipantApiService } from '../ParticipantApiService.js'; // Adjust the import path accordingly

export class GetParticipantProfileAPI extends ParticipantApiService {
    public getEndpoint(): string {
        return '/api/profile/userA'; // Adjust the endpoint as needed
    }
}