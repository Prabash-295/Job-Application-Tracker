function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" type="button" onClick={onCancel} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="modal__body">
          <p>{message}</p>
          <div className="modal__actions">
            <button className="btn btn--secondary" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn--danger" type="button" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;