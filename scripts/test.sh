#!/usr/bin/env bash

tsc
find /dist/test -type f -name '*.ts' -delete
npx tap dist/test --no-esm
