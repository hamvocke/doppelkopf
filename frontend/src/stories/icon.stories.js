import Icon from "@/components/Icon";

import "@/assets/css/app.css";

export default {
  title: "Icon"
};

export const help = () => ({
  components: { Icon },
  template: '<Icon name="help" />'
});

export const info = () => ({
  components: { Icon },
  template: '<Icon name="info" />'
});
