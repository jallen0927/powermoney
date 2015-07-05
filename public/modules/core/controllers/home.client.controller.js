'use strict';
//angular.module('core').controller('HomeController', ['$scope', 'Authentication',
//	function($scope, Authentication) {
//		// This provides Authentication context.
//		$scope.authentication = Authentication;
//	}
//]);

angular.module('core').controller('PubController', ['$scope', '$http',
	function($scope, $http) {

		$scope.init = function() {
			var autoComplete,
				addressField = document.getElementById('address');
			autoComplete = new google.maps.places.Autocomplete(
				/** @type {HTMLInputElement} */
				addressField,
				{ types: ['geocode'] });
			// When the user selects an address from the dropdown,
			// populate the address fields in the form.
			google.maps.event.addListener(autoComplete, 'place_changed', function() {
				$scope.entry.googlePlace = autoComplete.getPlace();
			});
		};

		$scope.comparePlan = function() {
			$scope.error = null;
			var area = $scope.getArea();

			if(area === false) {
				return;
			}

			$http.get('/plans').success(function(plans){
				var results = [];

				for(var i=0; i<plans.length; i++) {
					if(plans[i].area !== area) {
						continue;
					}
					plans[i].result = $scope.calPower(plans[i]).toFixed(2);
					plans[i].result = parseFloat(plans[i].result);
					results.push(plans[i]);
				}

				$scope.plans = results;
				$scope.showResult = true;
			}).error(function(response){
				$scope.error = response.error;
			});

			/**
			 * If need calculate gas
			 */
			if ($scope.entry.wgas) {

				$http.get('/gplans').success(function(gplans){
					var results = [];

					for(var i=0; i<gplans.length; i++) {
						gplans[i].result = $scope.calGas(gplans[i]).toFixed(2);
						gplans[i].result = parseFloat(gplans[i].result);
						results.push(gplans[i]);
					}

					$scope.gplans = results;
				});
			}

		};

		$scope.getArea = function () {

			if($scope.entry.googlePlace === undefined) {
				$scope.error = 'Sorry, wrong address format, please select the address from drop-down list';
				return false;
			}

			if(!($scope.entry.googlePlace.address_components[3] !== undefined && $scope.entry.googlePlace.address_components[3].long_name === 'Auckland')) {
				$scope.error = 'Sorry, only address in Auckland region is supported currently.';
				return false;
			}

			var suburb = $scope.entry.googlePlace.address_components[2].long_name,
				area;

			if (northSuburbs.indexOf(suburb) !== -1) {
				area = 'north';
			} else if (southSuburbs.indexOf(suburb) !== -1) {
				area = 'south';
			} else {
				$scope.error = 'Sorry, We cannot recognise your area.';
				console.log(suburb);
				return false;
			}

			return area;
		};

		$scope.calPower = function (plan) {
			var a = parseFloat(plan.fixed),
				b = $scope.entry.wgas ? parseFloat(plan.ratewgas) : parseFloat(plan.rate),
				c = parseFloat(plan.ppd) / 100.0,
				x = parseFloat($scope.entry.amount),
				P = (a * 30 + b * x) * 1.15 * (1 - c);

			return P;
		};

		$scope.calGas = function (gplan) {
			var a = parseFloat(gplan.fixed) / 100.0,
				b = parseFloat(gplan.rate) / 100.0,
				c = parseFloat(gplan.ppd) / 100.0,
				x = parseFloat($scope.entry.amount),
				P = (a * 30 + b * x) * 1.15 * (1 - c);

			return P;
		};

		$scope.goBack = function() {
			$scope.showResult = false;
		};

		$scope.resetError = function() {
			$scope.error = '';
		};
		//$scope.reset = function() {
		//	$scope.entry = undefined;
		//};

		var northSuburbs = [
				'Albany',
				'Bayswater',
				'Beach Haven',
				'Belmont',
				'Birkdale',
				'Birkenhead',
				'Browns Bay',
				'Campbells Bay',
				'Castor Bay',
				'Chatswood',
				'Cheltenham',
				'Crown Hill',
				'Cuthill',
				'Devonport',
				'Fairview',
				'Forrest Hill',
				'Glen Eden',
				'Glendene',
				'Glenfield',
				'Glenvar',
				'Green Bay',
				'Greenhithe',
				'Gulf Harbour',
				'Henderson',
				'Highbury',
				'Hillcrest',
				'Hobsonville',
				'Kelston',
				'Konini',
				'Laingholm',
				'Long Bay',
				'Manly',
				'Massey',
				'Mairangi Bay',
				'Marlborough',
				'Meadowood',
				'Milford',
				'Murrays Bay',
				'New Lynn',
				'Northcote',
				'Northcote Central',
				'Northcote Point',
				'North Harbour',
				'Ranui ',
				'Rosedale',
				'Rothesay Bay',
				'Oratia',
				'Orewa',
				'Oteha',
				'Piha',
				'Pinehill',
				'Red Beach',
				'Sandspit',
				'Silverdale',
				'Stanley Bay',
				'Stanmore Bay',
				'Sunnynook',
				'Sunnyvale',
				'Swanson',
				'Takapuna',
				'Te Atatu',
				'Te Atatu South',
				'Titirangi',
				'Torbay',
				'Waiake',
				'Waiatarua',
				'Waimauku',
				'Wairau Valley',
				'Waitakere',
				'Waiwera',
				'Warkworth',
				'West Habour',
				'Westlake',
				'Whenuapai',
				'Windsor Park',
				'Unsworth Heights'
			],

			southSuburbs = [
				'Airport Oaks',
				'Arch Hill',
				'Avondale',
				'Alfriston',
				'Balmoral',
				'Beachlands ',
				'Blockhouse Bay',
				'Brookby',
				'Bucklands Beach',
				'Chapel Downs',
				'Clendon',
				'Clevedon',
				'Clover Park',
				'Cockle Bay',
				'Conifer Grove',
				'Dannemora',
				'East Tamaki',
				'Eastern Beach',
				'Eden Terrace',
				'Eden Valley',
				'Ellerslie',
				'Epsom',
				'Farm Cove',
				'Flamboro Heights',
				'Flat Bush',
				'Freemans Bay',
				'Glendowie',
				'Glen Innes',
				'Golflands',
				'Goodwood Heights',
				'Grafton',
				'Greenlane',
				'Greenmeadows',
				'Greenwoods Corner',
				'Grey Lynn',
				'Half Moon Bay',
				'Herne Bay',
				'Heron Point',
				'Highland Park',
				'Hill Park',
				'Hillsborough',
				'Howick',
				'Kingsland',
				'Kohimarama',
				'Lynfield',
				'Longford Park',
				'Mahia Park',
				'Mangere',
				'Mangere Bridge',
				'Mangere East',
				'Manukau ',
				'Manukau Heights ',
				'Manurewa',
				'Manurewa East',
				'Maraetai',
				'Meadowbank',
				'Meadowlands',
				'Mellons Bay',
				'Middlemore ',
				'Mission Bay',
				'Morningside',
				'Mt Albert',
				'Mt Eden',
				'Mt Roskill',
				'Mt Wellington',
				'Murphys Heights',
				'Newmarket',
				'Newton',
				'New Windsor',
				'North Park',
				'Onehunga',
				'One Tree Hill',
				'Opaheke',
				'Orakei',
				'Oranga',
				'Orere Point',
				'Otahuhu',
				'Otara',
				'Owairaka',
				'Pahurehure',
				'Pakuranga',
				'Panmure',
				'Papakura',
				'Papatoetoe',
				'Parnell',
				'Penrose',
				'Point England',
				'Point Chevalier',
				'Ponsonby',
				'Porchester Park',
				'Puhinui',
				'Randwick Park',
				'Red Hill',
				'Redoubt Park',
				'Remuera',
				'Richmond Park',
				'Rosehill',
				'Royal Oak',
				'Saint Heliers',
				'Saint Johns',
				'Saint Mary’s Bay',
				'Sandringham',
				'Settlers Cove',
				'Shelly Park',
				'Silkwood Heights',
				'Sommerville',
				'Stonefields',
				'Takanini',
				'Tamaki',
				'Te Papapa',
				'The Gardens',
				'Three Kings',
				'Totara Heights',
				'Tuscany Estate',
				'Waikowhai',
				'Waimahia Landing',
				'Waterview',
				'Wattle Cove',
				'Wattle Downs',
				'Westfield',
				'Westmere',
				'Weymouth',
				'Whitford',
				'Wiri'
			];
	}

]);
