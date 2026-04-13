export interface AutoCompleteItemProps {
    value: string;
    description?: string|null;
}
export default function AutoCompleteItem({value, description}: AutoCompleteItemProps) {
    return (
        <>
            <div className="me-3"><strong>{value}</strong></div>
            {!!description && (<div className="text-secondary">{description}</div>)}
        </>
    )

}
