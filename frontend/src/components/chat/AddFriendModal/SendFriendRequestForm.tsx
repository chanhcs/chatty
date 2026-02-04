import type { UseFormRegister } from "react-hook-form";
import type { IFormValues } from "./AddFriendModal";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { ArrowBigLeftDash, UserPlus } from "lucide-react";

interface SendRequestProps {
  register: UseFormRegister<IFormValues>;
  loading: boolean;
  searchedUsername: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

const SendFriendRequestForm = ({
  register,
  loading,
  searchedUsername,
  onSubmit,
  onBack,
}: SendRequestProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <div className="success-message space-y-1">
          Found <span className="font-semibold">@{searchedUsername}.</span> You can send a message now
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="message"
            className="text-sm font-semibold"
          >
            Message
          </Label>
          <Textarea
            id="message"
            rows={3}
            placeholder="Hi, let’s connect!..."
            className="glass border-border/50 focus:border-primary/50 transition-smooth resize-none"
            {...register("message")}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="flex-1 hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={onBack}
          >
            <ArrowBigLeftDash className="size-4" />
            Back
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-red-500 text-white hover:bg-red-500/90 transition-smooth cursor-pointer"
          >
            {loading ? (
              <span>Sending...</span>
            ) : (
              <>
                <UserPlus className="size-4 mr-1" />Add Friend
              </>
            )}
          </Button>
        </DialogFooter>
      </div>
    </form>
  );
};

export default SendFriendRequestForm;