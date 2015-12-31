#!/bin/bash
if [[ $TRAVIS_PULL_REQUEST == false && $TRAVIS_BRANCH == "master" ]]
then
    echo "-- pushing docs --"

    ( cd docs
    git init
    git config user.email "travis@travis-ci.com"
    git config user.name "Travis Bot"

    cp -r ../example/ example/
    git add -A

    git commit -m "Deployed to GitHub Pages"
    git push --force --quiet "https://${GHTOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
    )
else
    echo "-- will only push docs from master --"
fi
