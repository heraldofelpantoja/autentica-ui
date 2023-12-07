
import { required, maxLength, minLength } from "@vuelidate/validators";
export default class Agenda {
    constructor() {
        this.id = null;
        this.name = null;
        this.contact = null;
        this.call = [];
    }

    validations() {
        return {
            name: {
                required,
                maxLength: maxLength(150),
                minLength: minLength(3),
            },

            contact: {
                required,
                maxLength: maxLength(150),
                minLength: minLength(3),
            }
        }
    }
}   