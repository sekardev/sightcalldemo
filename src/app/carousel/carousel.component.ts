import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style,animate } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';
import {Badge} from '../domain/badge';
import {Recommendation} from '../domain/recommendation';
import {Response} from '../domain/response';
import {Vehicle} from '../domain/vehicle';
import {RecommendationsService} from '../services/recommendations.service'
import { DealerBlockService } from 'src/app/services/dealerblock.service';

type Orientation = ( "prev" | "next" | "void" );
@Component({
  selector: 'app-carousel',
  animations: [
    trigger(
        "friendAnimation",
        [
            transition(
                "void => prev", // ---> Entering --->
                [
             
                    style({
                        left: -300,
                        opacity: 0.0,
                        zIndex: 999
                    }),
                    animate(
                        "200ms ease-in-out",
                        style({
                            left: 0,
                            opacity: 1.0,
                            zIndex: 999
                            
                        })
                    )
                ]
            ),
            transition(
                "prev => void", // ---> Leaving --->
                [
                    animate(
                        "200ms ease-in-out",
                        style({
                            left: 300,
                            opacity: 0.0
                        })
                    )
                ]
            ),
            transition(
                "void => next", // <--- Entering <---
                [
                 
                    style({
                        left: 300,
                        opacity: 0.0,
                        zIndex: 999
                    }),
                    animate(
                        "200ms ease-in-out",
                        style({
                            left: 0,
                            opacity: 1.0,
							zIndex: 999
                        })
                    )
                ]
            ),
            transition(
                "next => void", // <--- Leaving <---
                [
                    animate(
                        "200ms ease-in-out",
                        style({
                            left: -300,
                            opacity: 0.0
                        })
                    )
                ]
            )
        ]
    )
],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  private colorMap = {
		'1': '#4A4A4A',
		'2': '#028C99',
		'3': '#DBA60B',
		'4': '#28B397',
		'5': '#3586BF'
	};
	private colorBgMap = {
		'1': '#F2F1E9',
		'2': '#E5F9F3',
		'3': '#F6F2B6'
	};
	private badgeMap = {
		'1': 'assets/lowLot_drivin.svg',
		'2': 'assets/recentSuccess_drivin.svg',
		'3': 'assets/underSupplied_drivin.svg',
		'4': 'assets/pastPurchase_drivin.svg',
		'5': 'assets/recentlyViewed_drivin.svg'
	};
	orientation: Orientation;
	
	public logo = 'assets/PoweredbyDRIVIN.svg';
	showRecCarousel = false; // if carousel is ready to display, requests are completed
	recsFound: boolean;
	isNewWaveEnabled = false;

	currentOffset = 0;
	cardsPerPage = 3;
	originalCarouselWidth = 972;
	originalPaginationFactor = 322;
	paginationFactor = 322;
	noOfPages = 0;
	noOfRecs = 0;
	activePage = 1;
	endRecord = 0;


	recommendations: Recommendation[] = [];
	tempRecommendations: Recommendation[] = [];
	selectedRecommendation: Number;

	indicators = [];
	resizeTimeout: any;
	// modalRef: BsModalRef;

	constructor(
    private changeDetectorRef: ChangeDetectorRef,private dealerBlockService: DealerBlockService,
     private recommendationsService: RecommendationsService) {
		//this.recommendationsService = recommendationsService;
		// this.dealerBlockService = dealerBlockService;
		// this.authService = authService;
		// this.meta.addTag({ name: 'viewport', content: 'width=device-width' });
		this.changeDetectorRef = changeDetectorRef;
		this.orientation = "void";
		this.selectedRecommendation = 0;

		window.onresize = (e) => {
			if (this.resizeTimeout) {
				clearTimeout(this.resizeTimeout);
			}

			this.resizeTimeout = setTimeout(() => {
				this.updateLayout();
				this.updateSize();
			}, 200);
		};
	}

	get atEndOfList() {

		return this.currentOffset <= (this.paginationFactor * -1) * (this.tempRecommendations.length - this.cardsPerPage);
	}

	get atHeadOfList() {
		return this.currentOffset === 0;
	}

	async ngOnInit() {
		this.recommendations = [];
		this.noOfPages = 0;
		this.noOfRecs = 0;
		// this.authService.isNewWaveEnabled.subscribe(enabled => {
		// 	this.isNewWaveEnabled = enabled;
		// });

		const showCarousel = this.shouldShowCarousel(); // if carousel is toggled on for this domain and env
		if (showCarousel) {
			
			if (true) {
				try {
					this.recommendations = await this.recommendationsService.getRecommendations("1") || [];
					if (!this.recommendations) {
						return;
					}
					this.tempRecommendations = this.recommendations;
					this.noOfRecs = this.recommendations.length;
					this.showRecCarousel = true;
					this.updateLayout();
					await this.getDealerBlockData();
					setTimeout(() => {
						this.updateSize();
					}, 200);
					// if (environment.production) {
					// 	await this.subscribeToEvents(this.orgId);
					// }
				} catch (e) {
					return;
				} finally { }

			}
		} else {
			this.showRecCarousel = false;
		}
	}
	

	updateLayout() {
		this.getCardsPerPage();
		this.getPages();
		this.getIndicators();
		this.getActivePage();
	}

	updateSize() {
		const container = document.getElementById('outside-container');
		if (container) {
			const parentElement = container.parentElement;
			if (parentElement) {
				const parentSize = container.parentElement.clientWidth;
				this.paginationFactor = (this.originalPaginationFactor / this.originalCarouselWidth) * parentSize;

				const recMain = document.getElementsByClassName('rec-main')[0];

				recMain.setAttribute('style', `--holderWidth: ${parentSize}px`);
			}
		}
	}


	getPages() {
		const length = this.noOfRecs;
		this.indicators = [];
		this.noOfPages = length % this.cardsPerPage === 0 ? length / this.cardsPerPage : Math.floor(length / this.cardsPerPage) + 1;
	}

	getIndicators() {
		if (this.cardsPerPage > 1 && this.recommendations.length > this.cardsPerPage) {
			for (let i = 0; i < this.noOfPages; i++) {
				this.indicators.push(i);
			}
		}
	}

	getCardsPerPage() {
		if (window.matchMedia('(max-width: 767px)').matches) {
			if (this.cardsPerPage !== 1) {

				this.cardsPerPage = 1;
				this.currentOffset = 0;
			}
		} else if (window.matchMedia('(max-width: 990px)').matches) {
			if (this.cardsPerPage !== 2) {

				this.cardsPerPage = 2;
				this.currentOffset = 0;
			}
		} else {
			if (this.cardsPerPage !== 3) {

				this.cardsPerPage = 3;
				this.currentOffset = 0;
			}
		}
          this.getIndicators();
	}

	getActivePage() {
		if (this.recommendations.length > 0) {
			this.recommendations = this.tempRecommendations;
			let myArray = [];
			for (let i = 0; i < this.recommendations.length; i += this.cardsPerPage) {
				myArray.push(this.recommendations.slice(i, i + this.cardsPerPage));
			}
			if (this.atHeadOfList) {
				this.activePage = 1;

				this.recommendations = myArray[0];


			} else if (this.atEndOfList) {
				this.activePage = this.noOfPages;
				this.recommendations = myArray[this.activePage - 1];
			} else {
				this.activePage = Math.ceil((-this.currentOffset / this.paginationFactor) / this.cardsPerPage) + 1;
				if (this.activePage === this.noOfPages) {
					this.activePage--;
				}
				this.recommendations = myArray[this.activePage - 1];
			}
		}
	}

	async getDealerBlockData() {
		for (let i = 0; i < this.recommendations.length; i++) {
			await this.getDealerBlockDataForRecommendation(this.recommendations[i]);
		}
	}

	async getDealerBlockDataForRecommendation(recommendation: Recommendation) {
		recommendation.vehicle.dealerBlock = {};

		const dbInfo = await this.dealerBlockService.getDBVehicleInfo("", recommendation.vehicle.nwVehicleId);
		if (!dbInfo || !dbInfo.dealerBlockAuction || dbInfo.dealerBlockAuction.showDB !== true) {
			recommendation.vehicle.showDB = false;
		} else {
			recommendation.vehicle.showDB = dbInfo.dealerBlockAuction.showDB;
			recommendation.vehicle.dealerBlock.buyNowPrice = dbInfo.dealerBlockAuction.buyNowPrice;
			recommendation.vehicle.dealerBlock.canBuy = dbInfo.dealerBlockAuction.canBuy;
			recommendation.vehicle.dealerBlock.allowBuy = dbInfo.dealerBlockAuction.allowBuy;
			recommendation.vehicle.dealerBlock.canBid = dbInfo.dealerBlockAuction.canBid;
			recommendation.vehicle.dealerBlock.allowBid = dbInfo.dealerBlockAuction.allowBid;
			recommendation.vehicle.dealerBlock.startPrice = dbInfo.dealerBlockAuction.startPrice;
			recommendation.vehicle.dealerBlock.winningBidAmount = dbInfo.dealerBlockAuction.winningBidAmount;
		}
	}

	moveCarousel(canBeClicked, direction) {
		if (canBeClicked) {
			// this.activePage += direction;
			if (direction === -1) {
				this.orientation = "prev";
				this.changeDetectorRef.detectChanges();

				if (this.currentOffset <= -this.cardsPerPage * this.paginationFactor) {
					this.currentOffset -= direction * this.cardsPerPage * this.paginationFactor;
				} else {
					this.currentOffset = 0;
				}
			} else {
				this.orientation = "next";
				this.changeDetectorRef.detectChanges();

				if (-this.currentOffset <= (this.noOfRecs - 2 * this.cardsPerPage) * this.paginationFactor) {
					// this.currentOffset += 236;
					this.currentOffset -= direction * this.cardsPerPage * this.paginationFactor;
				} else {
					// this.currentOffset += 206;
					this.currentOffset = -1 * (this.noOfRecs - this.cardsPerPage) * this.paginationFactor;
				}


			}
			this.getActivePage();
		}
	}

	shouldShowCarousel() {
		const hostname = window.location.hostname;
		// looking for nw environment
		const envPropertiesString = sessionStorage.getItem(`environment-${hostname}`);
		if (envPropertiesString) {
			const envProperties = JSON.parse(envPropertiesString);
			if (envProperties) {
				if (envProperties['recommendations']) {
					return envProperties['recommendations']['showCarousel'] === true;
				}
			}
		}


		// otherwise, classic way
		const domain = this.getDomain();
		const showCa = true;
		const showCom = true;
		// check if !ca so that local dev works
		if ((domain === 'ca' && showCa === true) || (domain !== 'ca' && showCom === true)) {
			return true;
		} else {
			return false;
		}
	}

	getDomain() {
		const domain = window.location.origin;
		const domainElements = domain.split('.');
		return domainElements[domainElements.length - 1];
	}

	

}
