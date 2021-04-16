import orm from 'typeorm';

export const Account = new orm.EntitySchema({
    name: 'Account',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        username: {
            type: 'varchar'
        },
        password: {
            type: 'varchar'
        }
    }
});

export const Character = new orm.EntitySchema({
    name: 'Character',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        guid: {
            type: 'text',
        },
        position: {
            type: 'text',
            nullable: true
        }
    }
})
