import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectUser } from "../project-users/project-user.entity";
import { User } from "../users/user.entity";

@Entity()
export class Project {

  @PrimaryGeneratedColumn('uuid')
  public id: string;
  
  @Column({nullable: false})
  public name: string;

  @Column({nullable: false, type: "uuid"})
  public referringEmployeeId: string;

  @ManyToOne(() => User, user => user.projects)
  public referringEmployee: User;

  @ManyToOne(() => ProjectUser, pUsers => pUsers.projects)
  public projectUser: ProjectUser;
}
