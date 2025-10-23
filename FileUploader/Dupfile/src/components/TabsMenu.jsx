import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export function TabsMenu({defaultActiveKey, TabsOpciones }) {
 const [key, setKey] = useState(defaultActiveKey || TabsOpciones[0].eventKey);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      defaultActiveKey
    >
      {TabsOpciones.map((tab) => (
        <Tab eventKey={tab.eventKey} title={tab.title} key={tab.eventKey}>
          {tab.content()}
        </Tab>
      ))}
    </Tabs>
  );

 

}