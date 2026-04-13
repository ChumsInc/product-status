import {useSelector} from "react-redux";
import {selectProductStatusList} from "./productStatusSlice.ts";
import {FormSelect, type  FormSelectProps} from "react-bootstrap";

export default function ProductStatusSelect({
                                 value,
                                 className,
                                 children,
                                 ...props
                             }: FormSelectProps){
    const list = useSelector(selectProductStatusList);

    return (
        <FormSelect value={value} className={className} size="sm" {...props}>
            <option value="">-</option>
            {list
                .filter(status => !/%/.test(status.code))
                .map(status => (
                        <option key={status.id} value={status.code}>
                            {status.code} - {status.description}
                        </option>
                    )
                )}
        </FormSelect>
    )
}
