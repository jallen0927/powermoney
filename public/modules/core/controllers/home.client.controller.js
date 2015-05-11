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

			$http.get('/plans').success(function(plans){
console.log($scope.entry.googlePlace);
				if(!($scope.entry.googlePlace.address_components[3] !== 'undefined' && $scope.entry.googlePlace.address_components[3].long_name === 'Auckland')) {
					$scope.error = 'Sorry, only address in Auckland region is allowed.';
					return false;
				}

				var suburb = $scope.entry.googlePlace.address_components[2].long_name,
					area;

				if (northSuburbs.indexOf(suburb) !== -1) {
					area = 'north';
				} else if (southSuburbs.indexOf(suburb) !== -1) {
					area = 'south';
				} else {
					console.log(suburb);
					$scope.error = 'Sorry, We cannot recognise your area.';
					return false;
				}

				console.log(area);
				for(var i=0; i<plans.length; i++) {
					plans[i].result = calResult(plans[i]).toFixed(2);
					plans[i].result = parseFloat(plans[i].result);
				}

				$scope.plans = plans;
				$scope.showResult = true;
			}).error(function(response){
				$scope.error = response.error;
			});

			function calFun(a, b, c, x) {
				var P;
				P = (a * 30 + b * x) * 1.15 * (1 + c);

				return P;
			}

			function calResult(plan) {
				var a = parseFloat(plan.fixed) / 100.0,
					b = parseFloat(plan.rate) / 100.0,
					c = parseFloat(plan.ppd) / 100.0,
					x = parseFloat($scope.entry.amount) / 1.0;

				return calFun(a, b, c, x);
			}


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
				'Mount Albert',
				'Mount Eden',
				'Mount Roskill',
				'Mount Wellington',
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
