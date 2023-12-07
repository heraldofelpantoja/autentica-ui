import Group from "./grupo";
import { required, maxLength, minLength, email } from "@vuelidate/validators";

export default class User {
    constructor() {
        this.id = null;
        this.name = null;
        this.email = null;
        this.password = null;
        this.contact = null;
        this.group = new Group();
    }

    validations() {
        return {
            name: {
                required,
                maxLength: maxLength(150),
                minLength: minLength(3),
            },
            email: {
                required,
                email,
                maxLength: maxLength(150),
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(150),
            },
            contact: {
                required,
                maxLength: maxLength(15),
            },
            group: new Group().validations()
        }
    }
}