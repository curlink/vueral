import Select from './select';
import Options from "./options";

class Query extends Options{

    private sql: string;

    constructor() {
        super();
        this.sql = '';
        this.setChildInstance(this);
    }

    appendSubQuery(query: string) {
        this.sql += ` ${query}`;
        this.sql = this.sql.trim();
    }

    select(input?: any) {
        return new Select(this, input);
    }

}


export default Query;