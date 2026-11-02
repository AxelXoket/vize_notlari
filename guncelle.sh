#!/bin/sh
# Hocanin reposunu gunceller ve notlarin hazirlandigi surumden bu yana neyin degistigini gosterir.
# Kullanim: sh guncelle.sh
set -eu
cd "$(dirname "$0")"
# Baska bir bilgisayarda yeni klonlandiysa hocanin reposu (submodule) bos gelir: once indir.
[ -e repo/.git ] || git submodule update --init repo
cd repo

NOT_SURUMU=7a13069   # notlar bu commit'e gore hazirlandi (2025-12-30)

git fetch --quiet origin
yeni=$(git rev-list --count HEAD..origin/main)
if [ "$yeni" -eq 0 ]; then
  echo "Repo guncel. Notlarin hazirlandigi surumden ($NOT_SURUMU) beri degisiklik yok."
else
  echo "$yeni yeni commit var:"
  git log --format='  %h %ad %s' --date=short HEAD..origin/main
  git merge --ff-only --quiet origin/main
  echo "Repo guncellendi."
fi

echo
echo "Notlarin hazirlandigi surumden beri degisen dosyalar:"
degisen=$(git diff --name-status "$NOT_SURUMU" HEAD)
if [ -z "$degisen" ]; then echo "  (yok, notlar repo ile birebir)"; else echo "$degisen" | sed 's/^/  /'; fi
