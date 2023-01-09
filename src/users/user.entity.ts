import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "../events/event.entity";
import { ProjectUser } from "../project-users/project-user.entity";
import { Project } from "../projects/project.entity";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({nullable: false, unique: true})
  public username: string;

  @Column({nullable: false, unique: true})
  public email: string;
  
  @Column({nullable: false})
  public password: string;

  @Column({default: 'Employee', nullable: false})
  public role: 'Employee' | 'Admin' | 'ProjectManager';

  @OneToMany(() => Project, project => project.referringEmployee)
  public projects: Project[];

  @OneToMany(() => ProjectUser, pUsers => pUsers.user)
  public projectUsers: ProjectUser[];

  @OneToMany(() => Events, event => event.user)
  public events: Events[];
}
