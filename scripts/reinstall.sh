#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# Cleanup
bash ./scripts/rmdeps.sh
bash ./scripts/cleanup.sh

# Install the updated dependencies
bun install
