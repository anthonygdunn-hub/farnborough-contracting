#!/usr/bin/env bash
# ===========================================================================
#  Farnborough Contracting Services - one step deploy (macOS / Linux)
#  Run from this folder:  bash deploy.sh
# ===========================================================================
set -euo pipefail

OWNER=anthonygdunn-hub
REPO=farnborough-contracting
DOMAIN=www.farnboroughcontracting.com

cd "$(dirname "$0")"
echo
echo "  Farnborough Contracting Services"
echo "  Deploying to https://github.com/$OWNER/$REPO"
echo "  ---------------------------------------------------------------"
echo

command -v git >/dev/null || { echo "  [X] git is not installed."; exit 1; }

if command -v node >/dev/null; then
  echo "  [1/5] Rebuilding the site from build/data.mjs"
  node build/build.mjs
else
  echo "  [ ] node not found, using the committed HTML"
fi

if [ ! -d .git ]; then
  echo "  [2/5] Creating the local git repository"
  git init -q && git branch -M main
else
  echo "  [2/5] Local git repository already present"
fi

git add -A
if git diff --cached --quiet; then
  echo "        Nothing new to commit"
else
  git -c user.name="Tony Dunn" -c user.email="tony@constancia.io" commit -q -m "Site build"
  echo "        Changes committed"
fi

if ! command -v gh >/dev/null; then
  cat <<'MSG'

  [!] The GitHub CLI (gh) is not installed, so the repo cannot be created
      automatically. Either install it (brew install gh && gh auth login)
      and run this again, or create the repo at https://github.com/new
      as a PUBLIC repo with no README, then:

        git remote add origin https://github.com/anthonygdunn-hub/farnborough-contracting.git
        git push -u origin main

      Then set Settings > Pages to main / root, custom domain
      www.farnboroughcontracting.com

MSG
  exit 0
fi

echo "  [3/5] Creating the GitHub repository (public, so Pages works on a free plan)"
if gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  echo "        Repository already exists, pushing to it"
  git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$OWNER/$REPO.git"
  git push -u origin main
else
  gh repo create "$OWNER/$REPO" --public --source=. --remote=origin --push \
    --description "Website for Farnborough Contracting Services, www.farnboroughcontracting.com"
fi

echo "  [4/5] Turning on GitHub Pages from main / root"
gh api --method POST -H "Accept: application/vnd.github+json" \
  "/repos/$OWNER/$REPO/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 \
  || echo "        Pages may already be enabled, continuing"

echo "  [5/5] Setting the custom domain to $DOMAIN"
gh api --method PUT -H "Accept: application/vnd.github+json" \
  "/repos/$OWNER/$REPO/pages" -f "cname=$DOMAIN" -F "https_enforced=true" >/dev/null 2>&1 \
  || echo "        Could not set it over the API. The CNAME file does the same job."

cat <<MSG

  Done.

  Next, and only you can do these:
    1. DNS: point www at $OWNER.github.io as a CNAME, and the bare domain at
       the four GitHub Pages A records. README.md, Deployment step 3.
    2. Supabase: run supabase/migrations/0001_init.sql in the SQL Editor,
       then send yourself a test enquiry.
    3. Redirect farnboroughcontracting.co.uk to the new site, because that is
       the domain Google has actually indexed.

  https://github.com/$OWNER/$REPO/settings/pages

MSG
