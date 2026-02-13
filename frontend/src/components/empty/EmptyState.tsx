interface EmptyStateProps {
    message: string;
    image?: boolean;
}

const EmptyState = ({ message, image }: EmptyStateProps) => {
    return (
        <div className="min-h-22.5 flex flex-col items-center justify-center gap-2">
            {image && <img src="/empty-request.png" alt="empty-request" width={50} height={50} />}
            <p className="text-center text-sm text-muted-foreground">
                {message}
            </p>
        </div>
    );
};

export default EmptyState;