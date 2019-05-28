import { Injectable } from '@angular/core';
//import { API } from 'aws-amplify';
import { environment } from '../../environments/environment';
import { mockFormattedDrivinResponse } from '../services/drivinRecomFormattedResponse';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class RecommendationsService {
	public userId: string;
	constructor() {
	}

	async getRecommendations(atc_org_id: string): Promise<any> {
		const org_id = { atc_org_id };

		
			return mockFormattedDrivinResponse;
		
	}

	async getRecommendationStatus(atc_org_id: string, vehicle_id: string): Promise<any> {

		const originVehicleIdData = { atc_org_id, vehicle_id };
		
			return mockFormattedDrivinResponse[1].vehicle.vehicle_status;
		
	}

	async getNewRecommendation(atc_org_id: string, vehicle_id: string): Promise<any> {

		const originVehicleIdData = { atc_org_id, vehicle_id };
		
			return mockFormattedDrivinResponse[1];
		
	}
}
/* istanbul ignore next */
