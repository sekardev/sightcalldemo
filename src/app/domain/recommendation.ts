import { Vehicle } from './vehicle';
import { Badge } from './badge';


export interface Recommendation {
    atc_org_id: string;
    vehicle: Vehicle;
    badges: Badge[];
}
