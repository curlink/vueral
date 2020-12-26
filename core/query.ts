import Select from './select';

class Query {

    private sql: string;

    constructor() {
        this.sql = '';
    }

    appendSubQuery(query: string) {
        this.sql += query;
    }

    select(input?: any) {
        return new Select(this, input);
    }
}

export default Query;