import Mock from 'mockjs';

const Random = Mock.Random;

//  /api/seller/apply/provinceList 省份信息接口
Mock.mock(/\/api\/seller\/apply\/provinceList/g,{
        "success": true,
        "errorCode": null,
        "errorMessage": null,
        "info": [
            {
                "code": "110000",
                "name": "北京"
            },
            {
                "code": "120000",
                "name": "天津"
            }
        ]
    }
);

//  /api/seller/apply/cityList 城市信息
Mock.mock(/\/api\/seller\/apply\/cityList/g,{
        "success": true,
        "errorCode": null,
        "errorMessage": null,
        "info": [
            {
                "code": "210100",
                "name": "沈阳市",
                "provinceCode": "210000"
            },
            {
                "code": "210200",
                "name": "大连市",
                "provinceCode": "210000"
            }
        ]
    }
);

//  /api/seller/apply/sendVerifyCode 手机验证
Mock.mock(/\/api\/seller\/apply\/sendVerifyCode/g,{
        "success": true,
        "errorCode": null,
        "errorMessage": "发送失败！请重试",
        "info": true
    }
);

//  /api/seller/apply/checkVerifyCode 验证手机验证码
Mock.mock(/\/api\/seller\/apply\/checkVerifyCode/g,{
        "success": true,
        "errorCode": null,
        "errorMessage": null,
        "info": true
    }
);

//主营类目
Mock.mock(/\/api\/seller\/apply\/mainCategoryList/g,{
        "success": true,
        "errorCode": null,
        "errorMessage": null,
        "info": [
            {
                "id": 1,
                "name": "电脑、办公",
                "status": 1
            },
            {
                "id": 19,
                "name": "男装、女装、内衣鞋靴",
                "status": 1
            }
        ]
    }
);

//商户申请提交
Mock.mock(/\/api\/seller\/apply\/submit/g,{
        "success": true,
        "errorCode": null,
        "errorMessage": null,
        "info": true
    }
);

///api/seller/apply/storeTypes [店铺类型
Mock.mock('/api/seller/apply/storeTypes',{
        "success": true,
        "errorCode": null,
        "errorMessage": null,
        "info": {
            "MONOPOLY_STORE": "专卖店",
            "FRANCHISE_STORE": "专营店",
            "FLAGSHIP_STORE": "旗舰店"
        }
    }
);