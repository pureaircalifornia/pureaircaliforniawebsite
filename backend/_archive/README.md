# Archived — not deployed, do not import

Moved here 2026-09-18 rather than deleted, per Lou's request. Nothing in the live
app references these files; both `Procfile` and `render.yaml` start `app.main:app`.

| File | Why it is here |
| --- | --- |
| `server.py` | A second, standalone FastAPI app that predates `app/`. It was the only code that pushed leads to Housecall Pro, and it was never the deployed entrypoint. |
| `housecallpro.py` | HCP client used by `server.py`. Auth header is correct (`Authorization: Token`) but it hardcodes `city: "Unknown"` into every address. |
| `app_services/housecall_pro.py` | Second HCP client. Sends `Authorization: Bearer` to a `/v1` base URL — Housecall Pro uses `Token` and no `/v1`. Would fail on every call. |

None of this can work on the current Housecall Pro **Basic** plan, which has no API.
If the plan moves to MAX, start from `housecallpro.py`'s auth and the documented
Create Lead endpoint rather than restoring these as-is.

To restore a file: `git mv _archive/<file> <original path>`.
