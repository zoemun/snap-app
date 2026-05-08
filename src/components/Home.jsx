import { useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Home({ saved, onStart, onReset }) {
  const [avoidOpen, setAvoidOpen] = useState(false)

  if (!saved) {
    return (
      <>
        <div className="home-hero">
          <p className="home-promise-text">
            하고 싶은 게 100개쯤 되시죠?<br />
            다 하실 수 있을까요?
          </p>
          <p className="home-promise-sub">제가 도와드릴게요</p>
        </div>

        <div className="bottom-bar">
          <button className="btn-primary" onClick={onStart}>
            시작하기
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="home-header">
        <h1 className="home-title">우선순위<br />정하기</h1>
      </div>

      <div className="scroll-content">
        <div style={{ paddingTop: 8 }}>
          <div className="result-section-label" style={{ marginBottom: 8 }}>
            🎯 집중할 것
          </div>
          <p className="saved-date">{formatDate(saved.savedAt)} 설정</p>

          <div className="home-focus-list">
            {saved.topFive.map((goal, i) => (
              <div key={i} className="home-focus-item">
                <div className="home-focus-dot" />
                <span className="home-focus-text">{goal}</span>
              </div>
            ))}
          </div>

          {saved.avoidList && saved.avoidList.length > 0 && (
            <>
              <button
                className="avoid-toggle-btn"
                onClick={() => setAvoidOpen(v => !v)}
              >
                <span className="avoid-toggle-label">
                  <X size={14} color="var(--color-ink)" />
                  하지 말 것 {saved.avoidList.length}개
                </span>
                {avoidOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {avoidOpen && (
                <div className="avoid-list-wrap">
                  {saved.avoidList.map((goal, i) => (
                    <div key={i} className="avoid-list-item">
                      <span className="avoid-list-text">{goal}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="bottom-bar">
        <button className="btn-ghost" onClick={onReset}>
          다시 설정하기
        </button>
      </div>
    </>
  )
}
