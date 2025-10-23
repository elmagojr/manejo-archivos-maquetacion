
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

export function ListadoGenerico({ data, value, onChange, identificadores, valorDefault, mensajeDefault,keyValue, textValueSelect }) {
    return (
        <>
            <select id={identificadores} name={identificadores} className="form-select" aria-label="Default select example" value={value} onChange={onChange}>
                <option  defaultValue={valorDefault} value={valorDefault}>{mensajeDefault}</option>
                  {data.map(item => (
                    <option key={item[keyValue]} value={item[keyValue]}>{item[textValueSelect]}</option>
                ))}
            </select>
       

        </>

    );
}