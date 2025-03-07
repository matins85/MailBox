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
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { fetchItems } from "@/utils/api";
import { ApiResponse, Message, messageTypeStat } from "@/utils/interface";
import { getStorageUser } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import {
  Archive,
  ArchiveX,
  File,
  Inbox,
  Search,
  Send,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
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
  defaultLayout = [20, 30, 50],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [, setSearchParams] = useSearchParams();

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail, setMail] = useMail();
  const [stats, setStats] = React.useState<messageTypeStat>(
    () => getStorageUser()?.messageTypeStats ?? { stats: {} }
  );

  const [isSmallScreen, setIsSmallScreen] = React.useState(
    window.innerWidth < 1024
  );

  const [isHideMailList, setHideMailList] = React.useState<boolean>(false);
  const [messages, setMessages] = React.useState<Message[]>();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchType, setSearchType] = React.useState("");

  const debouncedSearch = useDebounce(searchTerm || "", 800);

  const getFilterParams = () => {
    const filter: Record<string, string> = {};

    filter["type"] = searchType || "inbox";

    if (debouncedSearch.trim()) {
      filter["search"] = debouncedSearch.trim();
    }

    return new URLSearchParams(filter).toString();
  };

  const { data, isLoading, error, refetch } = useQuery<ApiResponse>({
    queryKey: ["user-messages", debouncedSearch, searchType],
    queryFn: () => fetchItems(`messages/user-messages?${getFilterParams()}`),
    retry: 1,
    enabled: !messages,
    gcTime: 0,
    staleTime: 0,
  });

  React.useEffect(() => {
    if (data?.success && Array.isArray(data?.data?.messages)) {
      setMessages(data.data.messages);

      if (data.data.messages.length > 0) {
        setMail({
          ...data.data.messages[0],
          selected: data.data.messages[0]._id,
        });
      }
    }
  }, [data]);

  React.useEffect(() => {
    setMessages(undefined);
  }, [debouncedSearch, searchType]);

  const toggleHideMailList = () => {
    setHideMailList((prev) => !prev);
  };

  const updateStats = (stats?: messageTypeStat) => {
    const storedUser = getStorageUser();

    setStats((prev) => ({
      ...prev,
      ...(stats ? stats : storedUser.messageTypeStats),
    }));
  };

  const moveMessageType = (
    prevType: keyof messageTypeStat,
    newType: keyof messageTypeStat
  ) => {
    updateStats({
      ...stats,
      [newType]: (stats[newType] || 0) + 1,
      [prevType]: Math.max((stats[prevType] || 0) - 1, 0),
    });

    setSearchParams({ type: newType });
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            toggleNavtype={(navType) => {
              setSearchType(navType);
              setMessages(undefined);
            }}
            links={[
              {
                title: "Inbox",
                label: stats?.inbox || 0,
                icon: Inbox,
                variant: "ghost",
              },
              {
                title: "Drafts",
                label: stats?.drafts || 0,
                icon: File,
                variant: "ghost",
              },
              {
                title: "Sent",
                label: stats?.sent || 0,
                icon: Send,
                variant: "ghost",
              },
              {
                title: "Junk",
                label: stats?.junk || 0,
                icon: ArchiveX,
                variant: "ghost",
              },
              {
                title: "Trash",
                label: stats?.trash || 0,
                icon: Trash2,
                variant: "ghost",
              },
              {
                title: "Archive",
                label: stats?.archive || 0,
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
        </ResizablePanel>

        {/*  */}
        <ResizableHandle
          className={cn(isSmallScreen ? "hidden" : "block")}
          withHandle
        />
        {/*  */}

        <ResizablePanel
          className={cn(
            !isSmallScreen ? "block" : !isHideMailList ? "block" : "hidden"
          )}
          defaultSize={defaultLayout[1]}
          minSize={30}
        >
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
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8 dark:text-zinc-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
            </div>

            {isLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4">
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
        {/*  */}

        <ResizableHandle
          withHandle
          className={cn(!isSmallScreen ? "block" : "hidden")}
        />

        <ResizablePanel
          className={cn(
            !isSmallScreen ? "block" : isHideMailList ? "block" : "hidden"
          )}
          defaultSize={defaultLayout[2]}
          minSize={30}
        >
          <MailDisplay
            mail={
              (messages ?? []).find((item) => item._id === mail.selected) ||
              null
            }
            hideMailList={toggleHideMailList}
            updateMessageType={(prevType, newType) =>
              moveMessageType(
                prevType as keyof messageTypeStat,
                newType as keyof messageTypeStat
              )
            }
          />
        </ResizablePanel>
        {/*  */}
      </ResizablePanelGroup>
      {/*  */}
    </TooltipProvider>
  );
}
