import type { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Search, X } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { IFormValues } from "./AddFriendModal";

interface SearchFormProps {
    register: UseFormRegister<IFormValues>;
    errors: FieldErrors<IFormValues>;
    setValue: UseFormSetValue<IFormValues>;
    loading: boolean;
    usernameValue: string;
    isFound: boolean | null;
    searchedUsername: string;
    searchError: string | null;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
}

const SearchForm = ({
    register,
    errors,
    setValue,
    usernameValue,
    loading,
    isFound,
    searchedUsername,
    searchError,
    onSubmit,
    onCancel,
}: SearchFormProps) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-3">
                <Label htmlFor="username" className="text-sm font-semibold">
                    Search by username
                </Label>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />

                    <Input
                        id="username"
                        placeholder="Username"
                        className="pl-9 pr-9 glass border-border/50 focus:border-primary/50 transition-smooth"
                        {...register("username", {
                            required: "Please enter a username",
                        })}
                    />

                    {usernameValue?.trim() && (
                        <button
                            type="button"
                            aria-label="Clear input"
                            onClick={() => {
                                setValue("username", "");
                                document.getElementById("username")?.focus();
                            }}
                            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                        >
                            <X className="size-4" />
                        </button>
                    )}
                </div>

                <div className="min-h-2">
                    {errors.username && (
                        <p className="error-message">{errors.username.message}</p>
                    )}

                    {searchError && (
                        <span className="error-message">{searchError}</span>
                    )}

                    {isFound === false && !searchError && (
                        <span className="error-message">
                            User <span className="font-semibold">@{searchedUsername}</span> was not found
                        </span>
                    )}
                </div>
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1 cursor-pointer hover:bg-muted transition-smooth"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </DialogClose>

                <Button
                    type="submit"
                    disabled={loading || !usernameValue?.trim()}
                    className="flex-1 bg-gradient-chat hover:opacity-90 text-white transition-smooth cursor-pointer"
                >
                    {loading ? <span>Searching...</span> : <span>Search</span>}
                </Button>
            </DialogFooter>
        </form>
    );
};

export default SearchForm;