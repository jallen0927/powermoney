/**
 * Created by xlin on 9/07/15.
 */
'use strict';

angular.module('core').config(['$translateProvider',
    function ($translateProvider) {
        $translateProvider.translations('en', {
            SLOGAN: 'Seize Power, Grab your Money',
            ADDRESS: 'Address (Auckland region only)',
            ADDRESS_TIP: 'Your home address',
            CONSUMPTION: 'Monthly Consumption (kWh)',
            CONSUMPTION_TIP: 'Your average monthly power consumption',
            WITH_GAS: 'Gas with Power?',
            GAS_CONSUMPTION: 'Gas Monthly Consumption (L)',
            GAS_TIP: 'Your average monthly gas consumption',
            SUBMIT: 'Submit'
        });
        $translateProvider.translations('cn', {
            SLOGAN: '帮您省电费',
            ADDRESS: '地址 (目前只支持奥克兰地区)',
            ADDRESS_TIP: '您的家庭住址',
            CONSUMPTION: '每月用电量(度)',
            CONSUMPTION_TIP: '您的平均每月用电量',
            WITH_GAS: '需要计算天然气？',
            GAS_CONSUMPTION: '每月天然气用量(升)',
            GAS_TIP: '您平均每月的天然气用量',
            SUBMIT: '提交'
        });

        $translateProvider.preferredLanguage('en');
    }

]);