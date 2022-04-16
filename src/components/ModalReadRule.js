import React, {useState, useEffect} from 'react'
import { Modal, Button, Container } from 'react-bootstrap';


const ModalReadRule = (props) => {
    const [gameRules, setRules] = useState([])
  
    useEffect(() => {
      showRules();
  
    },[])
  
    const showRules = async () => {
      const ress = await fetch(props.baseUrl+'showRules')
      const gameRules = await ress.json();
      setRules(gameRules)
    }
    return (
        <>
            <div>
                <Container>
                    <Modal
                        {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                            Rule of Guess
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        {
    gameRules.map(gameRules =>(
        <p>{gameRules.rules}</p>
    ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={props.onHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        </>
    )
}

export default ModalReadRule