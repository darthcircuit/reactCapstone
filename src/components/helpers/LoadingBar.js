export default function LoadingBar(props) {
  const percent=props.percent
return (
  <div class="loading-progress-container">
    <div class="loading-progress-fill" style={{ width: percent + '%' }}>{percent}%</div>
  </div>
    )
  }