interface MessageProps {
    type: string;
    field?: string;
    text: string;
}

export interface Alert {
    type: string;
    field: string;
    text: string;
}


export const Message: React.FC<MessageProps> = ({
    text,
    field,
    type
}) => {
    return (
        <article className={`message is-${type}`}>
            <div className="message-body">
                { field && `${field} : ` }{text}
            </div>
        </article>
    )
}