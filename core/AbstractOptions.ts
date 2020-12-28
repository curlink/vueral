import Query from "./query";

abstract class AbstractOptions {
    protected inner_sql = "";
    protected parent_instance: Query;

    protected constructor(parent_instance: Query) {
        this.parent_instance = parent_instance
    }

    getInnerSql() {
        return this.inner_sql;
    }
}

export default AbstractOptions;