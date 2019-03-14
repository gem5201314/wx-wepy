const JSON = {

    // 静态配置数据
  list: [ // 数据列表
    {
      id: 1,
      key: 'work',
      name: '上班族'
    },
    {
      id: 2,
      key: 'person',
      name: '个体户'
    },
    {
      id: 1000,
      key: 'no',
      name: '无固定职业'
    },
    {
      id: 1221,
      key: 'boss',
      name: '企业主'
    },
    {
      id: 121,
      key: 'student',
      name: '学生'
    }
  ],
      // 工资发放形式
  payTypeList: [
    {
      id: 1,
      name: '银行卡'
    },
    {
      id: 2,
      name: '现金'
    },
    {
      id: 3,
      name: '部分银行卡，部分现金'
    }
  ],
      // 工龄
  workingYearsList: [
    {
      id: 1,
      name: '不足3个月'
    },
    {
      id: 2,
      name: '3~5个月'
    },
    {
      id: 3,
      name: '6~11个月'
    },
    {
      id: 21,
      name: '1~3年'
    },
    {
      id: 32,
      name: '4~7年'
    },
    {
      id: 321,
      name: '7年以上'
    }
  ],
      // 经营年限
  BusinessYearsList: [
    {
      id: 1,
      name: '不足3个月'
    },
    {
      id: 2,
      name: '3~5个月'
    },
    {
      id: 3,
      name: '6~11个月'
    },
    {
      id: 21,
      name: '1年'
    },
    {
      id: 32,
      name: '3年'
    },
    {
      id: 321,
      name: '5年以上'
    }
  ],
      // 经营注册地
  placeBusinessList: [
    {
      id: 1,
      name: '未注册营业执照'
    },
    {
      id: 2,
      name: '本地'
    },
    {
      id: 3,
      name: '外地'
    }
  ],
      // 营业执照
  licenseList: [
    {
      id: 1,
      name: '没办理过'
    },
    {
      id: 2,
      name: '已办理，注册不满6个月'
    },
    {
      id: 3,
      name: '已办理，注册满1-4年'
    }
  ]
}
export default JSON
