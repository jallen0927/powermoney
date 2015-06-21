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

			if(area == false) {
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
				'Albany Heights',
				'Bayswater',
				'Beachhaven',
				'Belmont',
				'Birkdale',
				'Birkenhead',
				'Browns bay',
				'Campbells bay',
				'Castor Bay',
				'Chatswood',
				'Cheltenham',
				'Crown Hill',
				'Devonport',
				'Edmonton',
				'Forest Hill',
				'Glendene',
				'Glen Eden',
				'Glenfield',
				'Green Bay',
				'Greenhithe',
				'Halls Corner',
				'Hauraki',
				'Henderson Valley',
				'Highbury',
				'Hillcrest',
				'Hobsonville',
				'Kelston',
				'Konini',
				'Laingholm',
				'Lincoln',
				'Long Bay',
				'Mairangi Bay',
				'Mclaren Park',
				'Milford',
				'Murrays Bay',
				'Narrow Neck',
				'New Lynn',
				'Northcote',
				'Northcote Point',
				'Northcross',
				'Oratia',
				'Pine Hill ',
				'Rothesay Bay',
				'Stanley Bay',
				'Ranui',
				'Rosebank',
				'Royal Heights',
				'Sunnybrae',
				'Sunnynook',
				'Sunnyvale',
				'Takapuna',
				'Te Atatu',
				'Te Atatu North',
				'Te Atatu Peninsula',
				'Te Atatu South',
				'The Palms',
				'Titirangi',
				'Torbay',
				'Torbay Heights',
				'Totaravale',
				'Unworth Heights',
				'Waiake',
				'Waima',
				'Wainoni',
				'Wairau Park',
				'West Harbour',
				'Western Heights',
				'Westlake',
				'Whangapararoa',
				'Woodlands Park'
			],

			southSuburbs = [
				'Arch Hill',
				'Auckland Central',
				'Avondale',
				'Balmoral',
				'Blockhouse Bay',
				'Botany Down',
				'Bucklands Beach',
				'Clendon Park',
				'Clover Park',
				'Cockle Bay',
				'Dannemora',
				'East Tamaki',
				'East Tamaki Heights',
				'Eastern Beach',
				'Eden Terrace',
				'Ellerslie',
				'Epsom',
				'Farm Cove',
				'Favona',
				'Flat Bush',
				'Freemans Bay',
				'Glen Innes',
				'Glendowie',
				'Goodwood Heights',
				'Grafton',
				'Greenlane',
				'Greenmount',
				'Grey Lynn',
				'Half Moon Bay',
				'Herne Bay',
				'Highland Park',
				'Hill Park',
				'Hillsborough',
				'Homai',
				'Howick',
				'Kingsland',
				'Kohimarama',
				'Lynfield',
				'Mangere',
				'Mangere Bridge',
				'Manukau Central',
				'Manukau Heads',
				'Manukau Heights',
				'Manurewa',
				'Meadowbank',
				'Mellons Bay',
				'Middlemore',
				'Mission Bay',
				'Morningside',
				'Mt Albert',
				'Mt Eden',
				'Mt Roskill',
				'Mt Wellington',
				'New Windsor',
				'Newmarket',
				'Newton',
				'North Park',
				'One Tree Hill',
				'Onehunga',
				'Orakei',
				'Oranga',
				'Orere',
				'Orere Point',
				'Otahuhu',
				'Otara',
				'Owairaka',
				'Pakuranga',
				'Pakuranga Heights',
				'Panmure',
				'Papatoetoe',
				'Parnell',
				'Penrose',
				'Point Chevalier',
				'Point England',
				'Ponsonby',
				'Puhinui',
				'Remuera',
				'Royal Oak',
				'Sandringham',
				'Shelly Park',
				'Somerville',
				'Southgate Mall',
				'St Heliers',
				'St Johns',
				'St Lukes',
				'St Marys Bay',
				'Sunnyville',
				'Tamaki',
				'Te Papapa',
				'The Gardens',
				'The Roskill Centre Auckland',
				'Three Kings',
				'Totara Heights',
				'Waikowhai',
				'Waterview',
				'Wattle Downs',
				'Wesley',
				'Western Springs',
				'Westfield',
				'Westmere',
				'Weymouth',
				'Wiri'
			];
	}

]);
