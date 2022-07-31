import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ length: 15 })
  userName: string;

  @Column({ length: 300 })
  hashedPassword: string;

  @Column({ length: 60 })
  displayName: string;
}
