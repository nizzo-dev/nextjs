import { COUNTRY_REGION_NAME, COUNTRY_UNIT_CODE } from './mapConfig'
import { ALL_PROVINCE_SCOPES } from './provinceConfig'

const clone = (value) => JSON.parse(JSON.stringify(value))

const createAbortError = () => {
  const error = new Error('Mock data request aborted')
  error.name = 'AbortError'
  return error
}

const respond = (data, options = {}) =>
  new Promise((resolve, reject) => {
    const signal = options.signal
    let settled = false

    const finish = (callback) => {
      if (settled) return
      settled = true
      signal?.removeEventListener?.('abort', handleAbort)
      callback()
    }

    const handleAbort = () => {
      window.clearTimeout(timer)
      finish(() => reject(createAbortError()))
    }

    if (signal?.aborted) {
      reject(createAbortError())
      return
    }

    const timer = window.setTimeout(() => {
      finish(() => resolve({ data: clone(data) }))
    }, 180)

    signal?.addEventListener?.('abort', handleAbort, { once: true })
  })

const createRegionTree = () => ({
  region: COUNTRY_REGION_NAME,
  unitCode: COUNTRY_UNIT_CODE,
  subList: ALL_PROVINCE_SCOPES.map((province, provinceIndex) => ({
    region: province.name,
    unitCode: province.adcode,
    recordCount: 280 + provinceIndex * 23,
    personnelCount: 140 + provinceIndex * 11,
    interlocutor: 92 + provinceIndex * 9,
    subList: province.cities.map((city, cityIndex) => ({
      region: city.name,
      unitCode: city.adcode,
      recordCount: 88 + ((provinceIndex + cityIndex) % 9) * 23,
      personnelCount: 42 + ((provinceIndex * 2 + cityIndex) % 8) * 11,
      interlocutor: 28 + ((provinceIndex + cityIndex * 2) % 7) * 8,
      subList: city.counties.map((county, countyIndex) => ({
        region: county.name,
        unitCode: String(county.adcode),
        recordCount: 18 + ((provinceIndex + cityIndex + countyIndex) % 8) * 7,
        personnelCount: 12 + ((provinceIndex + cityIndex * 2 + countyIndex) % 6) * 5,
        interlocutor: 8 + ((provinceIndex + cityIndex + countyIndex * 2) % 5) * 4,
        subList: [],
      })),
    })),
  })),
})

const MOCK_REGION_TREE = createRegionTree()

const MOCK_DATA = {
  pilotUp: {
    InstitutionCount: 48,
    venueCount: 126,
  },
  regionRecordCount: {
    converTypeList: [
      { name: '一类谈话', count: 286 },
      { name: '二类谈话', count: 194 },
      { name: '三类谈话', count: 128 },
    ],
  },
  violationsList: [
    { cityName: '广东省', violationCount: 186 },
    { cityName: '江苏省', violationCount: 174 },
    { cityName: '山东省', violationCount: 161 },
    { cityName: '四川省', violationCount: 148 },
    { cityName: '浙江省', violationCount: 137 },
    { cityName: '河南省', violationCount: 129 },
  ],
  rhythmList: [
    { time: '2026-01', count: 42 },
    { time: '2026-02', count: 56 },
    { time: '2026-03', count: 48 },
    { time: '2026-04', count: 73 },
    { time: '2026-05', count: 68 },
    { time: '2026-06', count: 91 },
    { time: '2026-07', count: 84 },
    { time: '2026-08', count: 102 },
    { time: '2026-09', count: 96 },
    { time: '2026-10', count: 118 },
    { time: '2026-11', count: 109 },
    { time: '2026-12', count: 126 },
  ],
  quantityList: [
    { type: '流程超时', count: 58 },
    { type: '记录缺项', count: 46 },
    { type: '回访逾期', count: 39 },
    { type: '安全检查', count: 31 },
    { type: '审批遗漏', count: 24 },
    { type: '资料不全', count: 18 },
  ],
  overdueList: {
    completion: 1382,
    additionalQuantity: 427,
    all: 1809,
    overdueQuantity: 76,
    subList: [
      { region: '广东省', overdueQuantity: 24, completionRate: '86.4%' },
      { region: '江苏省', overdueQuantity: 19, completionRate: '89.7%' },
      { region: '山东省', overdueQuantity: 14, completionRate: '82.1%' },
      { region: '四川省', overdueQuantity: 11, completionRate: '91.2%' },
      { region: '浙江省', overdueQuantity: 8, completionRate: '87.5%' },
    ],
  },
  oneStopVideoList: {
    city: [
      { name: '广东省', count: 428 },
      { name: '江苏省', count: 386 },
      { name: '山东省', count: 314 },
      { name: '四川省', count: 276 },
      { name: '浙江省', count: 242 },
    ],
    office: [
      { name: '案件管理室', count: 196 },
      { name: '监督检查室', count: 168 },
      { name: '审查调查室', count: 154 },
      { name: '信访室', count: 121 },
      { name: '案件审理室', count: 98 },
    ],
  },
  speakerUp: {
    speakerCount: 268,
    evaluationQualified: 96.4,
    speakerAge: 4.8,
    recordTimeCount: 186,
    follow: 91.7,
  },
  personnelStructure: [
    {
      name: '案件监督管理中心',
      personnelSubeDTOList: [
        {
          name: '综合协调组',
          unitInfoTypeDTOList: [
            { name: '张明', count: '13800138001' },
            { name: '李倩', count: '13900139002' },
          ],
        },
        {
          name: '数据研判组',
          unitInfoTypeDTOList: [
            { name: '王磊', count: '13700137003' },
            { name: '陈思', count: '13600136004' },
          ],
        },
      ],
    },
    {
      name: '监督检查协作组',
      personnelSubeDTOList: [
        {
          name: '日常监督组',
          unitInfoTypeDTOList: [
            { name: '赵宁', count: '13500135005' },
            { name: '周洁', count: '13400134006' },
          ],
        },
        {
          name: '专项巡查组',
          unitInfoTypeDTOList: [
            { name: '刘洋', count: '13300133007' },
            { name: '何芳', count: '13200132008' },
          ],
        },
      ],
    },
  ],
  load: [
    { recordTime: '2026-09-17', recordCount: 18, recordTimeCount: 286 },
    { recordTime: '2026-09-18', recordCount: 24, recordTimeCount: 312 },
    { recordTime: '2026-09-19', recordCount: 16, recordTimeCount: 264 },
    { recordTime: '2026-09-20', recordCount: 29, recordTimeCount: 348 },
    { recordTime: '2026-09-21', recordCount: 25, recordTimeCount: 326 },
    { recordTime: '2026-09-22', recordCount: 33, recordTimeCount: 382 },
    { recordTime: '2026-09-23', recordCount: 28, recordTimeCount: 354 },
  ],
  personnelCount: [
    { name: '审查调查', count: 98 },
    { name: '监督检查', count: 84 },
    { name: '案件管理', count: 72 },
    { name: '信访办理', count: 61 },
    { name: '案件审理', count: 54 },
    { name: '巡察监督', count: 47 },
  ],
  group: [
    { groupName: '张明', groupVideoInfoCount: 3, groupPf: 96.8 },
    { groupName: '李倩', groupVideoInfoCount: 4, groupPf: 95.6 },
    { groupName: '王磊', groupVideoInfoCount: 5, groupPf: 94.2 },
    { groupName: '陈思', groupVideoInfoCount: 6, groupPf: 92.9 },
    { groupName: '赵宁', groupVideoInfoCount: 7, groupPf: 91.4 },
  ],
  interlocutorTop: {
    addCount: 84,
    frequencyCount: 32,
    awayFromCount: 21,
    highRiskCount: 18,
    clueCount: 146,
  },
  interlocutorRiskLevel: {
    highRisk: 18.2,
    highRiskCount: 49,
    lowRisk: 34.6,
    lowRiskCount: 93,
    mediumRisk: 47.2,
    mediumRiskCount: 126,
  },
  interlocutorType: {
    zeroType: 11,
    oneType: 18,
    twoType: 9,
    threeType: 14,
    fourType: 10,
    fiveType: 8,
    eightType: 7,
    sevenType: 12,
    sixType: 6,
    nineType: 3,
    tenType: 2,
  },
  healthInterlocutor: [
    {
      age: '18-30',
      countOne: 42,
      countTwo: 12,
      countThree: 4,
      violatePhysocalStatusOne: '身体健康',
      evaluationQualifiedTwo: '一般疾病',
      evaluationQualifiedThree: '危重情况',
    },
    {
      age: '31-45',
      countOne: 68,
      countTwo: 19,
      countThree: 6,
      violatePhysocalStatusOne: '身体健康',
      evaluationQualifiedTwo: '一般疾病',
      evaluationQualifiedThree: '危重情况',
    },
    {
      age: '46-60',
      countOne: 51,
      countTwo: 24,
      countThree: 9,
      violatePhysocalStatusOne: '身体健康',
      evaluationQualifiedTwo: '一般疾病',
      evaluationQualifiedThree: '危重情况',
    },
    {
      age: '60以上',
      countOne: 19,
      countTwo: 12,
      countThree: 7,
      violatePhysocalStatusOne: '身体健康',
      evaluationQualifiedTwo: '一般疾病',
      evaluationQualifiedThree: '危重情况',
    },
  ],
  objectWarningTrend: [
    { timeCount: '2026-09-17', frequencyCount: 12, awayFromCount: 8 },
    { timeCount: '2026-09-18', frequencyCount: 16, awayFromCount: 10 },
    { timeCount: '2026-09-19', frequencyCount: 13, awayFromCount: 7 },
    { timeCount: '2026-09-20', frequencyCount: 21, awayFromCount: 14 },
    { timeCount: '2026-09-21', frequencyCount: 18, awayFromCount: 12 },
    { timeCount: '2026-09-22', frequencyCount: 25, awayFromCount: 16 },
    { timeCount: '2026-09-23', frequencyCount: 22, awayFromCount: 15 },
  ],
  interlocutorCount: [
    { name: '广东省', count: 226 },
    { name: '江苏省', count: 209 },
    { name: '山东省', count: 192 },
    { name: '四川省', count: 178 },
    { name: '浙江省', count: 164 },
    { name: '河南省', count: 151 },
    { name: '湖北省', count: 143 },
  ],
  scoringBfb: {
    scoringOne: 18.4,
    scoringTwo: 36.7,
    scoringThree: 44.9,
  },
}

const createMockFetcher = (data) => (_params, options) => respond(data, options)

export const GET_PILOT_UP = createMockFetcher(MOCK_DATA.pilotUp)
export const GET_REGION_RECORD_COUNT = createMockFetcher(MOCK_DATA.regionRecordCount)
export const GET_REGION_LIST_COUNT = createMockFetcher(MOCK_REGION_TREE)
export const GET_VIOLATIONS_LIST = createMockFetcher(MOCK_DATA.violationsList)
export const GET_RHYTHM_LIST = createMockFetcher(MOCK_DATA.rhythmList)
export const GET_QUANTITY_LIST = createMockFetcher(MOCK_DATA.quantityList)
export const GET_THE_OVERDUE_LIST = createMockFetcher(MOCK_DATA.overdueList)
export const GET_ONE_STOP_VIDEO_LIST = createMockFetcher(MOCK_DATA.oneStopVideoList.city)
export const GET_SPEAKER_UP = createMockFetcher(MOCK_DATA.speakerUp)
export const GET_PERSONNEL_STRUCTURE = createMockFetcher(MOCK_DATA.personnelStructure)
export const GET_LOAD = createMockFetcher(MOCK_DATA.load)
export const GET_PERSONNEL_COUNT = createMockFetcher(MOCK_DATA.personnelCount)
export const GET_GROUP = createMockFetcher(MOCK_DATA.group)
export const GET_INTERLOCUTOR_TOP = createMockFetcher(MOCK_DATA.interlocutorTop)
export const GET_INTERLOCUTOR_RISK_LEVEL = createMockFetcher(MOCK_DATA.interlocutorRiskLevel)
export const GET_INTERLOCUTOR_TYPE = createMockFetcher(MOCK_DATA.interlocutorType)
export const GET_HEALTH_INTERLOCUTOR = createMockFetcher(MOCK_DATA.healthInterlocutor)
export const GET_OBJECT_WARNING_TREND = createMockFetcher(MOCK_DATA.objectWarningTrend)
export const GET_INTERLOCUTOR_COUNT = createMockFetcher(MOCK_DATA.interlocutorCount)
export const GET_SCORING_BFB = createMockFetcher(MOCK_DATA.scoringBfb)

export const getMockQueryList = (tab = 'city') =>
  clone(MOCK_DATA.oneStopVideoList[tab] || MOCK_DATA.oneStopVideoList.city)

export { MOCK_DATA, MOCK_REGION_TREE }
