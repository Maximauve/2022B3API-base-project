import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../projects/project.entity";
import { User } from "../users/user.entity";

@Entity()
export class ProjectUser {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({nullable: false})
  public startDate: Date;

  @Column({nullable: false})
  public endDate: Date;
  
  @Column({nullable: false})
  public projectId: string;

  @OneToMany(() => Project, project => project.projectUser)
  public projects: Project[];
  
  @Column({nullable: false})
  public userId: string;

  @ManyToOne(() => User, user => user.projectUsers)
  public user: User;
}

