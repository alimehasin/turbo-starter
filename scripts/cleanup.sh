#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# Use fd to find and remove specific files and directories
fd --hidden --no-ignore '\.turbo|\.next|stylelintcache|\.env.bak' --exec rm -rf
