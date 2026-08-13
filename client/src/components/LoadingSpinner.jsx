export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="spinner-wrap">
      <div className="spinner" />
      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{text}</span>
    </div>
  );
}
