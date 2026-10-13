/**
 * @file 谈话类型分布面板
 * @description 对齐新 UI：标题底图 + 建筑线稿 + 计数卡。
 * 底部卡片走 getRegionRecordCount 返回的 converTypeList（name / count）。
 */
import Panel from '../../../../../components/common/Panel'
import { GET_REGION_RECORD_COUNT } from '../../../mockData'
import { cockpitAssets } from '../../../assets'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const PLACEHOLDER = '--'
const PLACEHOLDER_CARD_COUNT = 3

const createPlaceholderTypes = () =>
  Array.from({ length: PLACEHOLDER_CARD_COUNT }, (_, index) => ({
    key: `placeholder-${index}`,
    name: PLACEHOLDER,
    count: PLACEHOLDER,
  }))

/** 准确使用接口字段；无值显示 --。count 为 0 时正常展示 0。 */
const displayField = (value) => {
  if (value == null) return PLACEHOLDER
  if (typeof value == 'string' && value.trim() == '') return PLACEHOLDER
  return value
}

const mapRegionRecordData = (data) => {
  const list = data && data.converTypeList
  if (!Array.isArray(list) || list.length == 0) {
    return createPlaceholderTypes()
  }
  return list.map((item, index) => ({
    key: `type-${index}`,
    name: displayField(item && item.name),
    count: displayField(item && item.count),
  }))
}

function ConversationType() {
  const params = useCockpitQueryParams()
  const types = useCockpitSWR('regionRecordCount', params, GET_REGION_RECORD_COUNT, {
    select: mapRegionRecordData,
    fallback: createPlaceholderTypes,
  })

  return (
    <Panel title="谈话类型分布" className="panel--plain conversation-type-panel">
      <div className="conversation-type">
        <div className="conversation-type__visual">
          <img
            className="conversation-type__building"
            src={cockpitAssets.buildingVisual}
            alt="纪检谈话场所"
          />
        </div>

        <ul className="conversation-type__cards">
          {types.map((item, index) => (
            <li key={item.key} className="conversation-type__card">
              <div className="conversation-type__card-top">
                <span className="conversation-type__card-name">{item.name}</span>
                <img
                  className="conversation-type__card-icon"
                  src={
                    cockpitAssets.conversationTypeIcons[
                      index % cockpitAssets.conversationTypeIcons.length
                    ]
                  }
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <span className="conversation-type__card-count">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}

export default ConversationType
