import Group from "./grupo";

export default class User {
    constructor() {
        this.id = null;
        this.name = null;
        this.email = null;
        this.password = null;
        this.contact = null;
        this.group = new Group();
    }
}