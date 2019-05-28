import { Recommendation } from './recommendation';

export interface Response {
    data: {
        getRecommendations: Recommendation[];
    }
};
