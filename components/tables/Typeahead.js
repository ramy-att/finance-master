import { Form } from "react-bootstrap";

const Typeahead = (props) =>{
    const {label, inputValue} = props;
    return(
        <Form>
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                <Form.Control as="input" onChange={(e)=>{inputValue(e.target.value)}}/>
                <div className="typeaheadMenu">
                    All Searches
                </div>
            </Form.Group>
        </Form>
    )
}
export default Typeahead;