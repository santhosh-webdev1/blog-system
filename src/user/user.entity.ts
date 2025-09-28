import { Post } from "src/post/post.entity";
import { Comment } from "src/comment/comment.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('users')
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable : true})
    name : string;

    @Column({nullable : true, unique : true})
    email : string;

    @Column({nullable : true})
    password : string;

    // relation of user with post
    @OneToMany( () => Post, (post) => post.user)
    posts : Post[];

    // relation of user with comment
    @OneToMany( () => Comment, (comment) => comment.user)
    comments : Comment[];

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updateAt : Date;

    @Column({default : false, nullable : true})
    isVerfied : boolean;

    @Column({nullable : true, type : 'text'})
    activationToken : string | null;

    @Column({type : 'timestamptz',nullable : true})
    activationTokenExpiry : Date | null;
}