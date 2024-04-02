import template from "./toast.template.hbs";
import { Component } from "../../core/Component";
import { eventEmitter } from "../../core/EventEmitter";
import { EVENT_TYPES } from "../../constants/eventTypes";
import { getToastType } from "./utils";

export class Toast extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = {
      isShow: false,
      type: null,
      message: "",
    };
  }

  showToast = ({ detail }) => {
    this.setState({
      isShow: true,
      type: getToastType(detail.type),
      message: detail.message,
    });
  };

  componentDidMount() {
    eventEmitter.on(EVENT_TYPES.toastNotification, this.showToast);
  }

  componentWillUnmount() {
    eventEmitter.off(EVENT_TYPES.toastNotification, this.showToast);
  }
}

customElements.define("ui-toast", Toast);
