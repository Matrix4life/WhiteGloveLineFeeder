# White Glove System

A rebranded copy of the supplied warehouse application. Includes requests, picking, delivery tracking, chat, assignments, dashboards and 5S tools.

## Start
Serve this folder using a static web server, or deploy it to static hosting. For a local preview, run `python3 -m http.server 8000` from this folder, then open http://localhost:8000. Internet access is needed for the existing React, Babel and Supabase libraries.

Enter your name on first launch to create the local administrator, then add team members in Admin Panel.

## Current operating mode
This copy starts in local browser storage mode with its own storage keys. Data is limited to that browser; it is not shared across devices. The original database address, API key, push key and notification app ID have been removed. No live database was changed.

To enable shared operation, provision a separate database, supply its URL and public key in CONFIG in index.html, and enable ENABLE_SUPABASE. This archive does not include a complete database migration. Review and implement authentication and database access policies before production use: the inherited name-only sign-in is not secure authentication.

Remote push is disabled pending configuration of a new provider and keys. The optional index.ts push function is retained as source and is not deployed. A new notification integration needs initialization code as well as credentials.

## Branding and defaults
Replaced the embedded company logo with a White Glove wordmark, replaced all install icons with WG monograms, and updated the page title, app manifest, service worker cache and header branding. Facility room names now default to Line 1, Line 2, Line 3 and Packing; housekeeping areas have generic names. Adjust room lists and warehouse mappings for your operation before rollout.

Warehouse workflows are inherited from the supplied project. This is a branding and isolation update, not a production security audit or a newly implemented premium-delivery workflow.
