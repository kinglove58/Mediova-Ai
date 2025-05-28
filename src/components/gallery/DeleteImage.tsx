import React, { useId } from "react";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { deleteImages } from "@/app/actions/image-actions";
import { cn } from "@/lib/utils";

interface DeleteImageProps {
  imageId: string;
  onDelete?: () => void;
  className?: string;
}

const DeleteImage = ({ imageId, onDelete, className }: DeleteImageProps) => {
  const toastId = useId();

  const handleDelete = async () => {
    toast.loading("Deleting the image...", { id: toastId });

    const { error, success } = await deleteImages(imageId);
    if (error) {
      toast.error(error, { id: toastId });
    } else if (success) {
      toast.success("image deleted successfully", { id: toastId });
      onDelete?.();
    } else {
      toast.dismiss(toastId);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className={cn("w-fit", className)}>
          <Trash className="w-4 h-4" /> Trash
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete image and
            remove it from our database
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteImage;
