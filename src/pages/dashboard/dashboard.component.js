import { Component } from "../../core/Component";
import template from "./dashboard.template.hbs";
import { apiService } from "../../services/Api";
import { mapResponseApiData } from "../../utils/api";

export class Dashboard extends Component {
  constructor() {
    super();

    this.template = template();
  }

  create() {
    // apiService.post("/products", item);
  }

  delete() {
    console.log("delete");
  }

  update() {
    console.log("update");
  }

  get() {
    apiService
      .get("/products")
      .then(({ data }) => console.log(mapResponseApiData(data)));
  }

  onClick = ({ target }) => {
    if (target.closest(".create")) {
      this.create();
    }

    if (target.closest(".delete")) {
      this.delete();
    }

    if (target.closest(".update")) {
      this.update();
    }

    if (target.closest(".get")) {
      this.get();
    }
  };

  componentDidMount() {
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("dashboard-page", Dashboard);
