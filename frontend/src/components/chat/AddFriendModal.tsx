import { Button } from '@/components/ui/button';
import { UserRoundPlus } from 'lucide-react';
const AddFriendModal = () => {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:transition-smooth hover:bg-muted/30"
        >
            <UserRoundPlus className="size-4.5" />
        </Button>
    );
};

export default AddFriendModal;