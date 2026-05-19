import type { AutomationDef } from "./types";

import { abandonedCart1h } from "./workflows/abandoned-cart-1h";
import { abandonedCart24h } from "./workflows/abandoned-cart-24h";
import { autoTagFounder } from "./workflows/auto-tag-founder";
import { autoTagVip } from "./workflows/auto-tag-vip";
import { fraudHold } from "./workflows/fraud-hold";
import { fulfillmentSla } from "./workflows/fulfillment-sla";
import { lowStockAlert } from "./workflows/low-stock-alert";
import { promoExhaustedDisable } from "./workflows/promo-exhausted-disable";
import { postDeliveryD7 } from "./workflows/post-delivery-d7";
import { npsD30 } from "./workflows/nps-d30";

export const AUTOMATIONS: AutomationDef[] = [
  abandonedCart1h,
  abandonedCart24h,
  autoTagFounder,
  autoTagVip,
  fraudHold,
  fulfillmentSla,
  lowStockAlert,
  promoExhaustedDisable,
  postDeliveryD7,
  npsD30,
];

export function getAutomationDef(id: string): AutomationDef | undefined {
  return AUTOMATIONS.find((a) => a.id === id);
}

export type {
  AutomationDef,
  AutomationContext,
  AutomationResult,
  AutomationCategory,
  AutomationEvent,
  AutomationConfigField,
} from "./types";
