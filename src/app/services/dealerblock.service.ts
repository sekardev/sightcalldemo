import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class DealerBlockService {

	constructor() {
	}

	async getDBVehicleInfo(userId: string, vehicleId: string): Promise<any> {
		const vars = {
			userId: userId,
			vehicleId: vehicleId
		};

		if (environment.production) {
			try {
				//const response: any = await API.graphql({ query: GetDealerBlockDataQuery, variables: vars });
				return null; //response.data.getDealerBlockData;
			} catch (e) {
				return;
			} finally { }
		} else {
			return null;//new MockDealerBlockService().getDBVehicleInfo(userId, vehicleId);
		}
	}
}
