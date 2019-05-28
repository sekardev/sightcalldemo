export interface Vehicle {
    avg_dealer_type_inv_cnt_mmy: number;
    binPrice: number;
    cost_to_market: number;
    current_dealer_supply: number;
    current_max_bid: number;
    driveTrain: string;
    exterior_color: string;
    interiorColor: string;
    inWL?: boolean;
    make: string;
    market_day_supply_mmy: number;
    mileage: number;
    model: string;
    originVehicleId: string;
    thumbnail: string;
    isAutoGrade: Boolean;
    showDB?: Boolean;
    trim: string;
    vehicle_grade: string;
    nwVehicleId: string;
    vin: string;
    year: number;
    vehicle_status: VehicleStatus;
    dealerBlock: DealerBlock;
}

export interface VehicleStatus {
    status_name: string;
}

export interface DealerBlock {
    buyNowPrice?: number;
    canBuy?: boolean;
    allowBuy?: boolean;
    canBid?: boolean;
    allowBid?: boolean;
    winningBidAmount?: number;
    startPrice?: number;
    shownPrice?: number;
}
