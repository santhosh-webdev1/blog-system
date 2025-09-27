import { Post } from "src/post/post.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('comments')
export class Comment{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    text : string;


    // relation of the User 
    @ManyToOne( () => User, (user) => user.comments, { onDelete : 'CASCADE'})
    user : User;

    // relation of the Post
    @ManyToOne( () => Post, (post) => post.comment, {onDelete : 'CASCADE'})
    post : Post;

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date;

}