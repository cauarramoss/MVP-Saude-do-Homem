import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsernameToUsersTable1700000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Adiciona a coluna como NULLABLE e sem UNIQUE
        await queryRunner.query(
            `ALTER TABLE users ADD COLUMN username varchar(20)`
        );
        // 2. Preenche valores default para usuários existentes (ajuste conforme sua regra)
        await queryRunner.query(
            `UPDATE users SET username = 'user_' || id WHERE username IS NULL`
        );
        // 3. (Não é possível tornar NOT NULL no SQLite sem recriar a tabela)
        // A validação NOT NULL será garantida apenas via DTO/backend
        // 4. Cria índice UNIQUE
        await queryRunner.query(
            `CREATE UNIQUE INDEX idx_users_username ON users(username)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX idx_users_username`
        );
        await queryRunner.query(
            `ALTER TABLE users DROP COLUMN username`
        );
    }
}
