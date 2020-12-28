import Query from './query';
import Sort from "./Sort";
import Group from "./group";

class Options {
    private child_instance: Query | null = null;

    protected setChildInstance(instance: Query) {
        this.child_instance = instance;
    }

    group(input: any) {
        const group = new Group(this.child_instance!, input);
        this.child_instance?.appendSubQuery(group.getInnerSql())
        return this.child_instance as Query;
    }

    sort(input: any, order?: string) {
        const sort = new Sort(this.child_instance!, input, order);
        this.child_instance?.appendSubQuery(sort.getInnerSql())
        return this.child_instance
    }



}

export default Options;