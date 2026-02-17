import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog"; import { UserPlus } from 'lucide-react';
import type { User } from '@/types/store';
import { useFriendStore } from '@/stores/useFriendStore';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import SearchForm from '@/components/chat/AddFriendModal/SearchForm';
import SendFriendRequestForm from '@/components/chat/AddFriendModal/SendFriendRequestForm';

export interface IFormValues {
    username: string;
    message: string;
}

const AddFriendModal = () => {
    const [isFound, setIsFound] = useState<boolean | null>(null);
    const [searchUser, setSearchUser] = useState<User>();
    const [searchedUsername, setSearchedUsername] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const { loading, searchByUsername, addFriend } = useFriendStore();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IFormValues>({
        defaultValues: { username: "", message: "" },
    });

    const usernameValue = watch("username");

    // Clear error when input is empty
    useEffect(() => {
        if (!usernameValue || usernameValue.trim() === "") {
            setSearchError(null);
            setIsFound(null);
        }
    }, [usernameValue]);

    const handleCancel = () => {
        reset();
        setSearchedUsername("");
        setIsFound(null);
        setSearchError(null);
    };

    const closeModal = () => {
        handleCancel();
        setIsOpen(false);
    };

    const handleSearch = handleSubmit(async (data) => {
        const username = data.username.trim();
        if (!username) return;

        setIsFound(null);
        setSearchError(null);
        setSearchedUsername(username);

        try {
            const result = await searchByUsername(username);
            if (result?.user) {
                setIsFound(true);
                setSearchUser(result.user);
            } else {
                setIsFound(false);
                if (result?.reason === "self") {
                    setSearchError("You can’t send a friend request to yourself");
                } else if (result?.reason === "friend") {
                    setSearchError(`You are already friends with @${username}`);
                } else {
                    setSearchError(null);
                }
            }
        } catch (error) {
            console.error(error);
            setIsFound(false);
            setSearchError(null);
        }
    });


    const handleSend = handleSubmit(async (data) => {
        if (!searchUser) return;
        try {
            const message = await addFriend(searchUser._id, data.message.trim());
            toast.success(message);
            closeModal();
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="flex justify-center items-center rounded-full hover:bg-sidebar-accent cursor-pointer z-10 gap-2 py-2 px-3">
                    <UserPlus className="size-4" />
                    <span className='text-sm font-medium'>Add Friend</span>
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-106.25 border-none">
                <DialogHeader>
                    <DialogTitle>Add Friend</DialogTitle>
                </DialogHeader>
                {!isFound && (
                    <>
                        <SearchForm
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            usernameValue={usernameValue}
                            loading={loading}
                            isFound={isFound}
                            searchedUsername={searchedUsername}
                            searchError={searchError}
                            onSubmit={handleSearch}
                            onCancel={handleCancel}
                        />
                    </>
                )}

                {isFound && (
                    <>
                        <SendFriendRequestForm
                            register={register}
                            loading={loading}
                            searchedUsername={searchedUsername}
                            onSubmit={handleSend}
                            onBack={() => setIsFound(null)}
                        />
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AddFriendModal;