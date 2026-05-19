import type { SupabaseClient } from "@supabase/supabase-js";
import type { OrderRow } from "@/lib/admin-queries";

export type AutomationEvent =
  | "order.paid"
  | "order.refunded"
  | "cart.abandoned"
  | "cron.daily"
  | "manual.test";

export type AutomationCategory =
  | "fulfillment"
  | "fraud"
  | "loyalty"
  | "inventory"
  | "marketing";

export type AbandonedCartRow = {
  id: string;
  email: string;
  first_name: string | null;
  timestamp: string;
  relance_sent: boolean;
  second_relance_sent: boolean;
  converted: boolean;
};

export type AutomationContext = {
  event: AutomationEvent;
  order?: OrderRow & { risk_level?: string | null };
  abandonedCart?: AbandonedCartRow;
  supabase: SupabaseClient;
};

export type AutomationConfigField = {
  key: string;
  label: string;
  type: "number" | "string" | "email" | "boolean";
  defaultValue: string | number | boolean;
  hint?: string;
  suffix?: string;
};

export type AutomationResult = {
  status: "success" | "skipped" | "error";
  message: string;
  details?: Record<string, unknown>;
};

export type AutomationDef = {
  id: string;
  name: string;
  description: string;
  category: AutomationCategory;
  trigger: { event: AutomationEvent; label: string };
  conditionLabel: string;
  actionLabel: string;
  configSchema: AutomationConfigField[];
  defaultConfig: Record<string, string | number | boolean>;
  defaultActive: boolean;
  run: (
    config: Record<string, string | number | boolean>,
    ctx: AutomationContext,
  ) => Promise<AutomationResult>;
};
