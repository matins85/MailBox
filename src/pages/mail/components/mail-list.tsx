import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Message } from "@/utils/interface";
import { formatDistanceToNow } from "date-fns";
import { useMail } from "../use-mail";
import EmptyState from "@/components/empty-state";

interface MailListProps {
  items: Message[];
  showMailContent: () => void;
}

export function MailList({ items, showMailContent }: MailListProps) {
  const [mail, setMail] = useMail();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items?.length > 0 ? (
          items.map((item) => (
            <button
              key={item._id}
              className={cn(
                "cursor-pointer flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent dark:border-primary-foreground",
                mail.selected === item._id && "bg-muted"
              )}
              onClick={() => {
                setMail({
                  ...mail,
                  selected: item._id,
                });
                showMailContent();
              }}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-foreground">
                      {item.sender.first_name} {item.sender.last_name}
                    </div>
                    {!item.isRead && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      mail.selected === item._id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {formatDistanceToNow(new Date(item.created_at), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="text-xs font-medium dark:text-zinc-100">
                  {item.subject}
                </div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.content?.substring(0, 300) || ""}
              </div>
            </button>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </ScrollArea>
  );
}
