import Query from './query';
import Group from "./group";

class Options {
    private child_instance: Query | null = null;

    protected setChildInstance(instance: Query) {
        this.child_instance = instance;
    }

    group(input: any) {
        const group = new Group(this.child_instance!, input);
        this.child_instance?.appendSubQuery(group.getInnerSql())
        return this.child_instance
    }



}

export default Options;