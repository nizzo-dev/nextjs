/**
 * @file 驾驶舱切图资源索引
 * @description 使用 src/app/cockpit/images 中的原始视觉资源。
 */
import bg from './images/bg.png'
import titleDeco from './images/标题.png'
import timeDot from './images/时间.png'
import weatherSun from './images/天气.png'
import panelTitleLine from './images/标题.png'
import pathDeco from './images/路径.png'
import pathDeco2 from './images/路径-2.png'
import pathDeco3 from './images/路径-3.png'

import kpiSessions from './images/累计谈话场次.png'
import kpiParticipants from './images/累计参与人次.png'
import kpiHighRisk from './images/高风险谈话.png'
import kpiAbnormal from './images/异常行为记录.png'
import kpiInstitutions from './images/内部机构总数.png'
import kpiVenues from './images/在用谈话场所.png'
import kpiCardDeco from './images/kapian.png'

import buildingVisual from './images/模型视觉.png'
import conversationItemBg from './images/谈话类型分布_itembg.png'
import conversationChartBg from './images/谈话类型分布echarts_bg.png'

import rank1 from './images/one.png'
import rank2 from './images/two.png'
import rank3 from './images/three.png'
import rank4 from './images/four.png'
import rank5 from './images/five.png'
import rank6 from './images/6.png'
import rank7 from './images/7.png'
import rank8 from './images/8.png'

import townVisual from './images/镇街.png'
import deptVisual from './images/科室.png'

import navVenues from './images/场所全域展示.png'
import navVenuesActive from './images/场所全域展示1.png'
import navParticipants from './images/谈话人员全景.png'
import navParticipantsActive from './images/谈话人员全景1.png'
import navSubjects from './images/谈话对象全景.png'
import navSubjectsActive from './images/谈话对象全景1.png'

import orgCoordinationIcon from './images/tanhuatongchou_icon.png'
import orgFolderIcon from './images/wenjianjia.png'
import orgSuperviseIcon from './images/jianduxuncha_icon.png'
import orgMedicalIcon from './images/yiliaobaozhang_icon.png'

import kpiTotalStaff from './images/tanhuarenyuanzongshu.png'
import kpiCivilRate from './images/wenmingbananhegelv.png'
import kpiMonthlyAvg from './images/renjunyuedutanhualiang.png'
import kpiAvgDuration from './images/pingjuntanhuashichang.png'
import kpiRevisitRate from './images/huifangwanchenglv.png'

import top1 from './images/top1.png'
import top2 from './images/top2.png'
import top3 from './images/top3.png'
import top4 from './images/top4.png'
import top5 from './images/top5.png'
import top6 from './images/top6.png'
import top7 from './images/top7.png'
import top8 from './images/top8.png'
import top9 from './images/top9.png'
import top10 from './images/top10.png'

import kpiSubjectTotal from './images/tanhuaduixiangzongshu.png'
import kpiSubjectMonthlyNew from './images/benyuexinzengduixiang.png'
import kpiSubjectHighFreq from './images/duanshigaopintanhuaduixiang.png'
import kpiSubjectOffsite from './images/yiditanhuaduixiang.png'
import kpiSubjectHighRisk from './images/gaofengxianduixiang.png'
import kpiSubjectLeads from './images/guanlianxiansuozongshu.png'

const toSrc = (asset) => asset?.src ?? asset

export const cockpitAssets = {
  bg: toSrc(bg),
  titleDeco: toSrc(titleDeco),
  timeDot: toSrc(timeDot),
  weatherSun: toSrc(weatherSun),
  panelTitleLine: toSrc(panelTitleLine),
  pathDeco: toSrc(pathDeco),
  pathDeco2: toSrc(pathDeco2),
  pathDeco3: toSrc(pathDeco3),
  kpiSessions: toSrc(kpiSessions),
  kpiParticipants: toSrc(kpiParticipants),
  kpiHighRisk: toSrc(kpiHighRisk),
  kpiAbnormal: toSrc(kpiAbnormal),
  kpiInstitutions: toSrc(kpiInstitutions),
  kpiVenues: toSrc(kpiVenues),
  kpiCardDeco: toSrc(kpiCardDeco),
  buildingVisual: toSrc(buildingVisual),
  conversationItemBg: toSrc(conversationItemBg),
  conversationChartBg: toSrc(conversationChartBg),
  conversationTypeIcons: [pathDeco, pathDeco2, pathDeco3].map(toSrc),
  rankBadges: [rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8].map(toSrc),
  townVisual: toSrc(townVisual),
  deptVisual: toSrc(deptVisual),
  nav: {
    venues: { default: toSrc(navVenues), active: toSrc(navVenuesActive) },
    participants: { default: toSrc(navParticipants), active: toSrc(navParticipantsActive) },
    subjects: { default: toSrc(navSubjects), active: toSrc(navSubjectsActive) },
  },
  orgIcons: {
    coordination: toSrc(orgCoordinationIcon),
    folder: toSrc(orgFolderIcon),
    supervise: toSrc(orgSuperviseIcon),
    medical: toSrc(orgMedicalIcon),
  },
  participantsKpi: {
    totalStaff: toSrc(kpiTotalStaff),
    civilRate: toSrc(kpiCivilRate),
    monthlyAvg: toSrc(kpiMonthlyAvg),
    avgDuration: toSrc(kpiAvgDuration),
    revisitRate: toSrc(kpiRevisitRate),
  },
  subjectsKpi: {
    total: toSrc(kpiSubjectTotal),
    monthlyNew: toSrc(kpiSubjectMonthlyNew),
    highFreq: toSrc(kpiSubjectHighFreq),
    offsite: toSrc(kpiSubjectOffsite),
    highRisk: toSrc(kpiSubjectHighRisk),
    leads: toSrc(kpiSubjectLeads),
  },
  topBadges: [top1, top2, top3, top4, top5, top6, top7, top8, top9, top10].map(toSrc),
}

export const kpiIconMap = {
  sessions: cockpitAssets.kpiSessions,
  participants: cockpitAssets.kpiParticipants,
  highRisk: cockpitAssets.kpiHighRisk,
  abnormal: cockpitAssets.kpiAbnormal,
  institutions: cockpitAssets.kpiInstitutions,
  venues: cockpitAssets.kpiVenues,
}
