import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string | number;
    icon: LucideIcon;
    variant: "default" | "ghost";
  }[];
  toggleNavtype: (navType: string) => void;
}

export function Nav({ links, isCollapsed, toggleNavtype }: NavProps) {
  const [activeNav, setActiveNav] = useState<string>("inbox");

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid text-foreground gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to="#"
                  className={cn(
                    buttonVariants({
                      variant:
                        activeNav === link.title.toLowerCase()
                          ? "default"
                          : "ghost",
                      size: "icon",
                    }),
                    "h-9 w-9",
                    activeNav === link.title.toLowerCase() &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              to="#"
              className={cn(
                buttonVariants({
                  variant:
                    activeNav === link.title.toLowerCase()
                      ? "default"
                      : "ghost",
                  size: "sm",
                }),
                activeNav === link.title.toLowerCase() &&
                  "dark:bg-muted py-5 dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start py-5"
              )}
              onClick={() => {
                setActiveNav(link.title.toLowerCase());
                toggleNavtype(link.title.toLowerCase());
              }}
            >
              <div className="flex justify-between items-center gap-x-1 w-full">
                <div className="flex justify-between items-center gap-x-1">
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                </div>
                {/*  */}
                <div>
                  {link.label && (
                    <span
                      className={cn(
                        "ml-auto",
                        activeNav === link.title.toLowerCase() &&
                          "text-background dark:text-white"
                      )}
                    >
                      {link.label}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
