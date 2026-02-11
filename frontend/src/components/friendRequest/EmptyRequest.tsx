interface EmptyRequestProps {
    message: string;
}

const EmptyRequest = ({ message }: EmptyRequestProps) => {
    return (
        <div className="min-h-22.5 flex flex-col items-center justify-center gap-2">
            <img src="/empty-request.png" alt="empty-request" width={50} height={50} />
            <p className="text-center text-sm text-muted-foreground">
                {message}
            </p>
        </div>
    );
};

export default EmptyRequest;