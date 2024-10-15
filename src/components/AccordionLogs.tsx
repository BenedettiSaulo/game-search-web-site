import { useState } from 'react';
import { Accordion, Button, Container, Spinner, Table } from 'react-bootstrap';
import { DELET_LOG, GET_LIST_LOGS } from '../constants/endpoints.constants';

type Log = {
    idlog: number;
    log: string;
    api: string;
    metodo: string;
    resultado: string;
};

export function AccordionLogs() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchDeleteLog = async (logId: number) => {
        try {
            const response = await fetch(DELET_LOG(logId));

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            setLogs(prevLogs => prevLogs.filter(log => log.idlog !== logId));
        } catch (error) {
            console.error('Error delete log:', error);
        }
    };

    const handleAccordionToggle = async (isOpen: boolean) => {
        console.log(isOpen);

        if (isOpen && logs.length === 0) {
            setLoading(true);

            try {
                const response = await fetch(GET_LIST_LOGS);
    
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
    
                const data: Log[] = await response.json();

                setLogs(data.sort(sortByDate).slice(0, 20));
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
            
            setLoading(false);
        }
    };

    return (
        <Container fluid className="container-logs">
            <Accordion defaultActiveKey="1" onSelect={(eventKey) => handleAccordionToggle(eventKey === '0')}>
                <Accordion.Item eventKey="0">
                <Accordion.Header >Logs</Accordion.Header>
                <Accordion.Body>
                    {loading ? (
                        <Spinner animation='border' />
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>API</th>
                                    <th>Method</th>
                                    <th>Return</th>
                                    <th>Trash</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map(log => (
                                    <tr key={log.idlog}>
                                        <td>{log.idlog}</td>
                                        <td>{log.log}</td>
                                        <td>{log.api}</td>
                                        <td>{log.metodo}</td>
                                        <td>{log.resultado}</td>
                                        <td><Button variant="danger" onClick={() => fetchDeleteLog(log.idlog)}><i className="bi bi-trash3"></i></Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}

function sortByDate(a: Log, b: Log): number {
    const aDate = new Date(a.log);
    const bDate = new Date(b.log);

    return bDate.getTime() - aDate.getTime();
}