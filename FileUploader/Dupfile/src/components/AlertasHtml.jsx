export function AlertaHtml({ mensaje, verMensaje, color,onClose  }) {
    if (!verMensaje) {
        return null;
    }
    return (
        <div
            className={`alert alert-${color} alert-dismissible fade show`}
            role="alert"
        >
            {mensaje}
            <button
                type="button"
                className="btn-close"
                onClick={onClose}
            ></button>
        </div>
    );
}