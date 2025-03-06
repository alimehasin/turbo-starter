#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

cd ./packages/storage

bun run seed
