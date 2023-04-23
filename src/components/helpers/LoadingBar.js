export default function LoadingBar(props) {
  const percent=props.percent
return (
  <div className="loading-progress-container">
    <div className="loading-progress-fill" style={{ width: percent + '%' }}>{percent}%</div>
  </div>
    )
  }