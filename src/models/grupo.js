import { required, maxLength, minLength } from "@vuelidate/validators";

export default class Group {
    constructor() {
        this.id = null;
        this.name = null;
        this.permissions = [];
    }

    validations() {
        return {
            name: {
                required,
                maxLength: maxLength(150),
                minLength: minLength(3),
            },
            permission: {
                required
            }
        }
    }
}

