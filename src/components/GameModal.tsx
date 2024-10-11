import { Button, Modal } from 'react-bootstrap';

type GameModal ={
    show: boolean;
    selectedGameDetails: GameDetail | null;
    handleCloseModal: () => void;
};

type GameDetail = {
    name: string;
    description_raw: string;
    website: string;
    publishers: Publisher[];
    alternative_names: string[];
};

type Publisher = {
    name: string
};

export function GameModal({ show, selectedGameDetails, handleCloseModal }: GameModal) {

    if (!selectedGameDetails) {
        return;
    }

    return (
        <Modal show={show} onHide={handleCloseModal} className='game-modal' size='lg'>
            <Modal.Header className='game-header'>
                <Modal.Title><h1>{selectedGameDetails.name}</h1></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><b>Alternative names:</b> {selectedGameDetails.alternative_names.join(', ')}</p>
                <p><b>Publishers:</b> {formaterList(selectedGameDetails.publishers)}</p>
                <p><b>Description:</b> {getEnglishDescription(selectedGameDetails.description_raw)}</p>
            </Modal.Body>
            <Modal.Footer className='game-modal-footer'>
                <Button onClick={() => accessPage(selectedGameDetails.website)}>Access page</Button>
                <Button onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function accessPage(url: string) {
    window.open(url, '_blank');
}

function formaterList(publishers: Publisher[]): string {
    return publishers.map(pub => pub.name).join(', ');
}

function getEnglishDescription(description: string): string {

    const indexOfSpanish = description.indexOf("Español");

    if (indexOfSpanish !== -1) {
        return description.substring(0, indexOfSpanish).trim();
    }

    return description.trim();
}