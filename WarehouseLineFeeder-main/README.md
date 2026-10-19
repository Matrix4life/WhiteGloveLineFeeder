# White Glove System

White Glove branding for the existing warehouse application.

## Shared database
At the owner's request, this version connects to the same Supabase project and tables as the original application. Both apps share users, requests, chat, assignments, settings and history. Changes or deletions in either app affect that shared database. Existing room names are retained to match shared records.

The connection uses the original public URL and anon key in CONFIG in index.html. No secret or service-role key is embedded. Database permissions and name-only sign-in are inherited; this update does not add secure authentication or audit database access policies.

Browser-only data from the earlier local version is not migrated automatically.

## Deployment
The repository-root vercel.json publishes WarehouseLineFeeder-main as a static site. The app-folder configuration also supports selecting that folder as Vercel's Root Directory. No build command is needed.

For local preview, serve the app folder with a static web server. Internet access is required for the database and existing external libraries.

## Branding and notifications
The old company logo and install icons have been replaced with White Glove branding. Original notification provider credentials remain removed; remote push is not configured. Database live updates are separate from remote push.

The optional index.ts push function is retained as source and is not deployed by this static setup.
