import { Component } from "../../core/Component";
import template from "./board.template.hbs";
import { useUserStore } from "../../hooks/useUserStore";
import { INITIAL_STATE } from "./initialState";
import { useNavigate } from "../../hooks/useNavigate";
import { ROUTES } from "../../constants/routes";
import { useModal } from "../../hooks/useModal";
import { extractFormData } from "../../utils/extractFormData";
import { storageService } from "../../services/Storage";

export class BoardPage extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    this.template = template();
  }

  initialization() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      boardId: this.getAttribute("id"),
      user: getUser(),
    });
  }

  uploadAttachments(attachments) {
    const { user, boardId } = this.state;
    const path = `${user.uid}/${boardId}`;
    const promiseFiles = attachments.map((attachment) => {
      return storageService.uploadFile(attachment, path);
    });

    return Promise.all(promiseFiles);
  }

  loadAttachmentsUrl(data) {
    return Promise.all(
      data.map((snapshot) => storageService.downloadURL(snapshot.ref))
    );
  }

  openCreateTaskModal = () => {
    useModal({
      isOpen: true,
      title: "Create Task",
      successCaption: "Create",
      template: "ui-create-task-form",
      onSuccess: (modal) => {
        const form = modal.querySelector(".create-task-form");
        const formData = new FormData(form);
        const preparedData = {
          ...extractFormData(form),
          attachments: formData.getAll("attachments"),
        };

        this.uploadAttachments(preparedData.attachments)
          .then(this.loadAttachmentsUrl)
          .then((data) => {
            console.log(data);
          });
      },
    });
  };

  onClick = ({ target }) => {
    const goToDashboard = target.closest(".go-to-dashboard");
    const createTaskBtn = target.closest(".create-task-btn");

    if (goToDashboard) {
      useNavigate(ROUTES.dashboard);
    }

    if (createTaskBtn) {
      this.openCreateTaskModal();
    }
  };

  componentDidMount() {
    this.initialization();
    this.addEventListener("click", this.onClick);
  }
}

customElements.define("board-page", BoardPage);
