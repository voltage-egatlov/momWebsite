import SidebarShell from "@/components/Sidebar";

export default function AboutPage() {
  return (
    <SidebarShell>
      <div className="flex items-center justify-center min-h-[50vh] px-6 py-8">
        <p className="text-xs tracking-widest uppercase text-[var(--color-muted)]">
          About — coming soon
        </p>
      </div>
    </SidebarShell>
  );
}
