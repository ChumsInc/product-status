import {Button, type ButtonProps} from "react-bootstrap";

export default function DownloadButton({onClick, ...rest}: ButtonProps) {

    return (
        <Button type="button" size="sm" variant="secondary" onClick={onClick} {...rest}>
            Download .xlsx
        </Button>
    )
}

