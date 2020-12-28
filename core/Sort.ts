import Query from "./query";
import AbstractOptions from "./AbstractOptions";

class Sort extends AbstractOptions{
    constructor(parent_instance: Query, input: any, order?: string) {
        super(parent_instance);
        this.inner_sql = "ORDER BY "
        this.factory(input, order);
    }

    private factory(input: any, order?: string) {
        if(!input) {
            throw {error: "input cant be null"};
        }
        if (typeof input == "object") {
            if ('columns' in input) {
                if (Array.isArray(input.columns)) {
                    if (input.columns.length > 0) {
                        const columns_input_types: Set<string> = new Set<string>();
                        input.columns.forEach((column: any) => {
                            columns_input_types.add(typeof column);
                        });
                        if (columns_input_types.size === 1) {
                            const type = [...columns_input_types][0]
                            if (type == "string") {
                                this.inner_sql += `${input.columns.join(", ")}`;
                            } else if (type == "object") {
                                input.columns = input.columns.map((item: any) => {
                                    return `${item.name}${"order" in item ? " " + item.order : " ASC" }`;
                                })
                                console.log(input.columns)
                                this.inner_sql += `${input.columns.join(", ")}`;}
                        } else {
                            input.columns.forEach((column: any, index: number) => {
                                if (typeof column === 'string') {
                                    this.inner_sql += `${index !== 0 ? ', ' : ''}${column} ASC`;
                                } else {
                                    this.inner_sql += `${index !== 0 ? ', ' : ''}${column.name}${"order" in column ? ` ${column.order}` : ' ASC'}`;
                                }
                            });
                        }
                    } else {
                        throw {error: "Invalid input"};
                    }
                } else {
                    this.inner_sql += `${input.columns}`;
                }
            }
        } else if (typeof input == "string") {
            this.inner_sql += `${input}${order ? " " + order: " ASC"}`
        } else {
            throw {error: "Invalid input"};
        }

    }
}

export default Sort;