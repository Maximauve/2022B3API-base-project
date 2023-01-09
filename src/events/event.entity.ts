import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Events {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({nullable: false})
  public date: Date;

  @Column({nullable: false, default: "Pending"})
  public eventStatus?: 'Pending' | 'Accepted' | 'Declined'
  
  @Column({nullable: false})
  public eventType: 'RemoteWork' | 'PaidLeave';

  @Column({nullable: true})
  public eventDescription: string;

  @Column({nullable: false, type: "uuid"})
  public userId: string;

  @ManyToOne(() => User, user => user.events)
  public user: User;
}
