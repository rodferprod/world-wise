import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {

    const navigate = useNavigate();

    function handleClickBack(ev) {
        ev.preventDefault();
        navigate(-1);
    }

    return (
        <Button handleClick={handleClickBack} type='back'>&larr; Back</Button>
    )
}

export default BackButton
