import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cockpitAssets } from '../../assets'
import { exitFullscreen, isFullscreen, requestFullscreen } from '../../../../lib/fullscreen'

function formatClock(date) {
  return date.toLocaleTimeString('zh-CN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function Header() {
  const router = useRouter()
  const [now, setNow] = useState(() => new Date())
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const syncFullscreen = () => setFullscreen(isFullscreen())
    syncFullscreen()
    document.addEventListener('fullscreenchange', syncFullscreen)
    document.addEventListener('webkitfullscreenchange', syncFullscreen)

    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreen)
      document.removeEventListener('webkitfullscreenchange', syncFullscreen)
    }
  }, [])

  const goManagementPlatform = async () => {
    await exitFullscreen()
    router.push('/')
  }

  return (
    <header className="header">
      <div className="header__left">
        <img className="header__clock-dot-img" src={cockpitAssets.timeDot} alt="" aria-hidden="true" />
        <span className="header__clock">{formatClock(now)}</span>
        <div className="header__weather">
          <img className="header__weather-icon" src={cockpitAssets.weatherSun} alt="" aria-hidden="true" />
          <span className="header__weather-temp">26℃</span>
        </div>
      </div>

      <div className="header__center">
 
      </div>

      <div className="header__right">
        {!fullscreen ? (
          <button
            type="button"
            className="header__platform-btn"
            onClick={() => void requestFullscreen()}
          >
            <span>进入全屏</span>
          </button>
        ) : null}
        <button
          type="button"
          className="header__platform-btn"
          onClick={goManagementPlatform}
        >
          <span>返回作品集</span>
        </button>
      </div>
    </header>
  )
}

export default Header
