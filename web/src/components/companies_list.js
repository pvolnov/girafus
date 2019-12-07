import React from 'react';
import { Tab } from 'semantic-ui-react';
import UsersList from "./users_list";

class CompaniesList extends React.Component {
    render() {
        return (
            <Tab
                menu={{ fluid: true, vertical: true }}
                panes={this.props.companies.map(company => {
                    return { menuItem: company.name, render: () => <Tab.Pane><CompanyTab company={company} /></Tab.Pane>}
                })}
            />
        )
    }
}

class CompanyTab extends React.Component {
    render() {
        return(
            <Tab
                menu={{ secondary: true, pointing: true }}
                panes={[
                    { menuItem: 'Пользователи', render: () => <Tab.Pane><UsersList users={this.props.company.users} /></Tab.Pane>},
                    { menuItem: 'Продукты', render: () => <Tab.Pane>Список продуктов</Tab.Pane>}
                ]}
            />
        )
    }
}

export default CompaniesList;