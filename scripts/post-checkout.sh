#!/bin/bash

# This will run automatically because of husky in package.json.
# Or, to ensure manually that it runs, add to .git/hooks/post-checkout
#   scripts/post-checkout.sh $1 $2

set -e

CHANGED=$(git diff "$1" "$2" --stat -- ./yarn.lock | wc -l)
if (( CHANGED > 0 )); then
    echo
    echo "🚨 🚨 🚨 yarn.lock has changed! 🚨 🚨 🚨 "
    echo "run 'yarn' in the client directory to get the latest!"
    echo
fi
