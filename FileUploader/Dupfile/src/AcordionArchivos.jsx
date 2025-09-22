import Accordion from 'react-bootstrap/Accordion';
import { TabladataArchivos } from "./TabladataArchivos";
export function AcordionArchivos({titular,children}) {
 return (
    <Accordion  >
      <Accordion.Item eventKey="0">
        <Accordion.Header>{titular}</Accordion.Header>
        <Accordion.Body>
    {children}
        </Accordion.Body>
      </Accordion.Item>    
    </Accordion>
  );

}