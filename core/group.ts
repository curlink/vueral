import Query from "./query";

class Group {
    private inner_sql = "GROUP BY ";
    private parent_instance: Query;

    constructor(parent_instance: Query, input: any) {
        this.parent_instance = parent_instance
        this.factory(input);
    }

    getInnerSql() {
        return this.inner_sql;
    }

    private factory(input: any) {
        if(!input) {
            throw {error: "input cant be null"};
        }
        this.inner_sql += input;
    }
}

export default Group;