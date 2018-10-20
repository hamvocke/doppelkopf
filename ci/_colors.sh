# Color codes and utility functions to produce fancy bash output

bold=$(tput bold)
underline=$(tput sgr 0 1)
reset=$(tput sgr0)

blue=$(tput setaf 4)
red=$(tput setaf 1)
green=$(tput setaf 2)
yellow=$(tput setaf 3)
mute=$(tput setaf 8)
purple=$(tput setaf 5)

e_header() {
  echo -e "\n${underline}${blue}$1${reset}\n"
}

e_success() {
  echo -e "${green}✔ $1${reset}"
}

e_error() {
  echo -e "${red}✖ $1${reset}"
}

e_step() {
  echo -e "${yellow}➜ $1${reset}"
}

e_mute() {
  echo -e "${mute}$1${reset}"
}
