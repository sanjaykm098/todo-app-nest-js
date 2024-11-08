import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1731037494040 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE user (
      id int NOT NULL AUTO_INCREMENT,
      name varchar(100) NOT NULL,
      email varchar(100) NOT NULL,
      password varchar(100) NOT NULL,
      created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY IDX_97672ac88f789774dd47f7c8be (email)
      ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user`);
  }
}
