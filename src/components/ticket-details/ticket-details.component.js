import { getTaskByIdAPI } from "../../api/tasks";
import { Component } from "../../core/Component";
import { useToastNotification } from "../../hooks/useToastNotification";
import template from "./ticket-details.template.hbs";

export class TicketDetails extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      data: {},
    };
    this.template = template();
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  loadTicketDetails() {
    this.toggleIsLoading();
    const taskId = this.getAttribute("id");
    const boardId = this.getAttribute("board-id");
    const uid = this.getAttribute("uid");

    getTaskByIdAPI({ uid, taskId, boardId })
      .then(({ data }) => {
        this.setState({
          ...this.state,
          data,
        });
      })
      .catch(({ message }) => {
        useToastNotification({ message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  }

  componentDidMount() {
    this.loadTicketDetails();
  }
}

customElements.define("ticket-details", TicketDetails);
