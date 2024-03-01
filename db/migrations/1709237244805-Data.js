module.exports = class Data1709237244805 {
    name = 'Data1709237244805'

    async up(db) {
        await db.query(`CREATE TABLE "registered" ("id" character varying NOT NULL, "node" text NOT NULL, "subnode" text, "owner" text NOT NULL, "tx_hash" text NOT NULL, "block_timestamp" numeric NOT NULL, CONSTRAINT "PK_e347587ec93bad80be1fd9af7ed" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_fc4578ccd4c39f53346ea8ab47" ON "registered" ("owner") `)
        await db.query(`CREATE INDEX "IDX_0d37ec6ca7b8edf1ff30255b77" ON "registered" ("block_timestamp") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "registered"`)
        await db.query(`DROP INDEX "public"."IDX_fc4578ccd4c39f53346ea8ab47"`)
        await db.query(`DROP INDEX "public"."IDX_0d37ec6ca7b8edf1ff30255b77"`)
    }
}
