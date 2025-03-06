#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# Cleanup
bash ./scripts/rmdeps.sh
bash ./scripts/cleanup.sh

# Update npm dependencies across all workspaces
bunx npm-check-updates@latest --root --workspaces -u

# Install the updated dependencies
bun install
