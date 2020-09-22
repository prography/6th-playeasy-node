import Container from "typedi";
import { createConnection, ConnectionOptions, useContainer } from "typeorm";

// 데이터베이스 커넥션을 생성한다.
export async function createDatabaseConnection(): Promise<void> {
  try {
    const connectionOpts: ConnectionOptions = {
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATAPASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      synchronize: true,
      logging: false,
      entities: [__dirname + "/../entity/*{.ts,.js}"],
    };

    useContainer(Container);
    await createConnection(connectionOpts);
  } catch (error) {
    throw error;
  }
}