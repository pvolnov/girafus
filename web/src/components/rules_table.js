import React from 'react';
import {Button, Grid, Input, Segment, Table} from 'semantic-ui-react'


export default class RulesTable extends React.Component {
    constructor(props) {
        super(props);

        this.setEnvironment();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setEnvironment();
    }

    setEnvironment = () => {
        this.rows =  this.props.rows || [];
        this.tables = {};
        this.btnName = this.props.btnName || 'Сохранить изменения';
        this.rows_for_update = {};
        this.save = this.props.save;

        for (var r in this.rows) {
            if (this.tables[this.rows[r].type] === undefined) {
                this.tables[this.rows[r].type] = [];
            }
            this.tables[this.rows[r].type].push(this.rows[r]);
        }
    };


    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value});
        console.log(value);
        //filtr
        var rows = this.rows;

        var tables = {};
        for (var r in rows) {
            if (rows[r].name.indexOf(value) < 0) {
                continue;
            }
            if (tables[rows[r].type] === undefined) {
                tables[rows[r].type] = []
            }
            tables[rows[r].type].push(rows[r]);
        }
        this.setState({"tables": tables})
    };
    update = (id, column, value) => {
        console.log(id, column, value)
        var tables = {};
        for (var r in this.rows) {
            var row = this.rows[r];
            if (row.id === id) {
                row.permissions[column] = value;
                this.rows_for_update[row.id] = row.permissions;
            }
            if (tables[row.type] === undefined) {
                tables[row.type] = []
            }
            tables[this.rows[r].type].push(this.rows[r]);
        }
        this.setState({"tables": tables})
    };

    drowTable = (table) => {
        let rows = [];
        for (var row in table) {
            var val = table[row];
            this.val_id = val.id;

            rows.push(
                <Table.Row key={`row_${val.id}`}>
                    <Table.Cell key={`cell_${val.id}`} width={8}>
                        {val.name}
                    </Table.Cell>
                    {
                        val.permissions.map((perm, i) => {
                            var val_id = this.val_id;
                            var name = "x";
                            var color = "grey";
                            var val = 2;
                            if (perm === 1) {
                                name = 'chevron down';
                                color = 'green';
                                val = 0;
                            }
                            if (perm === 2) {
                                name = 'chevron down';
                                color = 'orange';
                                val = 0;
                            }
                            if (perm === 3) {
                                name = 'x';
                                color = 'red';
                                val = 2;
                            }
                            return (
                                <Table.Cell key={`cell_${val.id}_${i}`} width={2} textAlign={'center'}>
                                    <Button onClick={() => this.update(val_id, i, val)} circular color={color}
                                            icon={name}/>
                                </Table.Cell>)
                        })
                    }
                </Table.Row>
            )
        }
        return rows;
    };


    getTables = (tables) => {
        let tabls = [];
        console.log(tables);
        if (Object.keys(tables).length === 0) {
            return <h1>Not found</h1>
        }
        for (var t in tables) {
            var table = tables[t];
            tabls.push(
                <Table key={`table_${t}`} singleLine attached>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={4}>{t}</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Создание</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Просмотр</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Пред. подпись</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Уд. подпись</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.drowTable(table)
                        }
                    </Table.Body>
                </Table>
            )
        }
        return tabls;
    };

    render() {
        return (
            <div className={"rules-table"}>
                <style>

                </style>
                <Segment>
                    <Grid>
                        <Grid.Column width={11}>
                            <Input onChange={this.handleSearchChange} iconPosition='left' icon='search' fluid
                                   placeholder='Search...'/>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Button positive={Object.keys(this.rows_for_update).length > 0 || this.props.initialEnabled}
                                    disabled={Object.keys(this.rows_for_update).length === 0 && !this.props.initialEnabled}
                                    onClick={()=>this.save(this.rows_for_update)}
                                    fluid
                            >
                                {this.btnName}
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Segment>
                {
                    this.getTables(this.tables)
                }
            </div>
        )

    }
}


