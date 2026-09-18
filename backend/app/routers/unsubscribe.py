"""
Public unsubscribe endpoint (no auth).

Backs the RFC 8058 List-Unsubscribe / List-Unsubscribe-Post headers on outreach
emails. Gmail and Yahoo POST here for one-click unsubscribe; humans GET here when
they click the link. Both record the address in the suppression list.
"""
import logging

from fastapi import APIRouter, Query
from fastapi.responses import HTMLResponse, JSONResponse

from ..services.suppression import add_suppression, verify_unsubscribe_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/unsubscribe", tags=["Unsubscribe"])

_CONFIRM_HTML = """<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="robots" content="noindex"><title>Unsubscribed</title>
<style>body{{font-family:sans-serif;max-width:520px;margin:80px auto;padding:0 20px;color:#1f2937;text-align:center}}
h1{{color:#0ea5e9}}</style></head><body>
<h1>You're unsubscribed</h1>
<p>{message}</p>
<p style="color:#6b7280;font-size:14px">Pure Air California · (213) 792-4145</p>
</body></html>"""


async def _process(email: str, token: str) -> bool:
    if not email or not verify_unsubscribe_token(email, token):
        return False
    await add_suppression(email, reason="unsubscribe")
    return True


@router.get("", response_class=HTMLResponse)
async def unsubscribe_get(
    email: str = Query(...),
    token: str = Query(...),
):
    """Human-facing unsubscribe (link click)."""
    ok = await _process(email, token)
    msg = (
        f"<strong>{email}</strong> will no longer receive emails from us."
        if ok
        else "This unsubscribe link is invalid or expired."
    )
    return HTMLResponse(
        _CONFIRM_HTML.format(message=msg),
        status_code=200 if ok else 400,
    )


@router.post("")
async def unsubscribe_post(
    email: str = Query(...),
    token: str = Query(...),
):
    """One-click unsubscribe (RFC 8058) — called automatically by Gmail/Yahoo."""
    ok = await _process(email, token)
    return JSONResponse(
        {"success": ok},
        status_code=200 if ok else 400,
    )
