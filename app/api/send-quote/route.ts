import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { fetchQuoteById, updateQuoteStatus } from '../../../lib/db';

const fmt = (n: number) =>
  'RM ' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function buildEmailHtml(quote: Awaited<ReturnType<typeof fetchQuoteById>>): string {
  const subtotal = quote.items.reduce((s, i) => s + i.qty * i.unit_price, 0);
  const tax      = subtotal * 0.06;
  const total    = subtotal + tax;

  const itemRows = quote.items.map(item => `
    <tr>
      <td style="padding:10px 16px;color:#3D2B20;font-size:14px;border-bottom:1px solid #F0EAE0;">${item.service}</td>
      <td style="padding:10px 16px;color:#6B4C40;font-size:14px;text-align:center;border-bottom:1px solid #F0EAE0;">${item.qty}</td>
      <td style="padding:10px 16px;color:#6B4C40;font-size:14px;text-align:right;border-bottom:1px solid #F0EAE0;">${fmt(item.unit_price)}</td>
      <td style="padding:10px 16px;color:#3D2B20;font-size:14px;font-weight:600;text-align:right;border-bottom:1px solid #F0EAE0;">${fmt(item.qty * item.unit_price)}</td>
    </tr>`).join('');

  const notesSection = quote.notes ? `
    <tr>
      <td colspan="2" style="padding:0 40px 24px;">
        <div style="background:#F0EAE0;border-radius:8px;padding:16px;">
          <p style="font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#8C7B74;margin:0 0 6px;">Notes</p>
          <p style="color:#6B4C40;font-size:14px;margin:0;">${quote.notes}</p>
        </div>
      </td>
    </tr>` : '';

  const dateStr = new Date(quote.date).toLocaleDateString('en-MY', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Quotation ${quote.quote_number}</title></head>
<body style="margin:0;padding:0;background:#F0EAE0;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0EAE0;">
    <tr><td align="center" style="padding:40px 20px;">

      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(61,43,32,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:#3D2B20;padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="color:#ffffff;font-size:22px;font-weight:bold;margin:0;">Le Ginn&apos;s Manicure</p>
                  <p style="color:#C9A09A;font-size:13px;margin:4px 0 0;">Professional Nail Services · Kuala Lumpur</p>
                </td>
                <td align="right">
                  <p style="color:#C9A09A;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0;">Quotation</p>
                  <p style="color:#ffffff;font-size:20px;font-weight:bold;font-family:monospace;margin:4px 0 0;">${quote.quote_number}</p>
                  <p style="color:#C9A09A;font-size:12px;margin:4px 0 0;">${dateStr}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Bill To -->
        <tr>
          <td style="padding:32px 40px 24px;">
            <p style="font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#8C7B74;margin:0 0 10px;">Bill To</p>
            <p style="font-size:18px;font-weight:bold;color:#3D2B20;margin:0;">${quote.customers.company}</p>
            <p style="color:#6B4C40;font-size:14px;margin:5px 0 0;">Attn: ${quote.customers.contact}</p>
            <p style="color:#8C7B74;font-size:14px;margin:3px 0 0;">${quote.customers.email}</p>
            ${quote.customers.phone ? `<p style="color:#8C7B74;font-size:14px;margin:3px 0 0;">${quote.customers.phone}</p>` : ''}
          </td>
        </tr>

        <!-- Items table -->
        <tr>
          <td style="padding:0 40px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8D5D0;border-radius:10px;overflow:hidden;">
              <thead>
                <tr style="background:#F0EAE0;">
                  <th style="padding:11px 16px;text-align:left;font-size:11px;color:#8C7B74;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Service</th>
                  <th style="padding:11px 16px;text-align:center;font-size:11px;color:#8C7B74;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Qty</th>
                  <th style="padding:11px 16px;text-align:right;font-size:11px;color:#8C7B74;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Unit Price</th>
                  <th style="padding:11px 16px;text-align:right;font-size:11px;color:#8C7B74;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Amount</th>
                </tr>
              </thead>
              <tbody style="background:#ffffff;">
                ${itemRows}
              </tbody>
            </table>

            <!-- Totals -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
              <tr>
                <td style="color:#8C7B74;font-size:14px;padding:5px 0;">Subtotal</td>
                <td align="right" style="color:#3D2B20;font-size:14px;padding:5px 0;">${fmt(subtotal)}</td>
              </tr>
              <tr>
                <td style="color:#8C7B74;font-size:14px;padding:5px 0;">SST (6%)</td>
                <td align="right" style="color:#3D2B20;font-size:14px;padding:5px 0;">${fmt(tax)}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding:0;"><div style="height:2px;background:#E8D5D0;margin:10px 0;"></div></td>
              </tr>
              <tr>
                <td style="color:#3D2B20;font-size:17px;font-weight:bold;padding:4px 0;">Total</td>
                <td align="right" style="color:#A0706A;font-size:20px;font-weight:bold;padding:4px 0;">${fmt(total)}</td>
              </tr>
            </table>
          </td>
        </tr>

        ${notesSection}

        <!-- Footer -->
        <tr>
          <td style="background:#F0EAE0;padding:24px 40px;text-align:center;border-top:1px solid #E8D5D0;">
            <p style="color:#8C7B74;font-size:13px;margin:0;">Thank you for considering Le Ginn&apos;s Manicure.</p>
            <p style="color:#8C7B74;font-size:12px;margin:6px 0 0;">This quotation is valid for <strong>30 days</strong> from the date above.</p>
            <p style="color:#C9A09A;font-size:12px;margin:6px 0 0;">hello@leginns.com &nbsp;·&nbsp; +60 11-1234 5678</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const { quoteId } = await request.json();
    if (!quoteId) {
      return NextResponse.json({ error: 'quoteId is required' }, { status: 400 });
    }

    const apiKey = (process.env.RESEND_API_KEY ?? '').trim();
    if (!apiKey || apiKey === 're_placeholder') {
      return NextResponse.json({ error: 'RESEND_API_KEY is not configured.' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const quote  = await fetchQuoteById(quoteId);
    const html   = buildEmailHtml(quote);

    const from = (process.env.RESEND_FROM_EMAIL ?? '').trim() || "Le Ginn Manicure <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to:      [quote.customers.email],
      subject: `Quotation ${quote.quote_number} from Le Ginn's Manicure`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await updateQuoteStatus(quoteId, 'Sent');

    return NextResponse.json({ success: true, quoteNumber: quote.quote_number });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    console.error('send-quote error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
