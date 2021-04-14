import orm from 'typeorm';

export const Account = new orm.EntitySchema({
    name: 'Account',
    columns: {
        ID: {
            primary: true,
            type: 'int',
            generated: true
        },
        Username: {
            type: 'varchar'
        },

        EMail: {
            type: 'text'
        },

        Password: {
            type: 'varchar'
        },
    }

});