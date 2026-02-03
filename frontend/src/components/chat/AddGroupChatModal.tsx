import { Button } from '@/components/ui/button';
import { UsersRound } from 'lucide-react';

const AddGroupChatModal = () => {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:transition-smooth hover:bg-muted/30"
        >
            <UsersRound className="size-4.5" />
        </Button>
    );
};

export default AddGroupChatModal;