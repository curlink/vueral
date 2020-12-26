import Query from './query';

class Select {

    private inner_sql: string;
    private parent_instance: Query;

    constructor(parent_instance: Query, input?: any) {
        this.inner_sql = 'SELECT ';
        this.factory(input);
        this.parent_instance = parent_instance;
    }

    private factory(input: any) {
        if (!input) {
            return this.inner_sql += '*';
        }
        if ('columns' in input) {
            if (Array.isArray(input.columns)) {
                if (input.columns.length > 0) {
                    const columns_input_types: Set<string> = new Set<string>();
                    input.columns.forEach((column: any) => {
                        columns_input_types.add(typeof column);
                    });
                    if (columns_input_types.size === 1) {
                        this.inner_sql += `${input.columns.join()}`;
                    } else {
                        input.columns.forEach((column: any, index: number) => {
                            if (typeof column === 'string') {
                                this.inner_sql += `${index !== 0 ? ', ' : ''}${column}`;
                            } else {
                                this.inner_sql += `${index !== 0 ? ', ' : ''}${column.name}${'as' in column ? ` as ${column.as}` : ''}`;
                            }
                        });
                    }
                } else {
                    this.inner_sql += '*';
                }
            } else {
                this.inner_sql += `${input.columns}`;
            }
        } else {
            this.inner_sql += '*';
        }
        if ('functions' in input) {
            if (Array.isArray(input.functions)) {
                input.functions.forEach((sql_function: any) => {
                    let function_statement = `${sql_function.function}(${sql_function.params})${'as' in sql_function ? ` as ${sql_function.as}` : ''}`;
                    this.inner_sql += `, ${function_statement}`;
                });
            }
        }
    }

    public from(tableName: string) {
        this.inner_sql += ` FROM ${tableName}`;
        this.parent_instance.appendSubQuery(this.inner_sql);
        return this.parent_instance;
    }
}

export default Select;