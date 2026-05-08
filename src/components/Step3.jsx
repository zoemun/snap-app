import { ChevronLeft, AlertTriangle } from 'lucide-react'

export default function Step3({ goals, selected, onSave, onBack }) {
  const topFive = selected.map(i => goals[i])
  const avoidList = goals.filter((g, i) => g.trim() && !selected.includes(i))

  return (
    <>
      <div className="progress-bar">
        {[1, 2, 3].map(n => (
          <div key={n} className={`progress-segment active`} />
        ))}
      </div>

      <div className="page-header">
        <div className="step-label">3단계</div>
        <h1>이게 당신의 우선순위입니다</h1>
        <p>저장하면 홈에서 언제든 확인할 수 있어요.</p>
      </div>

      <div className="scroll-content">
        <div className="result-section">
          <div className="result-section-label">🎯 집중할 것</div>
          <div className="result-focus-list">
            {topFive.map((goal, i) => (
              <div key={i} className="result-focus-item">
                <span className="result-focus-num">{i + 1}</span>
                <span className="result-focus-text">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {avoidList.length > 0 && (
          <div className="result-section">
            <div className="result-section-label">🚫 절대 하지 말 것</div>
            <div className="avoid-warning">
              <p className="avoid-warning-main"><strong>절대 손대지 마세요.</strong><br />위 5개에 올인하지 못하게 만드는 가장 큰 적입니다.</p>
              <p className="avoid-warning-sub">이것들은 "나중에 할 것"이 아닙니다.<br />관심이 가더라도 무시하세요. 이것들이 위험한 이유는 하고 싶을 만큼 끌리기 때문입니다.</p>
            </div>
            <div className="result-avoid-card" style={{ marginTop: 10 }}>
              {avoidList.map((goal, i) => (
                <div key={i} className="result-avoid-item">
                  <span className="result-avoid-strike">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: 24 }} />
      </div>

      <div className="bottom-bar">
        <button className="btn-primary" onClick={onSave}>
          저장하고 시작하기
        </button>
        <button className="btn-ghost" onClick={onBack}>
          <ChevronLeft size={16} style={{ display: 'inline', marginRight: 4 }} />
          다시 고르기
        </button>
      </div>
    </>
  )
}
