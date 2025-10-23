import Accordion from 'react-bootstrap/Accordion';
import { TabladataArchivos } from "./TabladataArchivos";
export function AcordionArchivos({coteoArchivos,titular,children}) {
 return (
    <Accordion  >
      <Accordion.Item eventKey="0">
        <Accordion.Header>{titular }    <span className="badge bg-info mx-1"> {coteoArchivos}</span></Accordion.Header>
 
        <Accordion.Body>
    {children}
        </Accordion.Body>
      </Accordion.Item>    
    </Accordion>
  );
}