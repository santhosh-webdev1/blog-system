import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "src/comment/comment.entity";


@Entity('posts')
export class Post{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column()
    content : string;

    // relation of post to user
    @ManyToOne( () => User, (user) => user.posts, { onDelete : 'CASCADE', eager : true})
    user : User;

    // relation of post to comment
    @OneToMany( () => Comment, (comment) => comment.post)
    comment : Comment[];

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date;
}