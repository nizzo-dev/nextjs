import { cockpitAssets } from '../../assets'

const TABS = [
  { key: 'venues', label: '场所全域展示', icons: cockpitAssets.nav.venues },
  { key: 'participants', label: '谈话人员全景', icons: cockpitAssets.nav.participants },
  { key: 'subjects', label: '谈话对象全景', icons: cockpitAssets.nav.subjects },
]

function BottomNav({ activeTab, onChange }) {
  return (
    <nav className="bottom-nav" aria-label="驾驶舱视图切换">
      {TABS.map((tab) => {
        const active = activeTab === tab.key
        const icon = active ? tab.icons.active : tab.icons.default
        return (
          <button
            key={tab.key}
            type="button"
            className={`bottom-nav__btn${active ? ' bottom-nav__btn--active' : ''}`}
            onClick={() => onChange(tab.key)}
          >
            <span className="bottom-nav__orb">
              <img className="bottom-nav__icon" src={icon} alt="" aria-hidden="true" />
            </span>
            <span className="bottom-nav__label">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav
