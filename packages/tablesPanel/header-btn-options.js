import { Button } from 'view-design';

export default {
  name: 'HeaderBtnOptions',
  function: true,
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  render(h, ctx) {
    return h(Button, {
      props: {
        type: this.option.type ? this.option.type : 'primary',
        icon: this.option.icon,
      },
      style: {
        marginLeft: '7px',
      },
      attrs: {
        title: '',
      },
      directives: this.option.directives,
      on: {
        click: this.option.click,
      },
    }, this.option.title);
  },
};
