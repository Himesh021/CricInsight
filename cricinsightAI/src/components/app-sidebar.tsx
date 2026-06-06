import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Activity,
  Users,
  Shield,
  TrendingUp,
  Trophy,
  Sparkles,
  History,
  Bot,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Momentum", url: "/momentum", icon: Activity },
  { title: "Players", url: "/players", icon: Users },
  { title: "Teams", url: "/teams", icon: Shield },
  { title: "Win Probability", url: "/predictions", icon: TrendingUp },
  { title: "Milestones", url: "/milestones", icon: Trophy },
  { title: "Fantasy", url: "/fantasy", icon: Sparkles },
  { title: "Trends", url: "/trends", icon: History },
  { title: "AI Insights", url: "/insights", icon: Bot },
];

export function AppSidebar() {
  const currentPath = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-4 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
            <span className="text-lg font-black">C</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight">CricInsight</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              AI Analytics
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  item.url === "/" ? currentPath === "/" : currentPath.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
