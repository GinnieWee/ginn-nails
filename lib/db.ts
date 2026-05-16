import { supabase } from './supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Customer = {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  created_at: string;
};

export type QuoteStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected';

export type Quote = {
  id: string;
  quote_number: string;
  customer_id: string;
  date: string;
  status: QuoteStatus;
  notes: string;
  created_at: string;
  customers?: Pick<Customer, 'company' | 'contact' | 'email'>;
};

export type QuoteItem = {
  id: string;
  quote_id: string;
  service: string;
  qty: number;
  unit_price: number;
};

// ─── Customers ────────────────────────────────────────────────────────────────

export async function fetchCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function insertCustomer(
  input: Omit<Customer, 'id' | 'created_at'>
): Promise<Customer> {
  const { data, error } = await supabase
    .from('customers')
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Quotes ───────────────────────────────────────────────────────────────────

export async function fetchQuotes(): Promise<Quote[]> {
  const { data, error } = await supabase
    .from('quotes')
    .select('*, customers(company, contact, email)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Quote[];
}

export async function fetchQuoteItems(quoteId: string): Promise<QuoteItem[]> {
  const { data, error } = await supabase
    .from('quote_items')
    .select('*')
    .eq('quote_id', quoteId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createQuoteWithItems(
  quoteData: {
    customer_id: string;
    date: string;
    status: QuoteStatus;
    notes: string;
  },
  items: { service: string; qty: number; unit_price: number }[]
): Promise<Quote> {
  // Generate the next quote number
  const { count } = await supabase
    .from('quotes')
    .select('*', { count: 'exact', head: true });
  const quoteNumber = 'QT-' + String((count ?? 0) + 1).padStart(4, '0');

  // Insert quote
  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .insert({ ...quoteData, quote_number: quoteNumber })
    .select('*, customers(company, contact, email)')
    .single();
  if (quoteError) throw quoteError;

  // Insert items
  const { error: itemsError } = await supabase
    .from('quote_items')
    .insert(items.map(i => ({ ...i, quote_id: quote.id })));
  if (itemsError) throw itemsError;

  return quote as Quote;
}

export async function updateQuoteStatus(
  id: string,
  status: QuoteStatus
): Promise<void> {
  const { error } = await supabase
    .from('quotes')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
}

// ─── Single quote (detail view) ───────────────────────────────────────────────

export type FullQuote = Quote & {
  customers: Customer;
  items: QuoteItem[];
};

export async function fetchQuoteById(id: string): Promise<FullQuote> {
  const { data: quote, error: qErr } = await supabase
    .from('quotes')
    .select('*, customers(*)')
    .eq('id', id)
    .single();
  if (qErr) throw qErr;

  const { data: items, error: iErr } = await supabase
    .from('quote_items')
    .select('*')
    .eq('quote_id', id)
    .order('created_at', { ascending: true });
  if (iErr) throw iErr;

  return { ...quote, items: items ?? [] } as FullQuote;
}

// ─── Dashboard stats ──────────────────────────────────────────────────────────

export async function fetchDashboardStats() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('status')
    .gte('created_at', startOfMonth.toISOString());
  if (error) throw error;

  const all      = quotes ?? [];
  const accepted = all.filter(q => q.status === 'Accepted').length;
  const pending  = all.filter(q => q.status === 'Draft' || q.status === 'Sent').length;
  const rejected = all.filter(q => q.status === 'Rejected').length;

  return { total: all.length, accepted, pending, rejected };
}

export async function fetchRecentQuotes(limit = 5): Promise<Quote[]> {
  const { data, error } = await supabase
    .from('quotes')
    .select('*, customers(company, contact, email)')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Quote[];
}
