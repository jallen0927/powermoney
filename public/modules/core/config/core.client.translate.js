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

            RESULT_TITLE: 'Here are the results calculated for you',
            POWER_TITLE: 'Power plans',
            EXPECT_COST: 'Expect Cost',
            COMPANY_NAME: 'Company Name',
            PLAN_NAME: 'Plan Name',
            AREA: 'Area',
            SPECIAL: 'Special',
            SIGN_UP: 'Sign up',
            GAS_TITLE: 'Gas Plans',

            SUBMIT: 'Submit',
            BACK: 'Back',

            CALCULATION: 'Calculation',
            BLOGS: 'Blogs',
            PRODUCTS: 'Products',
            CONTACT_US: 'Contact Us',
            ABOUT_US: 'About Us'

        });
        $translateProvider.translations('cn', {
            SLOGAN: '我们帮您节省电费',
            ADDRESS: '地址 (目前只支持奥克兰地区)',
            ADDRESS_TIP: '您的家庭住址',
            CONSUMPTION: '每月用电量(度)',
            CONSUMPTION_TIP: '您的平均每月用电量',
            WITH_GAS: '需要计算天然气？',
            GAS_CONSUMPTION: '每月天然气用量(升)',
            GAS_TIP: '您平均每月的天然气用量',

            RESULT_TITLE: '以下是我们为您计算的结果',
            POWER_TITLE: '用电计划',
            EXPECT_COST: '预期费用',
            COMPANY_NAME: '公司名称',
            PLAN_NAME: '计划名称',
            AREA: '区域',
            SPECIAL: '特殊优惠',
            SIGN_UP: '签约',
            GAS_TITLE: '天然气计划',

            SUBMIT: '提交',
            BACK: '返回',

            CALCULATION: '费用计算',
            BLOGS: '博客',
            PRODUCTS: '产品',
            CONTACT_US: '联系我们',
            ABOUT_US: '关于我们'
        });

        $translateProvider.preferredLanguage('en');
    }

]);