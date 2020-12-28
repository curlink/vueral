import Query from "./query";
import AbstractOptions from "./AbstractOptions";

class Group extends AbstractOptions{

    constructor(parent_instance: Query, input: any) {
        super(parent_instance)
        this.inner_sql = "GROUP BY "
        this.factory(input);
    }

    private factory(input: any) {
        if(!input) {
            throw {error: "input cant be null"};
        }
        this.inner_sql += input;
    }
}

export default Group;