const { options } = require('../connection/optionsSQLite.js')
const knex = require('knex')(options)

class ContenedorMsg {
    constructor(name) {
        this.tableName = name
        this.init()
    }

    async init() {
        await knex.schema.createTableIfNotExists(this.tableName, (table) => {
            table.increments("id").primary();
            table.string("username").notNullable();
            table.date("date").notNullable();
            table.string("message").notNullable();
        });
    }

    async save(object) {
        try {
            return await knex(this.tableName).insert(object);
        } catch (err) {
            return `Ocurrio un error al guardar el datos en la DB ${err}`;
        }
    }

    async getAll() {
        try {
            return await knex.from(this.tableName).select("*");
        } catch (err) {
            return `Error: ${err}`;
        }
    }

    async getById(id) {
        try {
            return await knex
                .from(this.tableName)
                .select("*")
                .where("id", id)
                .limit(1);
        } catch (err) {
            return `Error: ${err}`;
        }
    }

    async deleteById(id) {
        try {
            return await knex.from(this.tableName).where("id", id).del();
        } catch (err) {
            return `Error: ${err}`;
        }
    }

    async deleteAll() {
        try {
            return await knex.from(this.tableName).del();
        } catch (err) {
            return `Error: ${err}`;
        }
    }
}

module.exports = ContenedorMsg