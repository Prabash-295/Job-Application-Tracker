function EmptyState({ icon = '\u{1F4DC}', title, message, children }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
      {children}
    </div>
  );
}

export default EmptyState;