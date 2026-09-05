@echo off
REM ===========================================================================
REM  Farnborough Contracting Services - finish the deployment
REM
REM  The GitHub repo already exists and is empty:
REM    https://github.com/anthonygdunn-hub/farnborough-contracting
REM
REM  Double click this file. It tidies the staging folders, sets up git,
REM  pushes the source, and the repo's GitHub Actions workflow then builds
REM  all 36 pages and publishes them to Pages.
REM
REM  Needs: git. The GitHub CLI (gh) is optional and only used to switch the
REM  Pages source on for you.
REM ===========================================================================
setlocal EnableDelayedExpansion

set OWNER=anthonygdunn-hub
set REPO=farnborough-contracting
set DOMAIN=www.farnboroughcontracting.com

cd /d "%~dp0"
echo.
echo  Farnborough Contracting Services
echo  Pushing to https://github.com/%OWNER%/%REPO%
echo  ---------------------------------------------------------------
echo.

REM --- 0. tidy the flat staging folders -------------------------------------
REM  The files were copied over as flat folders because of how they were
REM  transferred. Move them into the layout the build expects.
echo  [1/6] Tidying the folder layout

if exist "gh-workflows\deploy.yml" (
  if not exist ".github\workflows" mkdir ".github\workflows"
  move /Y "gh-workflows\deploy.yml" ".github\workflows\deploy.yml" >nul
  rd /S /Q "gh-workflows" 2>nul
)
if exist "assets-css\site.css" (
  if not exist "assets\css" mkdir "assets\css"
  move /Y "assets-css\site.css" "assets\css\site.css" >nul
  rd /S /Q "assets-css" 2>nul
)
if exist "assets-js\site.js" (
  if not exist "assets\js" mkdir "assets\js"
  move /Y "assets-js\site.js" "assets\js\site.js" >nul
  rd /S /Q "assets-js" 2>nul
)
if exist "assets-img" (
  if not exist "assets\img" mkdir "assets\img"
  move /Y "assets-img\*" "assets\img\" >nul
  rd /S /Q "assets-img" 2>nul
)
if exist "supabase-migrations\0001_init.sql" (
  if not exist "supabase\migrations" mkdir "supabase\migrations"
  move /Y "supabase-migrations\0001_init.sql" "supabase\migrations\0001_init.sql" >nul
  rd /S /Q "supabase-migrations" 2>nul
)
if exist "gitignore.txt" (
  move /Y "gitignore.txt" ".gitignore" >nul
)
echo        Layout ok

REM --- 1. sanity check ------------------------------------------------------
if not exist "build\data.mjs" (
  echo  [X] build\data.mjs is missing. Are you running this from the
  echo      farnborough-contracting folder?
  goto :fail
)

where git >nul 2>nul
if errorlevel 1 (
  echo  [X] git is not installed or not on your PATH.
  echo      Get it from https://git-scm.com/download/win then run this again.
  goto :fail
)

REM --- 2. build locally, if node is available -------------------------------
where node >nul 2>nul
if errorlevel 1 (
  echo  [2/6] node not found locally, skipping the local build.
  echo        GitHub Actions will build it on the server instead, so this
  echo        is not a problem.
) else (
  echo  [2/6] Building the site locally to check it works
  node build\build.mjs >nul
  if errorlevel 1 (
    echo  [X] The local build failed. Nothing has been pushed.
    goto :fail
  )
  echo        36 pages generated
)

REM --- 3. git ---------------------------------------------------------------
echo  [3/6] Setting up git
if not exist ".git" (
  git init -q
)
git branch -M main 2>nul
git add -A
git diff --cached --quiet
if errorlevel 1 (
  git -c user.name="Tony Dunn" -c user.email="tony@constancia.io" commit -q -m "New website: 36 pages, built from build/data.mjs by GitHub Actions"
  echo        Committed
) else (
  echo        Nothing new to commit
)

REM --- 4. push --------------------------------------------------------------
echo  [4/6] Pushing to GitHub
git remote get-url origin >nul 2>nul
if errorlevel 1 (
  git remote add origin https://github.com/%OWNER%/%REPO%.git
)
git push -u origin main
if errorlevel 1 (
  echo.
  echo  [X] The push failed. The usual cause is that git has not been given
  echo      your GitHub credentials on this machine yet. Either:
  echo        - install the GitHub CLI and sign in:
  echo            winget install --id GitHub.cli
  echo            gh auth login
  echo        - or run the push again and sign in when the browser opens.
  goto :fail
)
echo        Pushed

REM --- 5. Pages source -----------------------------------------------------
echo  [5/6] Setting the Pages source to GitHub Actions
where gh >nul 2>nul
if errorlevel 1 (
  echo        gh not installed, so do this one by hand:
  echo        Settings ^> Pages ^> Source: GitHub Actions
) else (
  REM Caret line continuation is unreliable inside a parenthesised block,
  REM so these stay on one line each.
  gh api --method POST -H "Accept: application/vnd.github+json" /repos/%OWNER%/%REPO%/pages -f "build_type=workflow" >nul 2>nul
  if errorlevel 1 gh api --method PUT -H "Accept: application/vnd.github+json" /repos/%OWNER%/%REPO%/pages -f "build_type=workflow" >nul 2>nul
  echo        Done, or already set
)

REM --- 6. done -------------------------------------------------------------
echo  [6/6] Opening the Actions tab so you can watch the build
echo.
echo  The workflow takes about a minute. When it goes green the site is live
echo  at https://%OWNER%.github.io/%REPO%/ and, once DNS is pointed, at
echo  https://%DOMAIN%
echo.
echo  Three things still need you:
echo    1. DNS. Point www at %OWNER%.github.io as a CNAME record, and the
echo       bare domain at these four A records:
echo         185.199.108.153  185.199.109.153
echo         185.199.110.153  185.199.111.153
echo    2. Supabase. Paste supabase\migrations\0001_init.sql into the SQL
echo       Editor and run it, then send yourself a test enquiry.
echo    3. Redirect farnboroughcontracting.co.uk to the new site. That is
echo       the domain Google has actually indexed.
echo.
echo  If Settings ^> Pages still shows "Deploy from a branch", change it to
echo  "GitHub Actions" and re-run the workflow.
echo.
start "" "https://github.com/%OWNER%/%REPO%/actions"
start "" "https://github.com/%OWNER%/%REPO%/settings/pages"
goto :done

:fail
echo.
echo  Stopped. Nothing is broken: all the source files are still in this
echo  folder and you can run this again once the above is sorted.
echo.

:done
echo.
pause
endlocal
