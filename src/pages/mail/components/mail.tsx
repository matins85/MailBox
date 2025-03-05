import Error from "@/components/Error";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { fetchItems } from "@/utils/api";
import { ApiResponse, Message } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";
import * as React from "react";
import { useMail } from "../use-mail";
import { MailDisplay } from "./mail-display";
import { MailList } from "./mail-list";
import { Nav } from "./nav";

interface MailProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({
  defaultLayout = [20, 80, 80],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();

  const [isHideMailList, setHideMailList] = React.useState<boolean>(false);

  const toggleHideMailList = () => {
    setHideMailList((prev) => !prev);
  };

  const [messages, setMessages] = React.useState<Message[]>();

  const { data, isLoading, error, refetch } = useQuery<ApiResponse>({
    queryKey: ["user-messages"],
    queryFn: () => fetchItems("messages/user-messages"),
    retry: 1,
    enabled: !messages,
  });

  React.useEffect(() => {
    if (data?.success && data?.data?.messages) {
      setMessages(data.data.messages);
    }
  }, [data]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-screen items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out",
            "hidden lg:block"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          ></div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Inbox",
                label: "4",
                icon: Inbox,
                variant: "default",
              },
              {
                title: "Drafts",
                label: "0",
                icon: File,
                variant: "ghost",
              },
              {
                title: "Sent",
                label: "",
                icon: Send,
                variant: "ghost",
              },
              {
                title: "Junk",
                label: "0",
                icon: ArchiveX,
                variant: "ghost",
              },
              {
                title: "Trash",
                label: "",
                icon: Trash2,
                variant: "ghost",
              },
              {
                title: "Archive",
                label: "",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Social",
                label: "0",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Updates",
                label: "0",
                icon: AlertCircle,
                variant: "ghost",
              },
              {
                title: "Forums",
                label: "0",
                icon: MessagesSquare,
                variant: "ghost",
              },
              {
                title: "Shopping",
                label: "0",
                icon: ShoppingCart,
                variant: "ghost",
              },
              {
                title: "Promotions",
                label: "0",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        {/*  */}
        <ResizableHandle
          className={cn(isHideMailList && "hidden", "block")}
          withHandle
        />
        {/*  */}
        {!isHideMailList && (
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <Tabs defaultValue="all">
              <div className="flex items-center px-4 py-2">
                <h1 className="text-xl font-bold dark:text-zinc-200">Inbox</h1>
                <TabsList className="ml-auto">
                  <TabsTrigger
                    value="all"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    All mail
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    Unread
                  </TabsTrigger>
                </TabsList>
              </div>
              <Separator />
              <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search"
                      className="pl-8 dark:text-zinc-200"
                    />
                  </div>
                </form>
              </div>

              {isLoading ? (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4"
                    >
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </>
              ) : error ? (
                <Error message={"Something went wrong"} onRetry={refetch} />
              ) : (
                <>
                  <TabsContent value="all" className="m-0">
                    <MailList
                      showMailContent={toggleHideMailList}
                      items={messages ?? []}
                    />
                  </TabsContent>
                  <TabsContent value="unread" className="m-0">
                    <MailList
                      showMailContent={toggleHideMailList}
                      items={(messages ?? []).filter((item) => !item.isRead)}
                    />
                  </TabsContent>
                </>
              )}
            </Tabs>
          </ResizablePanel>
        )}
        {/*  */}

        <ResizableHandle
          withHandle
          className={cn(isHideMailList && "block", "hidden")}
        />
        {isHideMailList && (
          <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
            <MailDisplay
              mail={
                (messages ?? []).find((item) => item._id === mail.selected) ||
                null
              }
              hideMailList={toggleHideMailList}
            />
          </ResizablePanel>
        )}
        {/*  */}
      </ResizablePanelGroup>
      {/*  */}
    </TooltipProvider>
  );
}
