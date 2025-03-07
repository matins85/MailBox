import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateItem } from "@/utils/api";
import { ApiResponse, Message } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Archive, ArchiveX, ChevronLeft, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface MailDisplayProps {
  mail: Message | null | undefined;
  hideMailList: () => void;
  updateMessageType: (prevMessageType: string, messageType: string) => void;
}

export function MailDisplay({
  mail,
  hideMailList,
  updateMessageType,
}: MailDisplayProps) {
  const [messageType, setMessageType] = React.useState({
    messageId: "",
    recipient: "",
    type: "",
  });

  const { data, isLoading, refetch } = useQuery<ApiResponse>({
    queryKey: ["update-messages", messageType],
    queryFn: () => updateItem("messages/update-message", messageType),
    retry: 0,
    enabled: false,
    gcTime: 0,
    staleTime: 0,
  });

  React.useEffect(() => {
    if (data && data?.success) {
      updateMessageType(mail?.type || "inbox", messageType.type || "inbox");
      toast(`Successfully moved to ${messageType.type}`);
    } else if (data && !data?.success) {
      toast("Something went wrong, please try again");
    }
  }, [data]);

  return (
    <div className="flex h-full flex-col text-foreground">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="lg:hidden"
                onClick={hideMailList}
                variant="ghost"
                disabled={!mail}
              >
                <ChevronLeft /> Back
                <span className="sr-only">Back</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Back</TooltipContent>
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {mail?.type !== "archive" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    setMessageType((prev) => ({
                      ...prev,
                      messageId: mail?._id || "",
                      recipient: mail?.recipient || "",
                      type: "archive",
                    }));
                    setTimeout(() => {
                      refetch();
                    }, 100);
                  }}
                  variant="ghost"
                  size="icon"
                  disabled={!mail || isLoading}
                >
                  <Archive className="h-4 w-4" />
                  <span className="sr-only">Archive</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>
          )}
          {mail?.type !== "junk" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    setMessageType((prev) => ({
                      ...prev,
                      messageId: mail?._id || "",
                      recipient: mail?.recipient || "",
                      type: "junk",
                    }));
                    setTimeout(() => {
                      refetch();
                    }, 100);
                  }}
                  variant="ghost"
                  size="icon"
                  disabled={!mail || isLoading}
                >
                  <ArchiveX className="h-4 w-4" />
                  <span className="sr-only">Move to junk</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move to junk</TooltipContent>
            </Tooltip>
          )}
          {mail?.type !== "trash" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    setMessageType((prev) => ({
                      ...prev,
                      messageId: mail?._id || "",
                      recipient: mail?.recipient || "",
                      type: "trash",
                    }));
                    setTimeout(() => {
                      refetch();
                    }, 100);
                  }}
                  variant="ghost"
                  size="icon"
                  disabled={!mail || isLoading}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Move to trash</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move to trash</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      <Separator />
      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={mail.sender.first_name} />
                <AvatarFallback>
                  {mail.sender.first_name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">
                  {mail.sender.first_name} {mail.sender.last_name}
                </div>
                <div className="line-clamp-1 text-xs">{mail.subject}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span>{" "}
                  {mail.sender.first_name}
                </div>
              </div>
            </div>
            {mail.created_at && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(mail.created_at), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {mail.content}
          </div>
          <Separator className="mt-auto" />
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
