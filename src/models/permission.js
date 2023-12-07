import { required, maxLength, minLength } from "@vuelidate/validators";
export default class Permission {
    constructor() {
        this.id = null;
        this.name = null;
    }

    validations() {
        return {
            name: {
                required,
                maxLength: maxLength(150),
                minLength: minLength(3),
            }
        }

    }
}


