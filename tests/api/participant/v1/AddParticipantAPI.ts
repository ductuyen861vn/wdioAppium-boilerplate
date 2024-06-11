import { ParticipantApiService } from '../ParticipantApiService.js'; // Adjust the import path accordingly

export class AddParticipantAPI extends ParticipantApiService {
    public getEndpoint(): string {
        return '/api/register/studyA'; // Adjust the endpoint as needed
    }
}