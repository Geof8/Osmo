import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type {
  NewsletterQueueRow,
  NewsletterSubscriberRow,
} from "@/lib/newsletter";

function isMissingTableError(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  if (error.code === "42P01") return true;
  return /relation .* does not exist/i.test(error.message ?? "");
}

export type NewsletterStats = {
  activeSubscribers: number;
  totalSubscribers: number;
  sentCount: number;
};

export async function fetchNewsletterStats(): Promise<NewsletterStats> {
  const supabase = getSupabaseAdmin();

  const [activeRes, totalRes, sentRes] = await Promise.all([
    supabase
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true })
      .eq("active", true),
    supabase
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("newsletter_queue")
      .select("*", { count: "exact", head: true })
      .not("sent_at", "is", null)
      .eq("cancelled", false),
  ]);

  return {
    activeSubscribers: isMissingTableError(activeRes.error)
      ? 0
      : activeRes.count ?? 0,
    totalSubscribers: isMissingTableError(totalRes.error)
      ? 0
      : totalRes.count ?? 0,
    sentCount: isMissingTableError(sentRes.error) ? 0 : sentRes.count ?? 0,
  };
}

export async function fetchPendingNewsletter(): Promise<NewsletterQueueRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("newsletter_queue")
    .select("*")
    .is("sent_at", null)
    .order("generated_at", { ascending: false })
    .limit(1);
  if (error) {
    if (isMissingTableError(error)) return null;
    console.error("fetchPendingNewsletter:", error);
    return null;
  }
  return (data?.[0] as NewsletterQueueRow | undefined) ?? null;
}

export async function fetchNewsletterHistory(): Promise<NewsletterQueueRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("newsletter_queue")
    .select("*")
    .order("generated_at", { ascending: false })
    .limit(50);
  if (error) {
    if (isMissingTableError(error)) return [];
    console.error("fetchNewsletterHistory:", error);
    return [];
  }
  return (data ?? []) as NewsletterQueueRow[];
}

export async function fetchSubscribers(): Promise<NewsletterSubscriberRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });
  if (error) {
    if (isMissingTableError(error)) return [];
    console.error("fetchSubscribers:", error);
    return [];
  }
  return (data ?? []) as NewsletterSubscriberRow[];
}
