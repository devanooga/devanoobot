#!/bin/bash
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR johnny-5@138.197.20.170:
ssh johnny-5@138.197.20.170 "cd devanoobot && npm run migrations:prod && ../.npm-global/bin/pm2 restart devanoobot.config.json --update-env"
