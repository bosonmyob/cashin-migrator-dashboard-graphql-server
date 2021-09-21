#!/bin/bash

set -euo pipefail

ENV=$1

serverless deploy --stage $ENV --conceal
