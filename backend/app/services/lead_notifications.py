"""Best-effort receipt email and owner alert after a lead is persisted.

Security: all customer-controlled values (name, email, phone, service,
address, message) are html.escape()d before interpolation into HTML to
prevent XSS / HTML-injection in owner-facing emails.  The owner subject
line has CR/LF stripped to prevent email header injection.
"""
import logging
from html import escape
from urllib.parse import quote
from uuid import UUID

from .email_sender import send_transactional_email
from ..config import get_settings

logger = logging.getLogger(__name__)


def _email_shell(preheader: str, title: str, body: str) -> str:
    """Wrap trusted template HTML; every customer value is escaped by its caller."""
    return f"""<!doctype html>
    <html lang="en"><head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"></head>
    <body style="margin:0;padding:0;background-color:#f2f7f7;color:#233743;font-family:Arial,Helvetica,sans-serif;">
      <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">{escape(preheader)}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f7f7;">
        <tr><td align="center" style="padding:24px 12px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;border-top:5px solid #167c80;">
            <tr><td style="padding:28px 24px 20px;border-bottom:1px solid #deebeb;">
              <a href="https://www.pureaircalifornia.com/" style="color:#0A3D7C;text-decoration:none;font-size:22px;font-weight:bold;">Pure Air California</a>
              <p style="margin:8px 0 0;color:#526c75;font-size:12px;letter-spacing:1px;">THOUGHTFUL CARE. FROM THE INSIDE OUT.</p>
            </td></tr>
            <tr><td style="padding:28px 24px;font-size:16px;line-height:1.6;">
              <h1 style="margin:0 0 20px;color:#0A3D7C;font-size:26px;line-height:1.25;">{escape(title)}</h1>
              {body}
            </td></tr>
            <tr><td style="padding:20px 24px;background-color:#edf6f5;font-size:13px;line-height:1.6;color:#526c75;">
              <p style="margin:0 0 6px;">Pure Air California · Los Angeles &amp; nearby communities</p>
              <p style="margin:0;"><a href="https://www.pureaircalifornia.com/" style="color:#0A3D7C;">Visit our website</a>
                &nbsp;·&nbsp; <a href="tel:+12137924145" style="color:#0A3D7C;">(213) 792-4145</a></p>
              <p style="margin:8px 0 0;">Phone hours: 9 a.m.–10 p.m. Pacific.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>"""


def _autoreply_html(name: str, submission_id: str = "") -> str:
    names = (name or "").split()
    first = escape(names[0] if names else "there")
    reference = (
        '<p style="margin:20px 0 0;font-size:12px;color:#526c75;">Request reference<br>'
        f'<span style="word-break:break-all;">{escape(submission_id)}</span></p>'
        if submission_id else ""
    )
    return _email_shell(
        "Your request is recorded. PAC will review the details and contact you about next steps.",
        "Your request is received.",
        f"""<p style="margin:0 0 16px;">Thank you, {first}.</p>
        <p style="margin:0 0 20px;">We’ve recorded your website request. Our team will review the property and service details, then contact you to discuss the next step.</p>
        <h2 style="margin:24px 0 10px;color:#0A3D7C;font-size:18px;">What happens next</h2>
        <ol style="margin:0 0 20px;padding-left:22px;">
          <li style="margin-bottom:8px;">We review the service you need and the property location.</li>
          <li style="margin-bottom:8px;">We discuss the systems, access and proposed scope with you.</li>
          <li>You review the estimate and available work windows before deciding to proceed.</li>
        </ol>
        <p style="margin:20px 0;">Need to add details? Call us with the property ZIP code, number of systems and any access requirements. Have your request reference ready if one is shown below.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="background-color:#0A3D7C;border-radius:4px;"><a href="tel:+12137924145" style="display:inline-block;padding:12px 18px;color:#ffffff;text-decoration:none;font-weight:bold;">Call (213) 792-4145</a></td>
        </tr></table>
        <p style="margin:20px 0 0;padding:14px;background-color:#f2f7f7;font-size:14px;">This receipt does not confirm an appointment or final price.</p>
        {reference}""",
    )


def _owner_html(lead: dict) -> str:
    dialable_phone = "".join(char for char in str(lead.get("phone") or "") if char in "+0123456789")
    # Query/fragment characters can be legal in an email local part. Preserve
    # them there, but discard any appended mailto parameters after the domain.
    # Encode reserved characters (including percent) before building the href.
    raw_email = str(lead.get("email") or "")
    local, separator, domain = raw_email.partition("@")
    if separator:
        raw_email = local + separator + domain.split("?", 1)[0].split("#", 1)[0]
    else:
        raw_email = raw_email.split("?", 1)[0].split("#", 1)[0]
    raw_email = "".join(char for char in raw_email if ord(char) >= 32 and ord(char) != 127)
    email_href = escape(quote(raw_email, safe="@."))
    rows = []
    for label, key in [
        ("Name", "name"), ("Phone", "phone"), ("Email", "email"),
        ("Service", "service"), ("Property", "property_type"),
        ("Approx. sq. ft.", "square_footage"), ("Location / ZIP", "address"),
        ("Requested timing", "preferred_date"), ("Form source", "source"),
        ("Request reference", "submission_id"), ("Lead record", "id"),
    ]:
        value = lead.get(key)
        if value is None or not str(value).strip():
            continue
        rendered = escape(str(value))
        if key == "phone" and any(char.isdigit() for char in dialable_phone):
            rendered = f"<a href='tel:{dialable_phone}' style='color:#0A3D7C;'>{rendered}</a>"
        elif key == "email" and raw_email:
            rendered = f"<a href='mailto:{email_href}' style='color:#0A3D7C;'>{rendered}</a>"
        rows.append(
            '<tr><th scope="row" width="30%" style="padding:10px 8px 10px 0;'
            'border-bottom:1px solid #deebeb;text-align:left;vertical-align:top;font-size:13px;'
            f'color:#526c75;">{label}</th><td style="padding:10px 0;border-bottom:1px solid #deebeb;'
            f'word-break:break-word;overflow-wrap:anywhere;vertical-align:top;">{rendered}</td></tr>'
        )
    message = lead.get("message")
    message_html = (
        '<h2 style="margin:24px 0 10px;color:#0A3D7C;font-size:18px;">Customer details</h2>'
        '<p style="margin:0;padding:14px;background-color:#f2f7f7;white-space:pre-wrap;'
        f'word-break:break-word;overflow-wrap:anywhere;">{escape(str(message))}</p>'
        if message and str(message).strip() else ""
    )
    return _email_shell(
        "A website inquiry has been recorded. Review the details and follow up.",
        "New website inquiry.",
        '<p style="margin:0 0 20px;">A request has been recorded. Contact the customer to confirm the property, service and next step.</p>'
        '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:14px;">'
        + "".join(rows) + "</table>" + message_html
        + '<h2 style="margin:24px 0 10px;color:#0A3D7C;font-size:18px;">Follow-up checklist</h2>'
        '<ol style="margin:0;padding-left:22px;">'
        '<li style="margin-bottom:8px;">Confirm service area, system scope and the person authorized to approve the work.</li>'
        '<li style="margin-bottom:8px;">Discuss access, timing and the estimate before scheduling.</li>'
        '<li>Record the qualification outcome and next action in the lead record.</li></ol>'
        '<p style="margin:20px 0 0;font-size:13px;color:#526c75;">Accepted intake only. This is not a qualified lead, booked job or revenue confirmation.</p>',
    )


async def send_lead_notifications(lead: dict) -> None:
    """Best-effort; never raises into the request path."""
    settings = get_settings()
    # Only lead notifications opt into Resend; other shared-sender callers
    # retain their existing SendGrid behavior.
    use_resend = bool(settings.RESEND_API_KEY)
    # Stable, purpose-specific keys contain no customer information. Resend's
    # provider deduplication lasts 24 hours; Mongo receipt deduplication persists.
    try:
        submission_id = str(UUID(str(lead.get("submission_id", ""))))
    except ValueError:
        submission_id = None
    if lead.get("email"):
        try:
            await send_transactional_email(
                lead["email"], "We received your request — Pure Air California",
                _autoreply_html(lead.get("name", ""), submission_id or ""), settings,
                idempotency_key=f"website-lead-receipt:{submission_id}" if submission_id else None,
                use_resend=use_resend)
        except Exception:
            logger.warning("Lead receipt notification failed; not retried")
    if settings.OWNER_NOTIFY_EMAIL:
        try:
            # Strip CR/LF from customer name to prevent subject-line header injection
            raw_name = (lead.get("name") or "Unknown").replace("\r", " ").replace("\n", " ")
            raw_service = (lead.get("service") or "").replace("\r", " ").replace("\n", " ")
            subject = f"New website request: {raw_name} ({raw_service})"
            await send_transactional_email(
                settings.OWNER_NOTIFY_EMAIL,
                subject,
                _owner_html(lead), settings,
                idempotency_key=f"website-lead-owner:{submission_id}" if submission_id else None,
                use_resend=use_resend)
        except Exception:
            logger.warning("Lead owner notification failed; not retried")
