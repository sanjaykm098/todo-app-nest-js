import { MigrationInterface, QueryRunner } from 'typeorm';

export class TodoTable1731043286846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // create todo with relation to user table (user_id)
    await queryRunner.query(
      `CREATE TABLE todo (
      id int NOT NULL AUTO_INCREMENT,
      title varchar(100) NOT NULL,
      description varchar(100) NOT NULL,
      status tinyint NOT NULL,
    user_id int NOT NULL,   
      created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES user(id)
      ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}
