import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class Session extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', nullable: false })
  sid: string;

  @Column({ type: 'jsonb', nullable: false })
  sess: string;

  @Column({ type: 'timestamp', nullable: false })
  expire: Date;
}
