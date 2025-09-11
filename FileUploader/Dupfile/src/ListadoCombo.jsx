
export function ListadoCombo({ data, value, onChange }) {
    return (
        <>
            <select id="Stipo" name="Stipo" className="form-select" aria-label="Default select example" value={value} onChange={onChange}>
                <option defaultValue={"0"}>Seleccione un tipo de documento</option>
                  {data.map(item => (
                    <option key={item.codigo} value={item.codigo}>{item.descripcion}</option>
                ))}
            </select>
       

        </>

    );
}
