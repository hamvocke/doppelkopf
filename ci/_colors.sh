# Color codes and utility functions to produce fancy bash output

DEFAULT="\x1B[39m"
RED="\x1B[31m"
GREEN="\x1B[32m"
YELLOW="\x1B[33m"

CHECKMARK="✓"
CROSS="×"
BULLET="▶"

step() {
  echo -e "${BULLET} ${YELLOW}${1}${DEFAULT}"
}

error() {
  echo -e "${CROSS} ${RED}${1}${DEFAULT}"
}

success() {
  echo -e "${CHECKMARK} ${GREEN}${1}${DEFAULT}"
}
