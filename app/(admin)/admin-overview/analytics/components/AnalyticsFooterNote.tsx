import type { ReactNode } from "react";

type AnalyticsFooterNoteProps = {
  children?: ReactNode;
};

export function AnalyticsFooterNote({ children }: AnalyticsFooterNoteProps) {
  return <div className="ao-footer-note">{children}</div>;
}
