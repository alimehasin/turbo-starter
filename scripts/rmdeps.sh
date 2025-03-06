#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

rm -rf node_modules

# Use fd to find and remove specific files and directories
fd --hidden --no-ignore 'node_modules|bun.lock|bun.lockb|pnpm-lock.yaml|package-lock.json|yarn.lock' --exec rm -rf
